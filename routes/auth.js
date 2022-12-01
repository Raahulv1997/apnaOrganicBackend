const { Auth, LoginCredentials } = require("two-step-auth");
const connection = require('../db')
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;

function signup(req, res) {
  var edata = req.body.email;
  var rst = regex.test(edata);
  if (rst) {
    connection.query("SELECT * FROM `users` WHERE email = '" + edata + "'",async (err, rows, fields) => {
      if (err) {
        console.log("/signup_error" + err)
        res.send(err)
      } else {
        if (rows != '') {
          console.log(rows);
          console.log("redirect login page");
          var umail = JSON.parse(JSON.stringify(rows));
          var useremail = umail[0].email;
          console.log(useremail);
          res.send({"message":"User Already Exist. Please Login"})
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
                  res.send(err)
                } else {
                  console.log(rows);
                  res.send(OTP);
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

function otp_verify(req,res){
console.log(req.body)
  var email_otp = req.body.email
  var otp_ver = req.body.otp
  var cheked_email = regex.test(email_otp);
  console.log("--------------------------otp_verify--------------------------")
  console.log(email_otp)
  console.log(otp_ver)
  if(cheked_email){
    console.log("email_true")
    connection.query("SELECT * FROM `users_otp` WHERE email = '" + email_otp + "'",async (err, rows, fields) => {
      if(err){
        console.log(err)
      }else{
        console.log(rows)
        if(rows!=''){

          var userauth = JSON.parse(JSON.stringify(rows));
          var user_otp = userauth[0].otp;
          console.log( otp_ver +"=="+ user_otp)
          if(otp_ver === user_otp){
            console.log("otp verification successfully")
            //res.send({"message":"otp verification successfully"})

            connection.query("INSERT INTO `users`( `email`) VALUES ('"+email_otp+"')",async (err, rows, fields) => {
              if(err){
                console.log("error"+err)
              }else{
                console.log(rows)
                res.send(rows)

              }
            })
            
          }else{
            res.send({"message":"otp does not match"})
          }
         
        }else{
          res.send({"message":"email does not match"})
        }
      }
    })
  }else{
    console.log("email_false")
    res.status(513).send({ "message": "invalid address" })
  }

}

function user_register(req,res){
  var {name,lastname,email, password,phone_no, gender,date_of_birth,address,address2}=req.body
console.log(name+lastname+email+ password+phone_no+ gender+date_of_birth+address+address2)
 // UPDATE `users` SET `first_name`='ahish',`last_name`='patidar',`password`='21213778',`phone_no`='2121378943',`gender`='male',`date_of_birth`= '1999-07-30',`address`='indore',`address2`='indore banganga' WHERE email='mayurgeek@gmail.com'

 connection.query("UPDATE `users` SET `first_name`='"+name+"',`last_name`='"+lastname+"',`password`='"+password+"',`phone_no`='"+phone_no+"',`gender`='"+gender+"',`date_of_birth`= '"+date_of_birth+"',`address`='"+address+"',`address2`='"+address2+"' WHERE email='"+email+"'",async (err, rows, fields) => {
  if(err){
    console.log("error"+err)
    res.send(err)
  }else{
    console.log(rows)
    res.send({"message":"updated user profile"})

  }
})

}
function user_details(req,res){
console.log(req.query)
connection.query("SELECT `user_id`, `first_name`, `last_name`, `email`, `phone_no`, `gender`, `date_of_birth`, `address`, `address2` FROM `users` WHERE `user_id` = "+req.query.user_id+"",async (err, rows, fields) => {
  if(err){
    console.log("error"+err)
    res.send(err)
  }else{
    if(rows!=''){
      console.log(rows)
      res.send(rows)
    }else{
      res.send("invalid user id")
    }
    

  }
})
}

module.exports = {signup,otp_verify,user_register,user_details }




