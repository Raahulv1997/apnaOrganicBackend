const connection = require('../db')

function revenue(req, res) {
  var str_revenue=''
  var revenuearr = []
  var {vendors_id,categorys,user_locations,brand}=req.body
      console.log(req.body)
if(vendors_id!=''){
    console.log("true1");
    var vendors_id_ar = JSON.stringify(vendors_id);
    var vendors_id_arr="'"+vendors_id_ar+"'"
    var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
    console.log("__"+vendors_id_arr+"__")
    str_revenue+= ' AND vendor_id IN ('+vendors_id_arr+')'
   }else{
    console.log("false1")
  }

if(categorys!=''){
  console.log("true2")
  var categorys_ar = JSON.stringify(categorys);
  var categorys_arr="'"+categorys_ar+"'"
  var categorys_arr = categorys_arr.substring(categorys_arr.lastIndexOf("'[") + 2, categorys_arr.indexOf("]'"));
  console.log("__"+categorys_arr+"__")
  str_revenue+= ' AND parent_category IN ('+categorys_arr+')'
}else{
  console.log("false2")
}

// if(user_locations!=''){
// console.log("true3")
// var user_locations_ar = JSON.stringify(user_locations);
// var user_locations_arr="'"+user_locations_ar+"'"
// var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
// console.log("__"+user_locations_arr+"__")
// str_revenue+= ' AND parent_category IN ('+user_locations_arr+')'
// }else{
//   console.log("false3")
// }

if(brand!=''){
  console.log("true4")
  var brand_ar = JSON.stringify(brand);
  var brand_arr="'"+brand_ar+"'"
  var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
  console.log("__"+brand_arr+"__")
  str_revenue+= ' AND brand IN ('+brand_arr+')'
}else{
  console.log("false4")
}

console.log("+++++++++++++++++____________str_revenue______1___++++++++++++++++++++++++++")  
console.log(str_revenue)  
//return false
  connection.query("SELECT SUM(`sale_price`) gross_total_amount , SUM(`gst`) total_gst, SUM(DISTINCT `shipping_charges`)  total_shipping_charges FROM orders_view WHERE (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') "+str_revenue+"", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      console.log("first_query__")
      console.log(rows)
      rows != '' ? revenuearr.push(rows[0]) : console.log('error')
    }
  })

  connection.query("SELECT SUM(`sale_price`) return_total FROM `orders_view` WHERE `status` = 'return' AND (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') "+str_revenue+"", (err, rslt, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      console.log("second_query__")
      console.log(rslt)
      Object.assign(revenuearr[0], { "return_total": rslt[0].return_total })

    }
  })

  connection.query("SELECT SUM(coupons.percentage) as total_discount FROM coupons WHERE id IN(SELECT discount_coupon FROM orders_view WHERE (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return') "+str_revenue+")", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        console.log("third_query__")
        console.log(rows)
        Object.assign(revenuearr[0], rows[0])
        var coupon_discount = revenuearr[0].gross_total_amount / 100 * revenuearr[0].total_discount
        var net_sale = revenuearr[0].gross_total_amount - coupon_discount
        var total_amount_with_shipping = revenuearr[0].gross_total_amount + revenuearr[0].total_shipping_charges
        Object.assign(revenuearr[0], { net_sale, total_amount_with_shipping})
        //res.status(200).send(revenuearr)
      } else {
        // res.status(500).send("error")
        console.log('error')
      }
    }
  })
  
  connection.query('SELECT DISTINCT date(date_format(`created_on`, "%Y-%m-%d")) as uniquedates ,SUM(`sale_price`) gross_amount,SUM(`gst`) total_gst, SUM(DISTINCT `shipping_charges`) total_shipping_charges,SUM(`discount_coupon`) discount , (SUM(`sale_price`) - SUM(`discount_coupon`)) net_sales,(SUM(`sale_price`) + SUM(DISTINCT `shipping_charges`)) total_sales from orders_view WHERE (`created_on` BETWEEN "'+ req.body.from_date +' 00:00:00" AND "'+ req.body.to_date +' 23:59:59")   ' +str_revenue+'  GROUP BY date(date_format(`created_on`, "%Y-%m-%d")) ORDER by date(date_format(`created_on`, "%Y-%m-%d")) DESC', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        console.log(rows)
        Object.assign(revenuearr[0], { "ravenue_date_data":rows })
        res.status(200).send(revenuearr)
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
    connection.query("SELECT COUNT(`id`) as order_count,SUM(`total_amount`) net_sales,AVG(`total_amount`) avg_order_value,(SELECT COUNT(product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders WHERE `created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? order_report_arr.push(rows) : console.log('orders_report_error')
      }
  })

  connection.query("SELECT `id`,`created_on`,`status`,`user_id`,(SELECT COUNT(product_id) FROM order_products WHERE orders.id=order_products.order_id) item_sold, `total_amount` FROM orders WHERE NOT `status` = 'return'  AND `created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          order_report_arr.push(rows)
          console.log(order_report_arr)
          res.status(200).send(order_report_arr)
        } else {
          res.status(200).send("orders_report_error")
          console.log('orders_report_error')
        }
      }
  })
  }else{
   
  connection.query("SELECT COUNT(`id`) as order_count,SUM(`total_amount`) net_sales,AVG(`total_amount`) avg_order_value,(SELECT COUNT(product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders WHERE  `id` LIKE '%"+order_search+"%' AND `created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? order_report_arr.push(rows) : console.log('orders_report_error')
    }
})

connection.query("SELECT `id`,`created_on`,`status`,`user_id`,(SELECT COUNT(product_id) FROM order_products WHERE orders.id=order_products.order_id) item_sold, `total_amount` FROM orders WHERE NOT `status` = 'return' AND `id` LIKE '%"+order_search+"%'  AND `created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
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
    connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`product_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" AND NOT `status` = "return" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
      }
    })
  
    connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(product_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND NOT `status` = "return" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY product_id', (err, rows, fields) => {
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
    connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`product_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) LIKE "%'+products_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" AND NOT `status` = "return" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
      }
    })
  
    connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(product_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND NOT `status` = "return" AND (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) LIKE "%'+products_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY product_id', (err, rows, fields) => {
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
    connection.query('SELECT SUM(`discount_coupon_value`) amount,COUNT(`discount_coupon`) total_order FROM `orders` WHERE discount_coupon!="" AND `status`="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? coupon_report_arr.push(rows) : console.log('coupon_report_error')
      }
    })

    connection.query('SELECT discount_coupon,COUNT(DISTINCT order_id) order_count, (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) as coupons_code, SUM(DISTINCT `discount_coupon_value`) amount_discounted, DATE_FORMAT(order_date, "%Y-%m-%d") created_date FROM orders_view WHERE `status`="delivered" AND discount_coupon !="" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY discount_coupon,order_date', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          coupon_report_arr.push(rows)
          console.log(coupon_report_arr)
          res.status(200).send(coupon_report_arr)
        } else {
          res.status(200).send({"message":"no_data"})
          console.log('coupon_report_error')
        }
      }
    })
  }
  else
  {
    connection.query('SELECT SUM(`discount_coupon_value`) amount,COUNT(`discount_coupon`) total_order FROM `orders` WHERE discount_coupon!="" AND `status`="delivered" AND (SELECT coupons.code FROM coupons WHERE orders.discount_coupon = coupons.id) LIKE "%'+coupons_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        rows != '' ? coupon_report_arr.push(rows) : console.log('coupon_report_error')
      }
    })

    connection.query('SELECT discount_coupon,COUNT(DISTINCT order_id) order_count, (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) as coupons_code, SUM(DISTINCT `discount_coupon_value`) amount_discounted, DATE_FORMAT(order_date, "%Y-%m-%d") created_date FROM orders_view WHERE `status`="delivered" AND discount_coupon !="" AND (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) LIKE "%'+coupons_search+'%" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY discount_coupon,order_date', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          coupon_report_arr.push(rows)
          console.log(coupon_report_arr)
          res.status(200).send(coupon_report_arr)
        } else {
          res.status(200).send({"message":"no_data"})
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
cat_str +="(`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')"
}else{
  var cat_arr = JSON.stringify(req.body.parent_category);
var abc="'"+cat_arr+"'"
const cat_string = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
console.log(cat_string)
  cat_str += "parent_category IN ("+cat_string+") AND (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')"
}

// SELECT * FROM `orders_view` WHERE parent_category = '"+req.body.category+"' AND (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')

// SELECT  COUNT(`id`) total_sold FROM `orders_view` WHERE parent_category IN ('5,18','5,19') AND (`created_on` BETWEEN '2022-11-28 00:00:00' AND '2022-11-29 23:59:59') AND (NOT `status` = 'return')

//SELECT COUNT(DISTINCT order_id) FROM orders_view WHERE parent_category IN ('5,18','5,19') AND (`created_on` BETWEEN '2022-11-28 00:00:00' AND '2022-11-29 23:59:59') AND (NOT `status` = 'return')
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
  connection.query('SELECT first_name,last_name,`user_id`,`email`,`address`,(SELECT COUNT(`id`) FROM orders WHERE users.user_id=orders.user_id) order_count,(SELECT SUM(`total_amount`) FROM orders WHERE users.user_id=orders.user_id) total_amount,(SELECT AVG(`total_amount`) FROM orders WHERE users.user_id=orders.user_id) avg_value,`created_on` FROM `users` WHERE `first_name` LIKE "%'+user_search+'%" OR `email` LIKE "%'+user_search+'%"', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? res.send(rows) :res.send('error')
    }
  })
}

module.exports = { revenue, orders_report, products_report, categories_report,coupons_report,stock_report,customers_report }
