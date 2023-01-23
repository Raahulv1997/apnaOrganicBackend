const { Auth, LoginCredentials } = require("two-step-auth");
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const connection = require('../db')
const USER_JWT_SECRET_KEY = process.env.USER_JWT_SECRET_KEY
var jwt = require('jsonwebtoken');
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;

var OTP = '';
var signup_condition=false;
var otp_verify_condition=false;
function signup(req, res) {
  var edata = req.body.email;
  var rst = regex.test(edata);
  if (rst) {
    connection.query("SELECT * FROM `users` WHERE email = '" + edata + "'",async (err, rows, fields) => {
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
          //console.log({"message":"User Already Exist. Please Login"});
          res.status(200).send({"response":"Email Already Exist"})
        } else {
          console.log("send________otp")
            OTP = Math.floor(100000 + Math.random() * 900000);
            console.log(OTP)
            connection.query('SELECT * FROM `users_otp` WHERE `email`="'+edata+'" ', (err, rows, fields) => {
              if (err) {
                //console.log("/_otp_error" + err);
                res.status(200).send(err)
              } else {
                if(rows!=''){
                  // console.log(rows)
                  connection.query('UPDATE `users_otp` SET `otp`="'+OTP+'" WHERE `email`="'+edata+'" ', (err, rows, fields) => {
                    if (err) {
                      //console.log("/_otp_error" + err);
                      res.status(200).send(err)
                    } else {
                      rows.affectedRows=='1'?sendOtpEmail(OTP):console.log({"message":"invalid input data"})
            
                    }
                  })
                }else{
                  console.log("nhi h, bataya na...")
                connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("'+edata+'","'+OTP+'")', (err, rows, fields) => {
                if (err) {
                  //console.log("/_otp_error" + err);
                  res.status(200).send(err)
                } else {
                if(rows!=''){
                  sendOtpEmail(OTP)
                }else{
                  console.log("Not insert in otp in database")
                }

                }
              })
                }
      
              }
            })
                function sendOtpEmail(OTP){

                  const mail_configs={
                    from:'ashish.we2code@gmail.com',
                    to:edata,
                    subject:'Apna Organic Store',
                    text:"One-time-password "+ OTP
                  }
    
                     nodemailer.createTransport({
                      service:'gmail',
                      auth:{
                          user:'ashish.we2code@gmail.com',
                          pass:'nczaguozpagczmjv'
                      }
                    })
                    .sendMail(mail_configs,(err)=>{
                      if(err){
                        return //console.log('errrr',err);
                      }else{
                        
                        return res.status(200).send({"message":"Send otp in Gmail Succesfully"});
                      }
                    })
                }
                
        }

      }
      signup_condition = true;
    })
  } else {
    res.status(513).send({ "message": "invalid address" })
  }

}

async function otp_verify(req,res){
    //console.log("--------------------------otp_verify--------------------------")
    //console.log("req.body")
      var email_otp = req.body.email
      var otp_ver = req.body.otp
      var password = req.body.password
      var cheked_email = regex.test(email_otp);
    
      const salt = await bcrypt.genSalt(10);
      password_salt = await bcrypt.hash(password, salt);
      //console.log(password_salt)
    
      if(email_otp !='' && otp_ver !='' && password !=''){
        //console.log(email_otp)
        //console.log(otp_ver)
        if(cheked_email){
          //console.log("email_true")
          connection.query("SELECT * FROM `users_otp` WHERE email = '" + email_otp + "'",async (err, rows, fields) => {
            if(err){
              //console.log(err)
            }else{
              //console.log("otp_result____________________")
              //console.log("rows")
              if(rows!=''){
      
                var userauth = JSON.parse(JSON.stringify(rows));
                var user_otp = userauth[0].otp;
                //console.log( otp_ver +"=="+ user_otp)
                
                if(otp_ver == user_otp){
                  //console.log("otp verification successfully")
                  //res.send({"message":"otp verification successfully"})
                  if(signup_condition){
                    connection.query("INSERT INTO `users`( `email`, `password`) VALUES ('"+email_otp+"','"+password_salt+"')",async (err, rows, fields) => {
                      if(err){
                        //console.log("error"+err)
                        res.status(200).send(err)
                      }else{
                        //console.log("_____")
                        if(rows!=''){
                          var uid = rows.insertId
                          jwt.sign({ id: rows.insertId }, USER_JWT_SECRET_KEY, function(err,token){
                            //console.log(token);
                            if(err){
                              //console.log(err)
                            }
                            
                            connection.query('UPDATE `users` SET `token`="'+token+'" WHERE `user_id`='+uid+'',async (err, rows, fields) => {
                              if(err){
                                //console.log("error"+err)
                              }else{
                                //console.log(["update token", rows])
                              }
                            })
                            res.send({"user_id":rows,"user_email":rows.insertId ,"token":token})
                            signup_condition=false;
                          });
                          
                          connection.query('DELETE FROM `users_otp` WHERE email ="'+ email_otp +'" ',async (err, rows, fields) => {
                            if(err){
                              //console.log("error"+err)
                              res.status(200).send(err)
                            }else{
                              rows.affectedRows=='1'?console.log({"message":"successfully delete "}):console.log({"message":"invalid input data"})
        
                            }
                          })
                          
                        }
  
                      }
                    })
                  }
                  else{
                    //console.log('otp veification error')
                  }
  
                  if(otp_verify_condition){
                    connection.query('UPDATE `users` SET `password`="'+password_salt+'" WHERE `email`="'+email_otp+'" ',async (err, rows, fields) => {
                      if(err){
                        //console.log("error"+err)
                        res.status(200).send(err)
                      }else{
                        if(rows!=''){
                          connection.query('DELETE FROM `users_otp` WHERE email ="'+ email_otp +'" ',async (err, rows, fields) => {
                            if(err){
                              //console.log("error"+err)
                              res.status(200).send(err)
                            }else{
                              if(rows.affectedRows=='1'){
                                // res.status(202).send(rows)
                                //console.log({"message":"successfully delete "})
                              }else{
                                //console.log({"message":"invalid input data "})
                              }
                            }
                          })
                          res.status(202).send(rows)
                          otp_verify_condition=false;
                        }
                      }
                    }) 
                  }
                  
                }else{
                  res.status(200).send({"message":"otp not matched"})
                }
               
              }else{
                res.status(200).send({"message":"email address not matched"})
              }
            }
          })
        }else{
          //console.log("email_false")
          res.status(513).send({ "message": "invalid address" })
        }
      }else{
        res.status(200).send({"response":"please fill all input fields"})
      }
    

  
}

async function user_register(req,res){
  var {first_name,last_name,email,phone_no, gender,date_of_birth,address,address2}=req.body
//console.log(first_name+last_name+email+phone_no+ gender+date_of_birth+address+address2)
 
// UPDATE `users` SET `first_name`='ahish',`last_name`='patidar',`password`='21213778',`phone_no`='2121378943',`gender`='male',`date_of_birth`= '1999-07-30',`address`='indore',`address2`='indore banganga' WHERE email='mayurgeek@gmail.com'
 
// const salt = await bcrypt.genSalt(10);
//  password_salt = await bcrypt.hash(password, salt);
//  //console.log(password_salt)
//console.log("user_reg--------------------------------------")
//console.log(req.user)

 connection.query("UPDATE `users` SET `first_name`='"+first_name+"',`last_name`='"+last_name+"',`phone_no`='"+phone_no+"',`gender`='"+gender+"',`date_of_birth`= '"+date_of_birth+"',`address`='"+address+"',`address2`='"+address2+"' WHERE `user_id`='"+req.user+"'",async (err, rows, fields) => {
  if(err){
    //console.log("error"+err)
    res.status(200).send(err)
  }else{
    //console.log("_____")
    rows.affectedRows=='1'?res.status(202).send({"message":"updated user profile"}):res.status(200).send({"message":"error"})

  }
})

}
function user_details(req,res){
// //console.log(req.query)
connection.query("SELECT `user_id`,`first_name`,`last_name`,`email`,`phone_no`,`gender`,`date_of_birth`,`address`,`address2` FROM `users` WHERE `user_id` = "+req.user+"",async (err, rows, fields) => {
  if(err){
    //console.log("error"+err)
    res.status(200).send(err)
  }else{
    if(rows!=''){
      //console.log("_____")
      res.status(200).send(rows)
    }else{
      res.status(401).send({"message":"invalid user id"})
    }
  }
})
}

async function user_login(req,res){
//console.log("req.body")

var {user_email,user_password} = req.body

const salt = await bcrypt.genSalt(10);
password_salt = await bcrypt.hash(user_password, salt);
//console.log(password_salt)

// const validPassword = await bcrypt.compare(password,'$2b$10$81UsHRVghsW.47o7dMqiQ.DsJgTfz333wDFKTYZYQOGkJhoSEr1m6');
// //console.log(validPassword)

 connection.query('SELECT `user_id`, `email` , `password` FROM `users`  WHERE `email` ="'+user_email+'"',async (err,results)=>{
        if(err){
          //console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                
                    //console.log("_____")
                    // return false
                    var psw =  JSON.parse(JSON.stringify(results[0].password))
                    //console.log(typeof psw)
                    const validPassword = await bcrypt.compare(user_password,psw);
                    //console.log(validPassword)
                    if(validPassword){
                       jwt.sign({ id: results[0].user_id }, USER_JWT_SECRET_KEY, function(err,token){
                        //console.log(token);
                        if(err){
                          //console.log(err)
                        }
                        connection.query('UPDATE `users` SET `token`="'+token+'" WHERE `user_id`='+results[0].user_id+'',async (err, rows, fields) => {
                          if(err){
                            //console.log("error"+err)
                          }else{
                            //console.log(["update token", rows])
                          }
                        })
                        res.send({"user_id":results[0].user_id,"user_email":results[0].email,"token":token})
                      });
                     
                    }else{res.send({"message":"password not matched"})}
                   // validPassword ?res.send({"user_id":results[0].user_id,"user_email":results[0].email}) : res.send(false)
                    
            }else{
                res.send({"message":"email not exist"}) 
            }
            
        }
})

}

function change_user_password(req,res){
  var {email,password,new_password} = req.body
if(email != '' && password != '' && new_password != ''){
    //console.log("fill all")
    connection.query('SELECT `email` , `password` FROM `users`  WHERE `email` ="'+email+'"',async (err,results)=>{
        if(err){
          //console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                    //console.log("_____")
                    var psw =  JSON.parse(JSON.stringify(results[0].password))
                    //console.log(typeof psw)
                    const validPassword = await bcrypt.compare(password,psw);
                    //console.log(validPassword)
                    if(validPassword) { 
                        const salt = await bcrypt.genSalt(10);
                        password_salt = await bcrypt.hash(new_password, salt);
                        //console.log(password_salt)
                        connection.query('UPDATE `users` SET `password`= "'+password_salt+'" WHERE `email` = "'+email+'"',async (err,results)=>{
                            if(err){
                            //console.log(err)
                            res.send(err)
                            }else{
                                //console.log("password_updated")
                                res.send(true)
                            }
                        })
                    }else{
                         res.send(false)
                        }
            }else{
                res.send(false) 
            }
        }
})
}else{
    //console.log("plaese fill all input")
}
}

function user_forgot_password(req,res){

  var edata = req.body.email;
  var rst = regex.test(edata);
  if (rst) {
    connection.query("SELECT * FROM `users` WHERE email = '" + edata + "'",async (err, rows, fields) => {
      if (err) {
        //console.log("/signup_error" + err)
        res.status(200).send(err)
      } else {
        if (rows != '') {
          var umail = JSON.parse(JSON.stringify(rows));
          var useremail = umail[0].email;
          //console.log(useremail);
          //console.log({"message":"User Already Exist. Please Login"});
          //res.status(200).send(false)
            OTP =  Math.floor(100000 + Math.random() * 900000);
            console.log(OTP);
            connection.query('SELECT * FROM `users_otp` WHERE `email`="'+edata+'" ', (err, rows, fields) => {
              if (err) {
                //console.log("/_otp_error" + err);
                res.status(200).send(err)
              } else {
                if(rows!=''){
                  // console.log(rows)
                  connection.query('UPDATE `users_otp` SET `otp`="'+OTP+'" WHERE `email`="'+edata+'" ', (err, rows, fields) => {
                    if (err) {
                      //console.log("/_otp_error" + err);
                      res.status(200).send(err)
                    } else {
                      rows.affectedRows=='1'?sendOtpEmail(OTP):console.log({"message":"invalid input data"})
            
                    }
                  })
                }else{
                  console.log("nhi h, bataya na...")
                connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("'+edata+'","'+OTP+'")', (err, rows, fields) => {
                if (err) {
                  //console.log("/_otp_error" + err);
                  res.status(200).send(err)
                } else {
                if(rows!=''){
                  sendOtpEmail(OTP)
                }else{
                  console.log("Not insert in otp in database")
                }

                }
              })
                }
      
              }
            })

            function sendOtpEmail(OTP){

              const mail_configs={
                from:'ashish.we2code@gmail.com',
                to:edata,
                subject:'Apna Organic Store',
                text:"One-time-password "+ OTP
              }

                 nodemailer.createTransport({
                  service:'gmail',
                  auth:{
                      user:'ashish.we2code@gmail.com',
                      pass:'nczaguozpagczmjv'
                  }
                })
                .sendMail(mail_configs,(err)=>{
                  if(err){
                    return //console.log('errrr',err);
                  }else{
                    
                    return res.status(200).send({"message":"Send otp in Gmail Succesfully"});
                  }
                })
            }         
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
module.exports = {signup,otp_verify, user_register,user_details, user_login, change_user_password, user_forgot_password }