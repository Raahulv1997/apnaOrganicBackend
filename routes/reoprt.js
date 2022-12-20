const connection = require('../db')

function revenue(req, res) {
  var revenuearr = []
  console.log(req.body)

  connection.query("SELECT SUM(`total_amount`) gross_total_amount , SUM(`total_gst`) total_gst, SUM(`shipping_charges`) total_shipping_charges FROM orders WHERE (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? revenuearr.push(rows[0]) : console.log('error')
    }
  })

  connection.query("SELECT SUM(total_amount) return_total FROM `orders` WHERE `status` = 'return' AND (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59')", (err, rslt, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      Object.assign(revenuearr[0], { "return_total": rslt[0].return_total })

    }
  })
  connection.query("SELECT SUM(coupons.percentage) as total_discount FROM coupons WHERE id IN(SELECT discount_coupon FROM orders WHERE (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return'))", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        Object.assign(revenuearr[0], rows[0])
        var coupon_discount = revenuearr[0].gross_total_amount / 100 * revenuearr[0].total_discount
        var net_sale = revenuearr[0].gross_total_amount - coupon_discount
        var total_amount_with_shipping = revenuearr[0].gross_total_amount + revenuearr[0].total_shipping_charges
        Object.assign(revenuearr[0], { net_sale, total_amount_with_shipping})
        res.status(200).send(revenuearr)
      } else {
        res.status(500).send("error")
        console.log('error')
      }
    }
  })
}

function revenue_table(req,res){

  connection.query(' SELECT DISTINCT date(date_format(`order_date`, "%Y-%m-%d")) as uniquedates ,SUM(`total_amount`) gross_amount,SUM(`total_gst`) total_gst, SUM(`shipping_charges`) total_shipping_charges,(SELECT SUM(total_amount) return_total FROM `orders` WHERE `status` = "return") return_value ,(SELECT SUM(coupons.percentage) as total_discount FROM coupons WHERE id IN (SELECT discount_coupon FROM orders WHERE NOT `status` = "return")) discount from orders WHERE order_date > now() - INTERVAL 15 day  GROUP BY date(date_format(`order_date`, "%Y-%m-%d"))', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        // Object.assign(revenuearr[0], rows[0])
        // var coupon_discount = revenuearr[0].gross_total_amount / 100 * revenuearr[0].total_discount
        // var net_sale = revenuearr[0].gross_total_amount - coupon_discount
        // var total_amount_with_shipping = revenuearr[0].gross_total_amount + revenuearr[0].total_shipping_charges
        // Object.assign(revenuearr[0], { net_sale, total_amount_with_shipping})
        res.status(200).send(rows)
      } else {
        res.status(500).send("error")
        console.log('error')
      }
    }
  })

}


function orders_report(req, res) {
  console.log(req.body)
  var order_search=req.body.order_search;
  console.log(req.body.order_search)
  var order_report_arr=[];
  if(req.body.order_search ==''){
    connection.query("SELECT COUNT(`id`) as order_count,SUM(`total_amount`) net_sales,AVG(`total_amount`) avg_order_value,(SELECT COUNT(product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders WHERE `created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? order_report_arr.push(rows) : console.log('orders_report_error')
      }
  })

  connection.query("SELECT `id`,`created_on`,`status`,`user_id`,(SELECT COUNT(product_id) FROM order_products WHERE orders.id=order_products.order_id) item_sold, `total_amount` FROM orders WHERE NOT `status` = 'return'  AND `created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          order_report_arr.push(rows)
          console.log(order_report_arr)
          res.status(200).send(order_report_arr)
        } else {
          res.status(500).send("orders_report_error")
          console.log('orders_report_error')
        }
      }
  })
  }else{
   
  connection.query("SELECT COUNT(`id`) as order_count,SUM(`total_amount`) net_sales,AVG(`total_amount`) avg_order_value,(SELECT COUNT(product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders WHERE  `id` LIKE '%"+order_search+"%' AND `created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? order_report_arr.push(rows) : console.log('orders_report_error')
    }
})

connection.query("SELECT `id`,`created_on`,`status`,`user_id`,(SELECT COUNT(product_id) FROM order_products WHERE orders.id=order_products.order_id) item_sold, `total_amount` FROM orders WHERE NOT `status` = 'return' AND `id` LIKE '%"+order_search+"%'  AND `created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        order_report_arr.push(rows)
        console.log(order_report_arr)
        res.status(200).send(order_report_arr)
      } else {
        res.status(500).send("orders_report_error")
        console.log('orders_report_error')
      }
    }
})
  }

}

// SELECT `id`,`created_on`,`status`,`user_id`,(SELECT COUNT(product_id) FROM order_products WHERE orders.id=order_products.order_id) item_sold, `total_amount` FROM orders WHERE NOT `status` = 'return' AND `id` LIKE '%18%'

function products_report(req, res) {
  console.log(req.body)
  var products_search=req.body.products_search;
  console.log(req.body.products_search)
  var products_report_arr = [];

  if(req.body.products_search==''){
    connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`product_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59" AND NOT `status` = "return" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
      }
    })
  
    connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(product_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND NOT `status` = "return" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY product_id', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          products_report_arr.push(rows)
          console.log(products_report_arr)
          res.status(200).send(products_report_arr)
        } else {
          res.status(500).send("products_report_error")
          console.log('products_report_error')
        }
      }
    })
  }else{
    connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`product_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) LIKE "%'+products_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59" AND NOT `status` = "return" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
      }
    })
  
    connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(product_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND NOT `status` = "return" AND (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) LIKE "%'+products_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY product_id', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          products_report_arr.push(rows)
          console.log(products_report_arr)
          res.status(200).send(products_report_arr)
        } else {
          res.status(500).send("products_report_error")
          console.log('products_report_error')
        }
      }
    })
  }
 
}



function coupons_report(req, res) {
  console.log(req.body)
  var coupons_search=req.body.coupons_search;
  var coupon_report_arr = [];

  if(req.body.coupons_search == ''){
    connection.query('SELECT SUM(`discount_coupon_value`) amount,COUNT(`discount_coupon`) total_order FROM `orders` WHERE discount_coupon!="" AND `status`="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? coupon_report_arr.push(rows) : console.log('coupon_report_error')
      }
    })

    connection.query('SELECT discount_coupon,COUNT(DISTINCT order_id) order_count, (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) as coupons_code, SUM(DISTINCT `discount_coupon_value`) amount_discounted, DATE_FORMAT(order_date, "%Y-%m-%d") created_date FROM orders_view WHERE `status`="delivered" AND discount_coupon !="" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY discount_coupon,order_date', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          coupon_report_arr.push(rows)
          console.log(coupon_report_arr)
          res.status(200).send(coupon_report_arr)
        } else {
          res.status(500).send("coupon_report_error")
          console.log('coupon_report_error')
        }
      }
    })
  }
  else
  {
    connection.query('SELECT SUM(`discount_coupon_value`) amount,COUNT(`discount_coupon`) total_order FROM `orders` WHERE discount_coupon!="" AND `status`="delivered" AND (SELECT coupons.code FROM coupons WHERE orders.discount_coupon = coupons.id) LIKE "%'+coupons_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? coupon_report_arr.push(rows) : console.log('coupon_report_error')
      }
    })

    connection.query('SELECT discount_coupon,COUNT(DISTINCT order_id) order_count, (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) as coupons_code, SUM(DISTINCT `discount_coupon_value`) amount_discounted, DATE_FORMAT(order_date, "%Y-%m-%d") created_date FROM orders_view WHERE `status`="delivered" AND discount_coupon !="" AND (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) LIKE "%'+coupons_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY discount_coupon,order_date', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          coupon_report_arr.push(rows)
          console.log(coupon_report_arr)
          res.status(200).send(coupon_report_arr)
        } else {
          res.status(500).send("coupon_report_error")
          console.log('coupon_report_error')
        }
      }
    })
  }

}



// SELECT SUM(`discount_coupon_value`) amount,COUNT(`discount_coupon`) total_order FROM `orders` WHERE discount_coupon!=""

// SELECT discount_coupon,COUNT(DISTINCT order_id) order_count, (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) as coupons_code,SUM(`discount_coupon_value`) amount_discounted, DATE_FORMAT(order_date,'%Y-%m-%d') created_date FROM orders_view GROUP BY discount_coupon,order_date

function categories_report(req,res){
console.log(req.body)
var cat_str = 'SELECT SUM(`total_amount`) total_sold_product_amount, COUNT(`id`) total_sold_product_count, COUNT(DISTINCT order_id) order_count FROM `orders_view` WHERE '
if(req.body.parent_category ==''){
cat_str +="(`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')"
}else{
  var cat_arr = JSON.stringify(req.body.parent_category);
var abc="'"+cat_arr+"'"
const cat_string = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
console.log(cat_string)
  cat_str += "parent_category IN ("+cat_string+") AND (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')"
}

// SELECT * FROM `orders_view` WHERE parent_category = '"+req.body.category+"' AND (`created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')

// SELECT  COUNT(`id`) total_sold FROM `orders_view` WHERE parent_category IN ('5,18','5,19') AND (`created_on` BETWEEN '2022-11-28 24:00:00' AND '2022-11-29 23:59:59') AND (NOT `status` = 'return')

//SELECT COUNT(DISTINCT order_id) FROM orders_view WHERE parent_category IN ('5,18','5,19') AND (`created_on` BETWEEN '2022-11-28 24:00:00' AND '2022-11-29 23:59:59') AND (NOT `status` = 'return')
connection.query(cat_str, (err, rows, fields) => {
  if (err) {
    console.log(err)
    res.status(500).send(err)
  } else {
    
    rows != '' ? res.status(200).send(rows) : res.status(500).send(err)
  }
})


}


function stock_report(req,res){
  var {values}=req.body;
  console.log(values)

  if(values != ""){
    if(values=="out of stock"){
      console.log("out of stock")
     var stock_value='SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE quantity < 1 '
    }
    if(values=="low stock"){
      console.log("low stock")
    var stock_value='SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE quantity < 5 AND quantity > 1'

    }
    if(values=="in stock"){
      console.log("in stock")
      stock_value='SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE quantity >= 1'
    }
  }
  else
  {
    var stock_value = 'SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE 1'
  }
  connection.query(''+stock_value+'', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          console.log(rows)
          res.status(200).send(rows)
        } else {
          res.status(500).send("stock_report_error")
          console.log('stock_report_error')
        }
      }    }
  })
}

function customers_report(req,res){
  console.log(req.body)
  var {user_search}=req.body;
  connection.query('SELECT first_name,last_name,`user_id`,`email`,`address`,(SELECT COUNT(`id`) FROM orders WHERE users.user_id=orders.user_id) order_count,(SELECT SUM(`total_amount`) FROM orders WHERE users.user_id=orders.user_id) total_amount,(SELECT AVG(`total_amount`) FROM orders WHERE users.user_id=orders.user_id) avg_value,`created_on` FROM `users` WHERE `first_name` LIKE "%'+user_search+'%" AND `email` LIKE "%'+user_search+'%"', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? res.send(rows) : console.log('coupon_report_error')
    }
  })
}

module.exports = { revenue,revenue_table, orders_report, products_report, categories_report,coupons_report,stock_report,customers_report }
