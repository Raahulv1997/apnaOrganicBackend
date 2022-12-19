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

function orders_report(req, res) {
  console.log(req.body)
  connection.query("SELECT COUNT(`id`) as order_count,SUM(`total_amount`) net_sales,AVG(`total_amount`) avg_order_value,(SELECT COUNT(product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders WHERE `created_on` BETWEEN '" + req.body.from_date + " 24:00:00' AND '" + req.body.to_date + " 23:59:59'", (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        // Object.assign(revenuearr[0],rows[0])
        res.status(200).send(rows)
      } else {
        res.status(500).send("orders_report_error")
        console.log('orders_report_error')
      }
    }
  })
}

function products_report(req, res) {
  console.log(req.body)
  var products_report_arr = [];
  connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`product_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59" ', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
    }
  })

  connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(product_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY product_id', (err, rows, fields) => {
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

function coupons_report(req, res) {
  console.log(req.body)
  var coupon_report_arr = [];
  connection.query('SELECT SUM(`discount_coupon_value`) amount,COUNT(`discount_coupon`) total_order FROM `orders` WHERE discount_coupon!="" AND `status`="delivered"', (err, rows, fields) => {
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
  var {value}=req.body
  connection.query('SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE product_status < 1', (err, rows, fields) => {
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
          res.status(500).send("products_report_error")
          console.log('products_report_error')
        }
      }    }
  })
}

module.exports = { revenue, orders_report, products_report, categories_report,coupons_report,stock_report }
