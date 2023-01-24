const connection = require('../db')
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const fs = require('fs');
const path = require("path")

var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;

function vendors(req, res) {
  // //console.log(typeof req.query.category)
  //res.send(req.query.category)
  if (req.query.id == 'all') {
    connection.query('SELECT * FROM vendor WHERE 1  ', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    connection.query('SELECT * FROM vendor WHERE id =' + req.query.id + ' ', (err, rows, fields) => {
      if (err) {
        //console.log("/vendors_error" + err)
        res.status(200).send(err)
      } else {
        var slink = JSON.parse(JSON.stringify(rows[0].social_media_links))
        var slink1 = JSON.parse(slink)
        delete rows[0].social_media_links;
        Object.assign(rows[0], { "social_media_links": slink1 })
        res.status(200).send(rows)
      }
    })
  }
}
var signup_condition = false;
var otp_verify_condition = false;

function vendor_signup(req, res) {
  var email_data = req.body.email;
  var rst = regex.test(email_data);
  if (rst) {
    connection.query("SELECT * FROM `vendor` WHERE email = '" + email_data + "'", async (err, rows, fields) => {
      if (err) {
        //console.log("/signup_error" + err)
        res.status(200).send(err)
      } else {
        if (rows != '') {
          //console.log("_____");
          //console.log("redirect login page");
          var umail = JSON.parse(JSON.stringify(rows));
          var useremail = umail[0].email;
          //console.log(useremail);
          res.send({ "message": "Vendor of this e-mail:'" + useremail + "' Already Exist. Please Login", "response": false })
        } else {
          //console.log("send________otp")

          function generateOTP() {
            var digits = '123456789';
            var OTP = '';
            for (let o = 0; o < 6; o++) {
              OTP += digits[Math.floor(Math.random() * 10)];
            }
            connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("' + email_data + '","' + OTP + '")', (err, rows, fields) => {
              if (err) {
                //console.log("/_otp_error" + err);
                res.status(200).send(err)
              } else {
                //console.log("_____");
                // res.send({"message":"send otp on your mail"});

                const mail_configs = {
                  from: 'ashish.we2code@gmail.com',
                  to: email_data,
                  subject: 'Apna Organic Store',
                  text: "One-time-password " + OTP
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
                      return //console.log('errrr', err);
                    } else {
                      return res.status(200).send({ "message": "Send otp in Gmail Succesfully" });
                    }
                  })

              }
            })
            return OTP
          }
          console.log(generateOTP())
        }
      }
      signup_condition = true;
    })
  } else {
    res.status(513).send({ "message": "invalid address" })
  }
}



async function vendor_otp_verify(req, res) {
  //console.log("req.body")
  var respo = ''
  var email_otp = req.body.email
  var password_ = req.body.password
  var otp_ver = req.body.otp
  var cheked_email = regex.test(email_otp);
  const salt = await bcrypt.genSalt(10);
  const password_salt = await bcrypt.hash(password_, salt);
  //console.log(password_salt)
  if (cheked_email) {
    //console.log("email_true")
    connection.query("SELECT * FROM `users_otp` WHERE email = '" + email_otp + "'", async (err, rows, fields) => {
      if (err) {
        //console.log(err)
      } else {
        //console.log("otp_result____________________")
        //console.log("rows")
        if (rows != '') {

          var userauth = JSON.parse(JSON.stringify(rows));
          var user_otp = userauth[0].otp;
          //console.log(otp_ver + "==" + user_otp)
          if (otp_ver == user_otp) {
            //console.log("otp verification successfully")
            //res.send({"message":"otp verification successfully"})
            if (signup_condition) {
              connection.query("INSERT INTO `vendor`( `email`, `password`) VALUES ('" + email_otp + "','" + password_salt + "')", async (err, rows, fields) => {
                if (err) {
                  //console.log("error" + err)
                  res.status(200).send(err)
                } else {
                  //console.log("_____")
                  if (rows != '') {
                    respo = rows
                    //console.log("+++++++++++++++++++")
                    //console.log("rows")
                    //_____________________________________________________________
                    connection.query('INSERT INTO `notification`(`actor_id`, `actor_type`, `message`, `status`) VALUES ("' + rows.insertId + '","admin","vendor requested for approve","unread") , ("' + rows.insertId + '","vendor","please register your information in profile","unread")', (err, rows) => {
                      if (err) {
                        //console.log({ "notification": err })
                      } else {
                        //console.log("_______notification-send-admin__________")
                      }
                    })
                    connection.query('SELECT * FROM `email_template` WHERE  `email_type` = "Shipped"', (err, rows) => {
                      if (err) {
                        //console.log({ "error": err })
                      } else {
                        if (rows != '') {

                          //console.log(rows[0].email_text)
                          var html_data = rows[0].email_text;
                          const mail_configs = {
                            from: 'ashish.we2code@gmail.com',
                            to: email_otp,
                            subject: 'Apna Organic Store',
                            text: "your reg. request pending wait for approove",
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
                                return //console.log({ "email_error": err });
                              } else {
                                connection.query('DELETE FROM `users_otp` WHERE email ="' + email_otp + '" ', async (err, rows, fields) => {
                                  if (err) {
                                    //console.log("error" + err)
                                    res.status(200).send(err)
                                  } else {
                                    rows.affectedRows == '1' ? console.log({ "message": "successfully delete " }) : console.log({ "message": "invalid input data" })

                                  }
                                })
                                signup_condition = false
                                return res.status(202).send(respo);
                              }
                            })
                        } else {
                          res.send({ "message": "status not define" })
                        }
                      }
                    })
                  }

                }
              })
            }
            else {
              //console.log('otp veification error')
            }

            if (otp_verify_condition) {
              connection.query('UPDATE `vendor` SET `password`="' + password_salt + '" WHERE `email`="' + email_otp + '" ', async (err, rows, fields) => {
                if (err) {
                  //console.log("error" + err)
                  res.status(200).send(err)
                } else {
                  if (rows != '') {
                    connection.query('DELETE FROM `users_otp` WHERE email ="' + email_otp + '" ', async (err, rows, fields) => {
                      if (err) {
                        //console.log("error" + err)
                        res.status(200).send(err)
                      } else {
                        if (rows.affectedRows == '1') {
                          // res.status(202).send(rows)
                          //console.log({ "message": "successfully delete " })
                        } else {
                          //console.log({ "message": "invalid input data " })
                        }
                      }
                    })
                    res.status(202).send(rows)
                    otp_verify_condition = false;
                  }
                }
              })
            }

          } else {
            res.status(200).send({ "message": "please check credential" })
          }

        } else {
          res.status(200).send({ "message": "please check credential" })
        }
      }
    })
  } else {
    //console.log("email_false")
    res.status(513).send({ "message": "invalid address" })
  }

}


async function vendor_login(req, res) {
  //console.log("req.body")
  var { email, password } = req.body
  connection.query('SELECT `id`, `email` , `password` FROM `vendor`  WHERE `email` ="' + email + '"', async (err, results) => {
    if (err) {
      //console.log(err)
      res.send(err)
    } else {
      if (results != '') {

        //console.log("_____")
        // return false
        var psw = JSON.parse(JSON.stringify(results[0].password))
        //console.log(typeof psw)
        const validPassword = await bcrypt.compare(password, psw);
        //console.log(validPassword)
        validPassword ? res.send({ "id": results[0].id, "vendor_email": results[0].email }) : res.send({ "message": "please fill valid credintials" })

      } else {
        res.send({ "message": "check_credintials" })
      }
    }
  })
}



function change_vendor_password(req, res) {
  var { email, password, new_password } = req.body
  if (email != '' && password != '' && new_password != '') {
    //console.log("fill all")
    connection.query('SELECT `email` , `password` FROM `vendor`  WHERE `email` ="' + email + '"', async (err, results) => {
      if (err) {
        //console.log(err)
        res.send(err)
      } else {
        if (results != '') {
          //console.log("_____")
          var psw = JSON.parse(JSON.stringify(results[0].password))
          //console.log(typeof psw)
          const validPassword = await bcrypt.compare(password, psw);
          //console.log(validPassword)
          if (validPassword) {
            const salt = await bcrypt.genSalt(10);
            password_salt = await bcrypt.hash(new_password, salt);
            //console.log(password_salt)
            connection.query('UPDATE `vendor` SET `password`= "' + password_salt + '" WHERE `email` = "' + email + '"', async (err, results) => {
              if (err) {
                //console.log(err)
                res.send(err)
              } else {
                //console.log("password_updated")
                res.send({ "message": "new_password_updated", "response": true })
              }
            })
          } else {
            res.send({ "message": "check credentials" })
          }
        } else {
          res.send({ "message": "invalid credentials" })
        }
      }
    })
  } else {
    //console.log("plaese fill all input")
  }
}

function vendor_register(req, res) {
  var { owner_name, shop_name, mobile, email, shop_address, gstn, geolocation, store_type, status, document_name, availability, social_media_links } = req.body;
  //console.log("_________+++++_________________vendor_register______________++++++_______________")
  //console.log("req.body")
  var document_name1 = JSON.stringify(document_name)
  //console.log(document_name1)
  var social_media_links_new = JSON.stringify(JSON.parse(social_media_links))
  //console.log(typeof social_media_links_new)
  //console.log(social_media_links_new)

  if (req.file == undefined || req.file == '') {
    image = "no image"
  } else {
    var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
    //console.log(image)
  }

  //res.send([newar])
  //return false
  connection.query("INSERT INTO `vendor`(`email`,`owner_name`, `shop_name`, `mobile`, `shop_address`, `gstn`, `geolocation`, `store_type`, `shop_logo`, `status`, `document_name`, `availability`,`social_media_links`) VALUES ('" + email + "','" + owner_name + "','" + shop_name + "','" + mobile + "','" + shop_address + "','" + gstn + "','" + geolocation + "','" + store_type + "','" + image + "','" + status + "','" + document_name1 + "','" + availability + "','" + social_media_links_new + "')", async (err, rows, fields) => {
    if (err) {
      //console.log("error" + err)
      res.status(200).send(err)
    } else {
      //console.log("_____")
      //res.status(200).send(rows)
      connection.query('SELECT `admin_email` FROM admin_login_details WHERE `admin_type`="super_admin"', (err, rslt) => {
        if (err) {
          //console.log({ "error": err })
        } else {
          var user_e_address = rslt[0].admin_email
          //console.log(user_e_address)
          connection.query('SELECT * FROM `email_template` WHERE  `email_type` = "Shipped"', (err, rows) => {
            if (err) {
              //console.log({ "error": err })
            } else {
              if (rows != '') {
                //console.log(rows[0].email_text)
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
                      return //console.log({ "email_error": err });
                    } else {
                      connection.query('INSERT INTO `notification`(`actor_id`, `actor_type`, `message`, `status`) VALUES ("' + rows.insertId + '","admin","vendor requested for approve","unread") , ("' + rows.insertId + '","vendor","please wait for approve profile","unread")', (err, rows) => {
                        if (err) {
                          //console.log({ "notification": err })
                        } else {
                          //console.log("_______notification-send-admin_vendor__________")
                        }
                      })
                      return res.status(200).send({ "message": "Sent mail to super_admin Succesfully", "message_for_vendor": "sent your request to admin" });
                    }
                  })
              } else {
                res.send({ "message": "status not define" })
              }
            }
          })
        }
      })
    }
  })
}



function vendor_list(req, res) {
  //console.log("req.body")
  var { owner_name, store_type, status } = req.body;
  if (owner_name != '' || store_type != '' || status != '') {

    var stringsearch = 'SELECT * FROM `vendor` WHERE '
    var catobj = req.body;
    //console.log(catobj)
    var objvalue = Object.values(catobj)
    var objkey = Object.keys(catobj)
    for (m = 0; m < objkey.length; m++) {
      if (objvalue[m] != '') {
        if (m == 0) {
          stringsearch += "`" + objkey[m] + "` LIKE '%" + objvalue[m] + "%' "
        } else {
          if (objvalue[0] == '') {
            stringsearch += "`" + objkey[m] + "` LIKE '%" + objvalue[m] + "%' AND "
          } else {
            stringsearch += " AND `" + objkey[m] + "` LIKE '%" + objvalue[m] + "%'"
          }
        }
      }
    }
    //console.log(stringsearch)
    var lastCharOfHello = stringsearch.slice(-4);//d
    //console.log("________" + lastCharOfHello + "_______")
    if (lastCharOfHello == "AND ") {
      //console.log("and")
      var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') + 1, stringsearch.indexOf("  "));
      stringsearch = id;
    } else {

      //console.log("no avia")
    }
    connection.query('' + stringsearch + ' ORDER BY id DESC', (err, rows, fields) => {
      if (err) {
        //console.log("/vendor_error" + err)
        res.status(200).send(err)
      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    connection.query('SELECT * FROM `vendor` WHERE 1 ORDER BY id DESC', (err, rows, fields) => {
      if (err) {
        //console.log("/vendor_error" + err)
        res.status(200).send(err)
      } else {
        res.status(200).send(rows)
      }
    })
  }
}

function vendor_update(req, res) {
  var { owner_name, shop_name, mobile, id, shop_address, gstn, geolocation, store_type, status, document_name, availability, social_media_links } = req.body;
  //console.log("req.body")
  //console.log(req.file)
  var document_name1 = JSON.stringify(document_name)
  var social_media_links_new = JSON.stringify(JSON.parse(social_media_links))
  //console.log(typeof social_media_links_new)
  //console.log(social_media_links_new)


  if (req.file == undefined || req.file == '') {
    // image="no image"
    connection.query("UPDATE `vendor` SET `owner_name`='" + owner_name + "',`shop_name`='" + shop_name + "',`mobile`='" + mobile + "',`shop_address`='" + shop_address + "',`gstn`='" + gstn + "',`geolocation`='" + geolocation + "',`store_type`='" + store_type + "',`status`='" + status + "',`document_name`= '" + document_name1 + "',`availability`='" + availability + "',`social_media_links`='" + social_media_links_new + "'  WHERE id='" + id + "'", async (err, rows, fields) => {
      if (err) {
        //console.log("error" + err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          //console.log("_____")
          res.status(200).send({ "message": "Updated Vendor Profile" })
        } else {
          res.status(500).send({ "message": "Error Plaese Give Valid Data " })
        }
      }
    })
  } else {
    var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
    //console.log(image)
    connection.query("UPDATE `vendor` SET `owner_name`='" + owner_name + "',`shop_name`='" + shop_name + "',`mobile`='" + mobile + "',`shop_address`='" + shop_address + "',`gstn`='" + gstn + "',`geolocation`='" + geolocation + "',`store_type`='" + store_type + "',`shop_logo`='" + image + "',`status`='" + status + "',`document_name`= '" + document_name1 + "',`availability`='" + availability + "',`social_media_links`='" + social_media_links_new + "'  WHERE id='" + id + "'", async (err, rows, fields) => {
      if (err) {
        //console.log("error" + err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          //console.log("_____")
          res.status(200).send({ "message": "Updated Vendor Profile" })
        } else {
          res.status(500).send({ "message": "Error Plaese Give Valid Data " })
        }
      }
    })
  }
}

function vendor_status_change(req, res) {
  //console.log(req.body.id)
  var { status_change, id } = req.body
  connection.query('UPDATE `vendor` SET `status`= "' + status_change + '" WHERE `id` = ' + id + '', (err, rows, fields) => {
    if (err) {
      //console.log("/vendor_update_error" + err)
      res.send(err)
    } else {
      if (rows.affectedRows == '1') {
        //res.send(rows)
        //console.log("succesfully updated vendor status")

        connection.query('SELECT `email` FROM vendor WHERE `id`=' + id + '', (err, rslt) => {
          if (err) {
            //console.log({ "error": err })
          } else {
            if (rslt != '') {
              var user_e_address = rslt[0].email;
              //console.log(user_e_address)
              connection.query('SELECT  `notification_text` FROM `notification_template` WHERE  `type`="vendor" AND `notification_type`="' + status_change + '" ', (err, rows) => {
                if (err) {
                  //console.log({ "notification": err })
                } else {
                  if (rows != '') {
                    //console.log(rows[0].notification_text);
                    connection.query('INSERT INTO `notification`(`actor_id`, `actor_type`, `message`, `status`) VALUES ("' + id + '","vendor","' + rows[0].notification_text + '","unread")', (err, rows) => {
                      if (err) {
                        //console.log({ "notification": err })
                      } else {
                        //console.log("_______notification-send-admin__________")
                      }
                    })
                  }

                }
              })
              connection.query('SELECT * FROM `email_template` WHERE `email_type` = "' + status_change + '"', (err, rows) => {
                if (err) {
                  //console.log({ "error": err })
                } else {
                  if (rows != '') {
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
                          return //console.log({ "email_error": err });
                        } else {
                          return res.status(200).send({ "email_message": "status mail sent to user succesfully", "status_message": "vendor status change succesfully " });
                        }
                      })
                  }

                }
              })
            }
          }

        })
      } else {
        //console.log("not update vendor status")
        res.send("not update vendor status")
      }
    }
  })
}


function content_manager(req, res) {
  //console.log("req.body")
  var { vendor_id, show_product_rating } = req.body
  connection.query('UPDATE `vendor` SET `show_product_rating`=' + show_product_rating + ' WHERE `id`=' + vendor_id + '', async (err, rows, fields) => {
    if (err) {
      //console.log("error" + err)
      res.status(200).send(err)
    } else {
      //console.log("_____")
      rows.affectedRows == '1' ? res.status(200).send({ "message": "deleted_successfully" }) : res.status(200).send({ "message": "invalid_id" })
    }
  })
}


function vendor_documents_upload(req, res) {

  var base64_images = req.body
  let iterations = base64_images.length;
  // //console.log("req.body")
  for (item of base64_images) {
    var imgBase64 = item.img_64
    try {
      // //console.log(path.join(__dirname,'../'))
      var base64Data = imgBase64.replace("data:image/png;base64,", "");
      var name_str = "" + item.documents_name + "" + item.vendor_id + ""
      fs.writeFileSync(path.join(__dirname, '../') + "/public/vendor_documents/" + name_str + "." + item.type_of_file + "", base64Data, 'base64');
    } catch (err) {
      //console.log(err)
    }
    //console.log(item.vendor_id)
    connection.query('INSERT INTO `vendors_documents`( `vendor_id`, `documents_name`, `documents_path`, `documents_position`) VALUES (' + item.vendor_id + ',"' + item.documents_name + '","http://192.168.29.108:5000/vendor_documents/' + name_str + '.' + item.type_of_file + '","' + item.documents_position + '")', (err, rows, fields) => {
      if (err) {
        //console.log(err)
        res.status(200).send(err)
      } else {
        //console.log("rows")
      }
    })

    if (!--iterations) {
      res.status(200).send("added_succecfully")
    }
  }
}

function vendor_documents_get(req, res) {
  //console.log(req.query)
  // var {product_id}=req.query
  connection.query('SELECT * FROM vendors_documents WHERE `vendor_id`=' + req.query.vendor_id + ' ', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      //console.log("rows")
      res.status(200).send(rows)
    }
  })
}


function vendor_document_delete(req, res) {
  //console.log("req.body")
  var { vendor_id, vendor_doc_id } = req.body
  connection.query('DELETE FROM `vendors_documents` WHERE `vendor_id`="' + vendor_id + '" AND vendor_doc_id=' + vendor_doc_id + '', async (err, rows, fields) => {
    if (err) {
      //console.log("error" + err)
      res.status(200).send(err)
    } else {
      //console.log("_____")
      rows.affectedRows == '1' ? res.status(200).send({ "message": "deleted_successfully" }) : res.status(200).send({ "message": "invalid_id" })
    }
  })
}

function vendor_forgot_password(req, res) {
  var edata = req.body.email;
  var rst = regex.test(edata);
  if (rst) {
    connection.query("SELECT * FROM `vendor` WHERE email = '" + edata + "'", async (err, rows, fields) => {
      if (err) {
        //console.log("/signup_error" + err)
        res.status(200).send(err)
      } else {
        if (rows != '') {
          var umail = JSON.parse(JSON.stringify(rows));
          var useremail = umail[0].email;
          //console.log(useremail);
          // //console.log({"message":"User Already Exist. Please Login"});
          //res.status(200).send(false)
          function generateOTP() {
            var digits = '123456789';
            OTP = '';
            for (let o = 0; o < 6; o++) {
              OTP += digits[Math.floor(Math.random() * 10)];
            }
            connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("' + edata + '","' + OTP + '")', (err, rows, fields) => {
              if (err) {
                //console.log("/_otp_error" + err);
                res.status(200).send(err)
              } else {
                //console.log("_____");
                // res.status(200).send({"message":"send otp on your mail"});
                const mail_configs = {
                  from: 'ashish.we2code@gmail.com',
                  to: edata,
                  subject: 'Apna Organic Store',
                  text: "One-time-password " + OTP
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
                      return //console.log('errrr', err);
                    } else {
                      return res.status(200).send({ "message": "send otp on your mail" });
                    }
                  })
              }
            })
            return OTP
          }

          //console.log(generateOTP())
        } else {
          res.status(200).send({ "message": "User Not Found" })
        }
      }
      otp_verify_condition = true;
    })
  } else {
    res.status(513).send({ "message": "invalid address" })
  }
}

module.exports = { vendor_register, vendor_list, vendor_update, vendors, content_manager, vendor_documents_upload, vendor_documents_get, vendor_document_delete, vendor_status_change, vendor_signup, vendor_otp_verify, vendor_forgot_password, change_vendor_password, vendor_login }
