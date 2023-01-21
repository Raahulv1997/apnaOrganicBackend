const { parse } = require('path');
const nodemailer = require("nodemailer")
const connection = require('../db')
var max_invoice_no1 = 0


async function orders(req, res) {
  var order_srting_mail = ""
  var user_e_address = '';
  var user_name = '';
  var address = '';
  var phone_no = '';
  var order_count = 0;
  var percentage;
  var { user_id, status, vendor_id, order_product, total_quantity, ref_no, payment_mode, payment_mode, delivery_date, invoice_date, order_date, total_amount, total_gst, total_cgst, total_sgst, taxable_value, discount_coupon, shipping_charges, discount_coupon_value } = req.body
  //console.log("______chk-1_____")
  //console.log(user_id + "" + status)
  ////console.log(order_product)
  connection.query('SELECT * FROM users WHERE `user_id`=' + user_id + '', (err, rslt) => {
    if (err) {
      //console.log({ "error": err })
    } else {
      user_e_address = rslt[0].email;
      user_name = rslt[0].first_name;
      address = rslt[0].address;
      phone_no = rslt[0].phone_no;
      //console.log(user_e_address + "" + address)
      if (address != '') {
        var orderno = Math.floor(100000 + Math.random() * 900000)
        connection.query('SELECT MAX(invoice_no) AS "max_invoice_no" FROM orders', async (err, results) => {
          if (err) {
            //console.log({ "error_1": err })
          } else {
            max_invoice_no1 = 0
            max_invoice_no1 = JSON.parse(JSON.stringify(results[0].max_invoice_no))

            connection.query('INSERT INTO `orders` (`id`,`user_id`,`vendor_id`,`total_quantity`,`ref_no`,`payment_mode`,`delivery_date`, `shipping_charges`, `status`,`invoice_no`,`invoice_date`, `order_date`, `total_amount`, `total_gst`, `total_cgst`, `total_sgst`, `taxable_value`, `discount_coupon`,`discount_coupon_value`) VALUES (' + orderno + ',' + user_id + ',"' + vendor_id + '","' + total_quantity + '","' + ref_no + '","' + payment_mode + '","' + delivery_date + '", "' + shipping_charges + '","' + status + '",' + parseInt(max_invoice_no1 + 1) + ',"' + invoice_date + '","' + order_date + '","' + total_amount + '","' + total_gst + '","' + total_cgst + '","' + total_sgst + '","' + taxable_value + '","' + discount_coupon + '","' + discount_coupon_value + '")', async (err, results) => {
              if (err) {
                //console.log({ "error_2": err })
                //res.status(200).send(err)
              } else {
                if (results != '') {
                  max_invoice_no1 = 0
                  connection.query('SELECT * FROM coupons WHERE `id`=' + discount_coupon + '', async (err, rslt) => {
                    if (err) {
                      //console.log({ "error_3": err })
                      //res.status(200).send(err)
                    } else {
                      if (rslt != '') {
                        //console.log(rslt[0].percentage)
                        percentage = rslt[0].percentage;
                      }
                    }
                  })
                  var orderid = JSON.parse(JSON.stringify(results.insertId))
                  var iterations = order_product.length;
                  //console.log("__________iterations_________" + iterations)
                  for (item of order_product) {
                    var order_quantity_1 = 0
                    var product_verient_id = 0
                    product_verient_id = item.id
                    order_quantity_1 = parseInt(item.order_quantity)
                    connection.query('INSERT INTO `order_products` (`order_id`, `product_id`, `mrp`, `quantity`, `gst`, `cgst`, `sgst`,`value_added_tax`, `offer_id`, `discount`, `product_price`,`product_title_name`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `other_introduction`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `variety`, `vendor_id`, `shop`, `rating`, `colors`, `size`, `sale_price`, `manufacturing_date`, `special_offer`, `product_status`, `expire_date`, `unit`, `unit_quantity`,`all_images`,`order_quantity`) VALUES ("' + orderno + '","' + item.product_id + '","' + item.mrp + '","' + item.quantity + '","' + item.gst + '","' + item.cgst + '","' + item.sgst + '","' + item.value_added_tax + '","' + item.offer_id + '","' + item.discount + '", "' + item.product_price + '","' + item.product_title_name + '", "' + item.store_name + '", "' + item.product_description + '", "' + item.product_type + '", "' + item.brand + '", "' + item.category + '", "' + item.parent_category + '", "' + item.other_introduction + '", "' + item.wholesale_sales_tax + '", "' + item.manufacturers_sales_tax + '", "' + item.retails_sales_tax + '", "' + item.variety + '", "' + item.vendor_id + '", "' + item.shop + '", "' + item.rating + '", "' + item.colors + '", "' + item.size + '", "' + item.sale_price + '", "' + item.manufacturing_date + '", "' + item.special_offer + '", "' + item.product_status + '", "' + item.expire_date + '", "' + item.unit + '", "' + item.unit_quantity + '","' + item.all_images + '","' + item.order_quantity + '")', async (err, rslt) => {
                      if (err) {
                        //console.log(err)
                        // res.status(200).send(err)
                        //console.log({ "error_4": err })
                      } else {
                        if (rslt != '') {
                          order_count++

                          //________product-remove-from-cart_______________________________________________
                          connection.query('DELETE FROM `cart` WHERE `product_view_id` = "' + product_verient_id + '" AND `user_id` = "' + user_id + '"', (err, rows) => {
                            if (err) {
                              //console.log(err)
                            } else {
                              //console.log({ "message": "delete from cart", "product_verient_id": product_verient_id, "user_id": user_id })
                            }
                          })



                          //product_id quantity minus______________
                          connection.query('SELECT `quantity` FROM `products_pricing` WHERE `id`=' + product_verient_id + '', async (err, rslt) => {
                            if (err) {
                              //console.log({ "error": err })
                              //res.status(200).send(err)
                            } else {
                              if (rslt != '') {
                                //console.log("____chk__________update_quantity_________chk___________")
                                //console.log(rslt[0].quantity)
                                //console.log(order_quantity_1)
                                var update_quantity = parseFloat(rslt[0].quantity) - order_quantity_1
                                //console.log(update_quantity)
                                connection.query('UPDATE `products_pricing` SET `quantity`="' + update_quantity + '" WHERE `id`=' + product_verient_id + '', async (err, rows) => {
                                  if (err) {
                                    //console.log({ "error": err })
                                    //res.status(200).send(err)
                                  } else {
                                    rows.affectedRows == '1' ? console.log({ "message": "updated" + product_verient_id }) : console.log({ "message": "error" })
                                  }
                                })
                              }
                            }
                          })



                          order_srting_mail += `<div style='display: flex;'>
                    <div style='padding-right: 6px; display: flex; align-items: center;'><img src='${item.all_images}' width='70' height='52' /></div>
                    <div style='width: 100%;'>
                        <div style='display: flex; justify-content: space-between;'><strong style='display: flex;'> ${item.product_title_name}</strong><strong>Rs. ${item.sale_price}</strong></div>        
                        Delivery by ${delivery_date}<br />   
                        Qty: ${item.quantity}
                    </div>
                </div>`
                        }
                      }
                    })
                    if (!--iterations) {
                      setTimeout(() => {
                        connection.query('SELECT * FROM `notification_template` WHERE `notification_type` = "order_return"', (err, rows) => {
                          if (err) {
                            //console.log({ "notification": err })
                          } else {
                            //console.log("_______notification-send__________")
                            if (rows != '') {
                              connection.query('INSERT INTO `notification`(`actor_id`, `actor_type`, `message`, `status`) VALUES ("' + user_id + '","user","successfully placed order, total order- ' + order_count + '","unread") , ("' + vendor_id + '","vendor","recived ' + order_count + ' new order","unread")', (err, rows) => {
                                if (err) {
                                  //console.log({ "notification": err })
                                } else {
                                  //console.log("_______notification-send-__________")
                                }
                              })
                            } else {
                              res.send({ "message": "notification template not available" })
                            }

                          }
                        })

                        connection.query('SELECT * FROM `email_template` WHERE `type` = "user" AND `email_type` = "order"', (err, rows) => {
                          if (err) {
                            //console.log({ "error": err })
                          } else {
                            if (rows != '') {
                              //console.log("+++++++++++++++++++++++++order_srting_mail++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
                              // //console.log(order_srting_mail)
                              // //console.log(rows[0].email_text)
                              var html_data = rows[0].email_text;
                              html_data_replace = html_data.replaceAll('{user_name}', user_name)
                              html_data_replace = html_data_replace.replace('{order_date}', order_date)
                              html_data_replace = html_data_replace.replace('{order_id}', orderno)
                              html_data_replace = html_data_replace.replaceAll('{total_amount}', total_amount)
                              html_data_replace = html_data_replace.replace('{delivery_date}', delivery_date)
                              html_data_replace = html_data_replace.replaceAll('{address}', address)
                              html_data_replace = html_data_replace.replace('{contact_no}', phone_no)
                              html_data_replace = html_data_replace.replace('{order_list}', order_srting_mail)

                              //console.log(html_data_replace)
                              const mail_configs = {
                                from: 'ashish.we2code@gmail.com',
                                to: user_e_address,
                                subject: 'Apna Organic Store',
                                text: "your placed request pending",
                                html: html_data_replace
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
                                    return //console.log({ "email_error": err });
                                  } else {
                                    return res.status(200).send({ "order_id": orderno, "message": "Send mail Succesfully", "order": "order_count_" + order_count + "" });
                                  }
                                })
                            } else {
                              res.send({ "message": "status not define" })
                            }

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
        //console.log(max_invoice_no1)
        //return false
      } else { res.send({ "message": "please complete your profil first" }) }
    }
  })



}


function order_deteils(req, res) {

  //console.log(req.query.id)

  connection.query('SELECT * FROM `orders` WHERE `id` =' + req.query.id + '', (err, rslt) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      if (rslt != "") {
        //console.log("_____")
        //res.send(rslt)
        obj = JSON.parse(JSON.stringify(rslt[0]))
        o_id = JSON.parse(JSON.stringify(rslt[0].id))
        //console.log(o_id)

        connection.query("SELECT * FROM `order_products` WHERE `order_id` = '" + o_id + "'", (err, rows, fields) => {
          if (err) {
            //console.log(err)
            res.status(200).send(err)
          } else {
            if (rows != '') {
              obj["product_types"] = JSON.parse(JSON.stringify(rows))
              //console.log(obj)
              res.status(200).send(obj)
            } else {
              res.status(200).send(err)
            }
            //rows!=''?res.send(rows):res.send("error")
          }
        })
      } else {
        res.status(200).send("Wrong Id")
      }
    }
  })

}


function orders_list(req, res) {
  // //console.log("req.body")
  var { status, created_on } = req.body
  //console.log("order list")
  if (created_on == 'one') {
    var newdate = new Date();
    var current_date = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
    // //console.log(current_date)
    connection.query('SELECT * FROM orders_view WHERE `created_on` LIKE "%' + current_date + '%" ORDER BY id DESC', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)

      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    if (status == '' && created_on == '') {
      connection.query('SELECT * FROM `orders_view` WHERE  1 ORDER BY id DESC', (err, rows, fields) => {
        if (err) {
          //console.log("/orders_list_error" + err)
          res.status(200).send(err)

        } else {
          res.status(200).send(rows)
        }
      })
    } else {
      if (status != '' && created_on == '') {
        connection.query('SELECT * FROM `orders_view` WHERE `status` LIKE "%' + status + '%" ORDER BY id DESC', (err, rows, fields) => {
          if (err) {
            //console.log("/orders_list_error" + err)
            res.status(200).send(err)

          } else {
            res.status(200).send(rows)
          }
        })
      }

      if (created_on != '' && status == '') {
        connection.query('SELECT * FROM orders_view WHERE `created_on` >= DATE_SUB(CURDATE(), INTERVAL ' + created_on + ' DAY) ORDER BY id DESC', (err, rows, fields) => {
          if (err) {
            //console.log("/orders_list_error" + err)
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
          //console.log("/orders_list_error" + err)
          res.status(200).send(err)
        } else {
          res.status(200).send(rows)
        }
      })
    }

  }
}

function order_status_change(req, res) {
  var order_srting_mail = "";
  var { user_id, id, status_change } = req.body
  //____________________________________________________________________________1
  ////console.log(req.body.id)
  connection.query('UPDATE `orders` SET `status`= "' + status_change + '" WHERE `id` = ' + id + '', (err, rows, fields) => {
    if (err) {
      //console.log("/order_status_change_error" + err)
      res.status(200).send(err)
    } else {
      //console.log(rows.affectedRows)
      if (rows.affectedRows == '1') {
        //res.status(200).send(rows)
        //____________________________________________________________________________2
        connection.query('SELECT * FROM users WHERE `user_id`=' + user_id + '', (err, rslt) => {
          if (err) {
            //console.log({ "error": err })
          } else {
            // //console.log("rslt")
            var user_e_address = rslt[0].email;
            var first_name = rslt[0].first_name;
            var last_name = rslt[0].last_name;
            var full_user_name = first_name + " " + last_name
            var address = rslt[0].address;
            var phone_no = rslt[0].phone_no;
            // SELECT * FROM `orders_view` WHERE 1


            connection.query('SELECT * FROM `orders` WHERE `id` =' + id + '', (err, rows) => {
              if (err) {
                //console.log({ "notification": err })
              } else {
                //console.log("_______notification-send__________")
                if (rows != '') {
                  var v_id = rows[0].vendor_id
                  connection.query('SELECT * FROM `notification_template` WHERE `notification_type` = "order_return"', (err, rows) => {
                    if (err) {
                      //console.log({ "notification": err })
                    } else {
                      //console.log("_______notification-send__________")
                      if (rows != '') {
                        connection.query('INSERT INTO `notification`(`actor_id`, `actor_type`, `message`, `status`) VALUES ("' + user_id + '","user","' + rows[0].notification_text + '","unread"),("' + v_id + '","vendor","' + rows[0].notification_text + '","unread")', (err, rows) => {
                          if (err) {
                            //console.log({ "notification": err })
                          } else {
                            //console.log("_______notification-send-__________")
                          }
                        })
                      } else {
                        res.send({ "message": "notification template not available" })
                      }

                    }
                  })
                }
              }
            })

            connection.query('SELECT * FROM `orders` WHERE id="' + id + '" AND  `user_id`="' + user_id + '" ', (err, rslt) => {
              if (err) {
                //console.log({ "error": err })
              } else {
                if (rslt != '') {
                  var payment_mode = rslt[0].payment_mode
                  var shipping_charges = rslt[0].shipping_charges
                  var order_date = rslt[0].order_date
                  var total_amount = rslt[0].total_amount
                  var delivery_date = rslt[0].delivery_date
                  var payment_mode = rslt[0].payment_mode
                  connection.query('SELECT * FROM `orders_view` WHERE order_id="' + id + '" AND  `user_id`="' + user_id + '" ', (err, rslt) => {
                    if (err) {
                      //console.log({ "error": err })
                    } else {
                      if (rslt != '') {
                        //  //console.log("rslt")
                        //  //console.log("rslt")
                        var iterations = rslt.length;
                        for (item of rslt) {
                          // //console.log(item)
                          order_srting_mail += `<div style='display: flex;'>
                            <div style='padding-right: 6px; display: flex; align-items: center;'><img src='${item.all_images}' width='70' height='52' /></div>
                            <div style='width: 100%;'>
                                <div style='display: flex; justify-content: space-between;'><strong style='display: flex;'> ${item.product_title_name}</strong><strong>Rs. ${item.sale_price}</strong></div>        
                                Delivery by ${delivery_date}<br />   
                                Qty: ${item.quantity}
                            </div>
                            </div>`
                        }
                        //console.log(!--iterations)
                        if (!--iterations) {
                          //console.log("order_srting_mail")
                          // //console.log(order_srting_mail)

                          connection.query('SELECT * FROM `email_template` WHERE `type` = "user" AND `email_type` = "' + status_change + '"', (err, rows) => {
                            if (err) {
                              //console.log({ "error": err })
                            } else {
                              if (rows != '') {
                                var html_data = rows[0].email_text;
                                data_replace = html_data.replaceAll('{user_name}', full_user_name)
                                data_replace = data_replace.replace('{order_date}', order_date)
                                data_replace = data_replace.replace('{order_id}', id)
                                data_replace = data_replace.replaceAll('{total_amount}', total_amount)
                                data_replace = data_replace.replace('{delivery_date}', delivery_date)
                                data_replace = data_replace.replaceAll('{address}', address)
                                data_replace = data_replace.replace('{contact_no}', phone_no)
                                data_replace = data_replace.replace('{order_list}', order_srting_mail)
                                data_replace = data_replace.replace('{payment_mode}', payment_mode)
                                data_replace = data_replace.replace('{status}', status_change)

                                //console.log(data_replace)

                                const mail_configs = {
                                  from: 'ashish.we2code@gmail.com',
                                  to: user_e_address,
                                  subject: 'Apna Organic Store',
                                  text: "apna organic",
                                  html: data_replace
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
                                      return //console.log({ "email_error": err });
                                    } else {
                                      return res.status(200).send({ "email_message": "status mail sent to user succesfully", "status_message": "change order status succesfully " });
                                    }
                                  })
                              }
                              else {
                                //console.log("email not send")
                                res.status(200).send({ "email_message": "status mail not sent to user", "status_message": "change order status succesfully " });
                              }
                            }
                          })
                        }
                      }
                    }
                  })
                }
              }
            })

          }
        })
      } else {
        //console.log("Not Update Order Status")
      }
    }
  })
}

function users_orders(req, res) {

  connection.query('SELECT * FROM `orders_view` WHERE  `user_id`= ' + req.query.user_id + '  ORDER BY id DESC', (err, rows, fields) => {
    if (err) {
      //console.log("/orders_list_error" + err)
      res.status(200).send(err)

    } else {
      res.status(200).send(rows)
    }
  })
}



module.exports = { orders, order_deteils, orders_list, order_status_change, users_orders }