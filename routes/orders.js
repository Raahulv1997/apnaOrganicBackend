const { parse } = require('path');
const connection = require('../db')
var max_invoice_no1 = 0


async function orders(req, res) {

  var order_count = 0;
  var { user_id, status, vendor_id, order_product, total_quantity, ref_no, payment_mode, payment_mode, delivery_date, invoice_date, order_date, total_amount, total_gst, total_cgst, total_sgst, taxable_value, discount_coupon } = req.body
  console.log("______chk-1_____")
  console.log(user_id + "" + status)
  //console.log(order_product)
  var orderno = Math.floor(100000 + Math.random() * 900000)
  connection.query('SELECT MAX(invoice_no) AS "max_invoice_no" FROM orders', async (err, results) => {
    if (err) {
      console.log(err)
    } else {
      max_invoice_no1 = 0
      max_invoice_no1 = JSON.parse(JSON.stringify(results[0].max_invoice_no))

      connection.query('INSERT INTO `orders` (`id`,`user_id`,`vendor_id`,`total_quantity`,`ref_no`,`payment_mode`,`delivery_date`, `status`,`invoice_no`,`invoice_date`, `order_date`, `total_amount`, `total_gst`, `total_cgst`, `total_sgst`, `taxable_value`, `discount_coupon`) VALUES (' + orderno + ',' + user_id + ',"' + vendor_id + '","' + total_quantity + '","' + ref_no + '","' + payment_mode + '","' + delivery_date + '","' + status + '",' + parseInt(max_invoice_no1 + 1) + ',"' + invoice_date + '","' + order_date + '","' + total_amount + '","' + total_gst + '","' + total_cgst + '","' + total_sgst + '","' + taxable_value + '","' + discount_coupon + '")', async (err, results) => {
        if (err) {
          console.log(err)
          res.status(500).send(err)
        } else {
          if (results != '') {
              max_invoice_no1 = 0
              console.log("______chk-2_____")
              var orderid = JSON.parse(JSON.stringify(results.insertId))
              //console.log(results)
              //res.send(results)
              order_product.forEach((item, index) => {
              //console.log("______chk-3_____"+orderid)
              //console.log(item)
              connection.query('INSERT INTO `order_products`(`order_id`, `product_id`, `price`, `quantity`, `gst`, `cgst`, `sgst`, `offer_id`, `discount`, `product_total_price`) VALUES ("' + orderno + '","' + item.product_id + '","' + item.price + '","' + item.quantity + '","' + item.gst + '","' + item.cgst + '","' + item.sgst + '","' + item.offer_id + '","' + item.discount + '", "' + item.product_total_price + '")', async (err, rslt) => {
                if (err) {
                  console.log(err)
                  res.status(500).send(err)
                } else {
                  if (rslt != '') {
                    //console.log(rslt)
                    order_count++
                  }
                }
              })

            });
            setTimeout(() => { res.status(200).send("order_count_" + order_count + "") }, 800)
          }
        }
      })

    }
  })
  console.log(max_invoice_no1)
  //return false
}


function order_deteils(req, res) {

  console.log(req.query.id)
   
  connection.query('SELECT * FROM `orders` WHERE `id` =' + req.query.id + '', (err, rslt) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      if (rslt != "") {
        console.log(rslt)
        //res.send(rslt)
        obj = JSON.parse(JSON.stringify(rslt[0]))
        o_id = JSON.parse(JSON.stringify(rslt[0].id))
        console.log(o_id)

        connection.query("SELECT * FROM `order_products` WHERE `order_id` = '" + o_id + "'", (err, rows, fields) => {
          if (err) {
            console.log(err)
            res.status(500).send(err)
          } else {
            if (rows != '') {
              obj["product_types"] = JSON.parse(JSON.stringify(rows))
              console.log(obj)
              res.status(200).send(obj)
            } else {
              res.status(500).send(err)
            }
         //rows!=''?res.send(rows):res.send("error")
          }
        })
      } else {
        res.status(500).send("Wrong Id")
      }
    }
  })

}


function orders_list(req, res) {
  // console.log(req.body)
  var { status, created_on } = req.body
  console.log("order list")
  if (created_on == 'one') {
    var newdate = new Date();
    var current_date = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
    // console.log(current_date)
    connection.query('SELECT * FROM orders_view WHERE `created_on` LIKE "%' + current_date + '%"', (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)

      } else {
         res.status(200).send(rows)
      }
    })
  } else {
    if (status == '' && created_on == '') {
      connection.query('SELECT * FROM `orders_view` WHERE  1', (err, rows, fields) => {
        if (err) {
          console.log("/admin_login_details_error" + err)
          res.status(500).send(err)

        } else {
           res.status(200).send(rows)
        }
      })
    } else {
      if (status != '' && created_on == '') {
        connection.query('SELECT * FROM `orders_view` WHERE `status` LIKE "%' + status + '%" ', (err, rows, fields) => {
          if (err) {
            console.log("/admin_login_details_error" + err)
            res.status(500).send(err)

          } else {
             res.status(200).send(rows)
          }
        })
      }

      if (created_on != '' && status == '') {
        connection.query('SELECT * FROM orders_view WHERE `created_on` >= DATE_SUB(CURDATE(), INTERVAL ' + created_on + ' DAY)', (err, rows, fields) => {
          if (err) {
            console.log("/admin_login_details_error" + err)
            res.status(500).send(err)

          } else {
             res.status(200).send(rows)
          }
        })
      }
    }
    if (status != '' && created_on != '') {
      connection.query('SELECT * FROM `orders_view` WHERE  `status` LIKE "%' + status + '%"  AND `created_on` >= DATE_SUB(CURDATE(), INTERVAL ' + created_on + ' DAY)', (err, rows, fields) => {
        if (err) {
          console.log("/admin_login_details_error" + err)
          res.status(500).send(err)
        } else {
          res.status(200).send(rows)
        }
      })
    }

  }
}

function order_status_change(req, res) {
  //console.log(req.body.id)
  connection.query('UPDATE `orders` SET `status`= "' + req.body.status_change + '" WHERE `id` = ' + req.body.id + '', (err, rows, fields) => {
    if (err) {
      console.log("/order_status_change_error" + err)
      res.status(500).send(err)
    } else {
      if (rows != '') {
        res.status(200).send(rows)
        console.log("Succesfully Updated Order Status")
      } else {
        console.log("Not Update Order Status")
        res.status(500).send("Not Update Order Status")
      }
    }
  })
}

module.exports = { orders, order_deteils, orders_list, order_status_change }
