const { Auth, LoginCredentials } = require("two-step-auth");
const bcrypt = require("bcrypt")
const connection = require('../db')
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;

function signup(req, res) {
  var edata = req.body.email;
  var rst = regex.test(edata);
  if (rst) {
    connection.query("SELECT * FROM `users` WHERE email = '" + edata + "'",async (err, rows, fields) => {
      if (err) {
        console.log("/signup_error" + err)
        res.status(500).send(err)
      } else {
        if (rows != '') {
          console.log(rows);
          console.log("redirect login page");
          var umail = JSON.parse(JSON.stringify(rows));
          var useremail = umail[0].email;
          console.log(useremail);
          console.log({"message":"User Already Exist. Please Login"});
          res.status(200).send(false)
        } else {
          console.log("send________otp")

          function generateOTP() {
            var digits = '0123456789';
            let OTP = '';
            for (let o = 0; o < 6; o++ ) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
              connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("'+edata+'","'+OTP+'")', (err, rows, fields) => {
                if (err) {
                  console.log("/_otp_error" + err);
                  res.status(500).send(err)
                } else {
                  console.log(rows);
                  res.status(200).send(OTP);
                }
              })
            return OTP
        }
         console.log(generateOTP()) 
            // try {
            //   console.log(edata)
            //   const resp = await Auth(edata, "apnaorganicstore");
            //   console.log(resp);
            //   // res.json({"message":"Sent Otp On Your Email"})
            //   connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("'+resp.mail+'","'+resp.OTP+'")', (err, rows, fields) => {
            //     if (err) {
            //       console.log("/_otp_error" + err);
            //       res.send(err)
            //     } else {
            //       console.log(rows);
            //       res.send(rows);
            //     }
            //   })
            //   } catch (error) {
            //   console.log(error);
            // }
        }

      }
    })
  } else {
    res.status(513).send({ "message": "invalid address" })
  }

}

async function otp_verify(req,res){
  console.log("--------------------------otp_verify--------------------------")
console.log(req.body)
  var email_otp = req.body.email
  var otp_ver = req.body.otp
  var password = req.body.password
  var cheked_email = regex.test(email_otp);

  const salt = await bcrypt.genSalt(10);
  password_salt = await bcrypt.hash(password, salt);
  console.log(password_salt)


console.log(email_otp)
  console.log(otp_ver)
  if(cheked_email){
    console.log("email_true")
    connection.query("SELECT * FROM `users_otp` WHERE email = '" + email_otp + "'",async (err, rows, fields) => {
      if(err){
        console.log(err)
      }else{
        console.log("otp_result")
        console.log(rows)
        if(rows!=''){

          var userauth = JSON.parse(JSON.stringify(rows));
          var user_otp = userauth[0].otp;
          console.log( otp_ver +"=="+ user_otp)
          if(otp_ver === user_otp){
            console.log("otp verification successfully")
            //res.send({"message":"otp verification successfully"})

            connection.query("INSERT INTO `users`( `email`, `password`) VALUES ('"+email_otp+"','"+password_salt+"')",async (err, rows, fields) => {
              if(err){
                console.log("error"+err)
                res.status(500).send(err)
              }else{
                console.log(rows)
                res.status(202).send(rows)

              }
            })
            
          }else{
            res.status(500).send({"message":"otp does not match"})
          }
         
        }else{
          res.status(500).send({"message":"email does not match"})
        }
      }
    })
  }else{
    console.log("email_false")
    res.status(513).send({ "message": "invalid address" })
  }

}

async function user_register(req,res){
  var {first_name,last_name,email,phone_no, gender,date_of_birth,address,address2}=req.body
console.log(first_name+last_name+email+phone_no+ gender+date_of_birth+address+address2)
 
// UPDATE `users` SET `first_name`='ahish',`last_name`='patidar',`password`='21213778',`phone_no`='2121378943',`gender`='male',`date_of_birth`= '1999-07-30',`address`='indore',`address2`='indore banganga' WHERE email='mayurgeek@gmail.com'
 
// const salt = await bcrypt.genSalt(10);
//  password_salt = await bcrypt.hash(password, salt);
//  console.log(password_salt)
 //return false
 connection.query("UPDATE `users` SET `first_name`='"+first_name+"',`last_name`='"+last_name+"',`phone_no`='"+phone_no+"',`gender`='"+gender+"',`date_of_birth`= '"+date_of_birth+"',`address`='"+address+"',`address2`='"+address2+"' WHERE email='"+email+"'",async (err, rows, fields) => {
  if(err){
    console.log("error"+err)
    res.status(500).send(err)
  }else{
    console.log(rows)
    rows.affectedRows=='1'?res.status(202).send({"message":"updated user profile"}):res.status(500).send({"message":"error"})

  }
})

}
function user_details(req,res){
console.log(req.query)
connection.query("SELECT `user_id`,`first_name`,`last_name`,`email`,`phone_no`,`gender`,`date_of_birth`,`address`,`address2` FROM `users` WHERE `user_id` = "+req.query.user_id+"",async (err, rows, fields) => {
  if(err){
    console.log("error"+err)
    res.status(500).send(err)
  }else{
    if(rows!=''){
      console.log(rows)
      res.status(200).send(rows)
    }else{
      res.status(401).send("invalid user id")
    }
  }
})
}

async function user_login(req,res){
console.log(req.body)

var {user_email,user_password} = req.body

const salt = await bcrypt.genSalt(10);
password_salt = await bcrypt.hash(user_password, salt);
console.log(password_salt)

// const validPassword = await bcrypt.compare(password,'$2b$10$81UsHRVghsW.47o7dMqiQ.DsJgTfz333wDFKTYZYQOGkJhoSEr1m6');
// console.log(validPassword)

 connection.query('SELECT `user_id`, `email` , `password` FROM `users`  WHERE `email` ="'+user_email+'"',async (err,results)=>{
        if(err){
          console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                
                    console.log(results)
                   // return false
                    var psw =  JSON.parse(JSON.stringify(results[0].password))
                    console.log(typeof psw)
                    const validPassword = await bcrypt.compare(user_password,psw);
                    console.log(validPassword)
                    validPassword ?res.send({"user_id":results[0].user_id,"user_email":results[0].email}) : res.send(false)
                    
            }else{
                res.send("check_credintials") 
            }
            
        }
})

}

function change_user_password(req,res){
  var {email,password,new_password} = req.body
if(email != '' && password != '' && new_password != ''){
    console.log("fill all")
    connection.query('SELECT `email` , `password` FROM `users`  WHERE `email` ="'+email+'"',async (err,results)=>{
        if(err){
          console.log(err)
          res.send(err)
        }else{
            if(results != ''){
                    console.log(results)
                    var psw =  JSON.parse(JSON.stringify(results[0].password))
                    console.log(typeof psw)
                    const validPassword = await bcrypt.compare(password,psw);
                    console.log(validPassword)
                    if(validPassword) { 
                        const salt = await bcrypt.genSalt(10);
                        password_salt = await bcrypt.hash(new_password, salt);
                        console.log(password_salt)
                        connection.query('UPDATE `users` SET `password`= "'+password_salt+'" WHERE `email` = "'+email+'"',async (err,results)=>{
                            if(err){
                            console.log(err)
                            res.send(err)
                            }else{
                                console.log("password_updated")
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
    console.log("plaese fill all input")
}
}

function user_forgot_password(req,res){
  console.log(req.body.admin_email)
  connection.query('SELECT `email`, `password` FROM `users`  WHERE `email` ="'+req.body.email+'"',async (err,results)=>{
      if(err){
          console.log(err)
          res.send(err)
      }else{
          if(results != ''){
                  
                  var saltpsw = JSON.parse(JSON.stringify(results[0].password))
                  
                  // const salt = await bcrypt.genSalt(10);
                  // deco_salt = await bcrypt.hash(saltpsw, salt);
                  
                  console.log("send_password_on_your_mail")
                  res.send(saltpsw)
  
          }else{
              console.log("invalid_mail")
              res.send("invalid_mail")
          }
      }
  })
  
  }
module.exports = {signup,otp_verify, user_register,user_details, user_login, change_user_password, user_forgot_password }




