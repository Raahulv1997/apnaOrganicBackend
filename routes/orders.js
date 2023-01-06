const { parse } = require('path');
const nodemailer = require("nodemailer")
const connection = require('../db')
var max_invoice_no1 = 0


async function orders(req, res) {

  var order_count = 0;
  var percentage;
  var { user_id, status, vendor_id, order_product, total_quantity, ref_no, payment_mode, payment_mode, delivery_date, invoice_date, order_date, total_amount, total_gst, total_cgst, total_sgst, taxable_value, discount_coupon, shipping_charges, discount_coupon_value } = req.body
  console.log("______chk-1_____")
  console.log(user_id + "" + status)
  //console.log(order_product)
  var orderno = Math.floor(100000 + Math.random() * 900000)
  connection.query('SELECT MAX(invoice_no) AS "max_invoice_no" FROM orders', async (err, results) => {
    if (err) {
      console.log({ "error_1": err })
    } else {
      max_invoice_no1 = 0
      max_invoice_no1 = JSON.parse(JSON.stringify(results[0].max_invoice_no))

      connection.query('INSERT INTO `orders` (`id`,`user_id`,`vendor_id`,`total_quantity`,`ref_no`,`payment_mode`,`delivery_date`, `shipping_charges`, `status`,`invoice_no`,`invoice_date`, `order_date`, `total_amount`, `total_gst`, `total_cgst`, `total_sgst`, `taxable_value`, `discount_coupon`,`discount_coupon_value`) VALUES (' + orderno + ',' + user_id + ',"' + vendor_id + '","' + total_quantity + '","' + ref_no + '","' + payment_mode + '","' + delivery_date + '", "' + shipping_charges + '","' + status + '",' + parseInt(max_invoice_no1 + 1) + ',"' + invoice_date + '","' + order_date + '","' + total_amount + '","' + total_gst + '","' + total_cgst + '","' + total_sgst + '","' + taxable_value + '","' + discount_coupon + '","' + discount_coupon_value + '")', async (err, results) => {
        if (err) {
          console.log({ "error_2": err })
          //res.status(500).send(err)
        } else {
          if (results != '') {
            max_invoice_no1 = 0
            connection.query('SELECT * FROM coupons WHERE `id`=' + discount_coupon + '', async (err, rslt) => {
              if (err) {
                console.log({ "error_3": err })
                //res.status(200).send(err)
              } else {
                if (rslt != '') {
                  console.log(rslt[0].percentage)
                  percentage = rslt[0].percentage;
                }
              }
            })
            var orderid = JSON.parse(JSON.stringify(results.insertId))
            var iterations = order_product.length - 1;
            console.log("__________iterations_________" + iterations)
            for (item of order_product) {
              connection.query('INSERT INTO `order_products` (`order_id`, `product_id`, `mrp`, `quantity`, `gst`, `cgst`, `sgst`, `offer_id`, `discount`, `product_price`,`product_title_name`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `other_introduction`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `variety`, `vendor_id`, `shop`, `rating`, `colors`, `size`, `sale_price`, `manufacturing_date`, `special_offer`, `product_status`, `expire_date`, `unit`, `unit_quantity`,`cover_image`) VALUES ("' + orderno + '","' + item.product_id + '","' + item.mrp + '","' + item.quantity + '","' + item.gst + '","' + item.cgst + '","' + item.sgst + '","' + item.offer_id + '","' + item.discount + '", "' + item.product_price + '","' + item.product_title_name + '", "' + item.store_name + '", "' + item.product_description + '", "' + item.product_type + '", "' + item.brand + '", "' + item.category + '", "' + item.parent_category + '", "' + item.other_introduction + '", "' + item.wholesale_sales_tax + '", "' + item.manufacturers_sales_tax + '", "' + item.retails_sales_tax + '", "' + item.variety + '", "' + item.vendor_id + '", "' + item.shop + '", "' + item.rating + '", "' + item.colors + '", "' + item.size + '", "' + item.sale_price + '", "' + item.manufacturing_date + '", "' + item.special_offer + '", "' + item.product_status + '", "' + item.expire_date + '", "' + item.unit + '", "' + item.unit_quantity + '","' + item.cover_image + '")', async (err, rslt) => {
                if (err) {
                  console.log(err)
                  // res.status(200).send(err)
                  console.log({ "error_4": err })
                } else {
                  if (rslt != '') {
                    order_count++
                  }
                }
              })
              if (!--iterations) {
                setTimeout(() => {

                  connection.query('SELECT `email` FROM users WHERE `user_id`=' + user_id + '', (err, rslt) => {
                    if (err) {
                      console.log({ "error": err })
                    } else {
                      var user_e_address = rslt[0].email
                      console.log(user_e_address)
                      connection.query('SELECT * FROM `email_template` WHERE `type` = "user" AND `email_type` = "order_placed"', (err, rows) => {
                        if (err) {
                          console.log({ "error": err })
                        } else {
                          console.log(rows[0].email_text)
                          var html_data = rows[0].email_text;
                          const mail_configs = {
                            from: 'ashish.we2code@gmail.com',
                            to: user_e_address,
                            subject: 'Apna Organic Store',
                            text: "your placed request pending",
                            html: html_data
                          }
                          nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: 'ashish.we2code@gmail.com',
                              pass: 'nczaguozpagczmjv'
                            }
                          })
                            .sendMail(mail_configs, (err) => {
                              if (err) {
                                return console.log({ "email_error": err });
                              } else {
                                return res.status(200).send({ "message": "Send mail Succesfully", "order": "order_count_" + order_count + "" });
                              }
                            })
                        }
                      })
                    }
                  })
                }, 300)
              }
            };

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
        console.log("_____")
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
    connection.query('SELECT * FROM orders_view WHERE `created_on` LIKE "%' + current_date + '%" ORDER BY id DESC', (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)

      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    if (status == '' && created_on == '') {
      connection.query('SELECT * FROM `orders_view` WHERE  1 ORDER BY id DESC', (err, rows, fields) => {
        if (err) {
          console.log("/orders_list_error" + err)
          res.status(500).send(err)

        } else {
          res.status(200).send(rows)
        }
      })
    } else {
      if (status != '' && created_on == '') {
        connection.query('SELECT * FROM `orders_view` WHERE `status` LIKE "%' + status + '%" ORDER BY id DESC', (err, rows, fields) => {
          if (err) {
            console.log("/orders_list_error" + err)
            res.status(500).send(err)

          } else {
            res.status(200).send(rows)
          }
        })
      }

      if (created_on != '' && status == '') {
        connection.query('SELECT * FROM orders_view WHERE `created_on` >= DATE_SUB(CURDATE(), INTERVAL ' + created_on + ' DAY) ORDER BY id DESC', (err, rows, fields) => {
          if (err) {
            console.log("/orders_list_error" + err)
            res.status(200).send(err)

          } else {
            res.status(200).send(rows)
          }
        })
      }
    }
    if (status != '' && created_on != '') {
      connection.query('SELECT * FROM `orders_view` WHERE  `status` LIKE "%' + status + '%"  AND `created_on` >= DATE_SUB(CURDATE(), INTERVAL ' + created_on + ' DAY) ORDER BY id DESC', (err, rows, fields) => {
        if (err) {
          console.log("/orders_list_error" + err)
          res.status(200).send(err)
        } else {
          res.status(200).send(rows)
        }
      })
    }

  }
}


function order_status_change(req, res) {
 var {user_id,id,status_change}=req.body
//____________________________________________________________________________1
  //console.log(req.body.id)
  connection.query('UPDATE `orders` SET `status`= "' + status_change + '" WHERE `id` = '+id+ '', (err, rows, fields) => {
    if (err) {
      console.log("/order_status_change_error" + err)
      res.status(200).send(err)
    } else {
      console.log(rows.affectedRows)
      if (rows.affectedRows=='1') {
        //res.status(200).send(rows)
//____________________________________________________________________________2
        connection.query('SELECT `email` FROM users WHERE `user_id`=' + user_id + '', (err, rslt) => {
          if (err) {
            console.log({ "error": err })
          } else {
            var user_e_address = rslt[0].email
            connection.query('SELECT * FROM `email_template` WHERE `type` = "user" AND `email_type` = "'+status_change+'"', (err, rows) => {
              if (err) {
                console.log({ "error": err })
              } else {
                var html_data = rows[0].email_text;
                const mail_configs = {
                  from: 'ashish.we2code@gmail.com',
                  to: user_e_address,
                  subject: 'Apna Organic Store',
                  text: "apna organic",
                  html: html_data
                }
                nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: 'ashish.we2code@gmail.com',
                    pass: 'nczaguozpagczmjv'
                  }
                })
                  .sendMail(mail_configs, (err) => {
                    if (err) {
                      return console.log({ "email_error": err });
                    } else {
                      return res.status(200).send({ "email_message": "status mail sent to user succesfully", "status_message": "change order status succesfully " });
                    }
                  })
              }
            })
          }
        })
      } else {
        console.log("Not Update Order Status")

       
      }
    }
  })
}

function users_orders(req, res) {

  connection.query('SELECT * FROM `orders_view` WHERE  `user_id`= ' + req.query.user_id + '  ORDER BY id DESC', (err, rows, fields) => {
    if (err) {
      console.log("/orders_list_error" + err)
      res.status(500).send(err)

    } else {
      res.status(200).send(rows)
    }
  })
}



module.exports = { orders, order_deteils, orders_list, order_status_change, users_orders }




