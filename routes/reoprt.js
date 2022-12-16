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
        var total_amount_with_shipping_tax = revenuearr[0].gross_total_amount + revenuearr[0].total_shipping_charges
        Object.assign(revenuearr[0], { net_sale, total_amount_with_shipping_tax })
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
  connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`product_total_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59" ', (err, rows, fields) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
    }
  })

  connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(product_total_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 24:00:00" AND "' + req.body.to_date + ' 23:59:59"  GROUP BY product_id', (err, rows, fields) => {
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

module.exports = { revenue, orders_report, products_report }