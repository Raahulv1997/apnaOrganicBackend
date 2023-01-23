const connection = require('../db')
const nodemailer = require("nodemailer")

const secretKey="sk_test_51LL4P3Eu1FBdOEuwSWSMEgcb36RKi4rE1Ix4hHHGL5V7wnm68PciVXNgmjvif9H6rqBEJOEcYP59NlKUApN1xd8U003I8dLiBY";
const stripe = require('stripe')(secretKey);


// var stripe = require('stripe')('sk_test_51MD0K3SDWoTO57i2TZXcmiHXX720CQwZKgM9VT9S0V1urGTRwUQTtt7dw95R1qHBXxOlJP6nYHSnkffAEOEzQSgx00w7Q0Xykf');
// var Publishable_Key = 'pk_test_51MD0K3SDWoTO57i29HWoPwjLang8JVgF9NRsavOJEYg3Kf5KdcbRODGlLnzbtXTVHFuovA04Uj5MCkMxveWL5PDu00C3VJma7P'
// var Secret_Key = 'sk_test_51MD0K3SDWoTO57i2TZXcmiHXX720CQwZKgM9VT9S0V1urGTRwUQTtt7dw95R1qHBXxOlJP6nYHSnkffAEOEzQSgx00w7Q0Xykf'

//function transaction(req,res){
   // //console.log("req.body")
// var {transaction_id,order_id,invoice_no,transaction_date,amount,method,status}=req.body
    // connection.query("INSERT INTO `transaction`(`transaction_id`, `order_id`, `invoice_no`, `transaction_date`, `amount`, `method`, `status`) VALUES ('"+transaction_id+"','"+order_id+"','"+invoice_no+"','"+transaction_date+"','"+amount+"','"+method+"','"+status+"')",(err,results)=>{
    //     if(err){
    //       //console.log(err)
    //       res.status(502).send(err)
    //     }else{
    //      //console.log("_____")
    //      results!=''?res.status(200).send(results):res.status(200).send("invalid input data ")
         
    //     }
    // })
//}

async function payment(req,res){
  var data_replace = '';
  //totalAmount=req.session.totalSelectedCartCost1;
 var totalAmount=req.body.totalAmount;
 //console.log(totalAmount)

   const token = await createToken(req.body);
   //console.log(token);
   if (token.error) {
      //res.send('failed')
   }
   if (!token.id) {
      // res.send('failed');
   }

   const charge = await createCharge(token.id, totalAmount);
   //console.log(charge);
   if (charge && charge.status == 'succeeded') { 

      //  req.session.updateShopCart = [];
      //  allCartData = [];
      //  //console.log(req.session.updateShopCart)
      //console.log("success____________________________________________________________________________________success")
      //console.log(charge)
   // res.send('success');
    
     var {id, amount, payment_method_details, status , source, source, source, source, receipt_url, currency, payment_method_details, payment_method_details}= charge

     //console.log("___________________________++++++++++++++____________________________")
    //console.log("'"+id+"','"+req.body.order_id+"', '"+req.body.invoice_no+"', '"+amount+"', '"+payment_method_details.type+"', '"+status+"' , '"+source.name+"', '"+source.last4+"', '"+source.exp_month+"', '"+source.exp_year+"', '"+receipt_url+"', '"+currency+"', '"+payment_method_details.card.brand+"', '"+payment_method_details.card.country+"'")

    
    connection.query("INSERT INTO `transaction`(`payment_id`, `order_id`, `invoice_no`, `amount`, `method`, `status`, `name`, `c_number`, `exp_month`, `exp_year`, `receipt_url`, `currency`, `brand`, `country`) VALUES ('"+id+"','"+req.body.order_id+"', '"+req.body.invoice_no+"', '"+amount+"', '"+payment_method_details.type+"', '"+status+"' , '"+source.name+"', '"+source.last4+"', '"+source.exp_month+"', '"+source.exp_year+"', '"+receipt_url+"', '"+currency+"', '"+payment_method_details.card.brand+"', '"+payment_method_details.card.country+"')", (err, rows, fields) => {
      if (err) {
        //console.log("/transaction_details_error" + err)
        res.status(200).send(err)
      } else {
        //console.log("_____")
        // rows ==''?res.status(200).send(err):res.status(200).send(rows)
        if (rows.affectedRows=='1') {
          connection.query('SELECT DISTINCT(SELECT users.email FROM users WHERE orders_view.user_id = users.user_id) as email ,(SELECT users.phone_no FROM users WHERE orders_view.user_id = users.user_id) AS phoneno,user_id FROM `orders_view` WHERE `order_id`="'+ req.body.order_id +'" ', (err, rslt) => {
            if (err) {
              console.log({ "error": err })
            } else {
              if(rslt!=''){
                console.log(rslt)
                var user_id=rslt[0].user_id;
                var email_address=rslt[0].email;
                var mobile_no=rslt[0].phone_no;
                connection.query('SELECT * FROM `notification_template` WHERE `notification_type` = "succeeded"', (err, rows) => {
                  if (err) {
                    console.log({ "notification": err })
                  } else {
                    console.log("_______notification-send__________")
                    if(rows!=''){
                      connection.query('INSERT INTO `notification`(`actor_id`, `actor_type`, `message`, `status`) VALUES ("'+user_id+'","user","'+rows[0].notification_text+'","unread")', (err, rows) => {
                        if (err) {
                          console.log({ "notification": err })
                        } else {
                          console.log("_______notification-send-__________")
                        }
                      })
                    }else{
                      res.send({"message":"notification template not available"})
                    }
                  }
                })

                connection.query('SELECT * FROM `email_template` WHERE `type` = "user" AND `email_type` = "transaction"', (err, rows) => {
                  if (err) {
                    console.log({ "error": err })
                  } else {
                    if(rows!=''){
                      var html_data = rows[0].email_text;
                      var newdate = new Date();
                      var current_date = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
                      // console.log(current_date)
                      data_replace = html_data.replaceAll('{email_address}', email_address)
                      data_replace = data_replace.replaceAll('{contact_no}', mobile_no)
                      data_replace = data_replace.replaceAll('{total_amount}', amount)
                      data_replace = data_replace.replace('{method}', payment_method_details.type)
                      data_replace = data_replace.replace('{payment_id}', id)
                      data_replace = data_replace.replace('{status}', status)
                      data_replace = data_replace.replace('{payment_date}', current_date)
                      // data_replace = data_replace.replaceAll('{address}', address)
                      // data_replace = data_replace.replace('{order_list}', order_srting_mail)
                      // data_replace = data_replace.replace('{payment_mode}', payment_mode)
                      
                      
                      console.log(data_replace)

                    const mail_configs = {
                      from: 'ashish.we2code@gmail.com',
                      to: email_address,
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
                          return console.log({ "email_error": err });
                        } else {
                          return res.status(200).send({ "email_message": "transaction mail sent to user succesfully", "status_message": "transaction  succesfully" });
                        }
                      })
                  }
                  else{
                    console.log("email not send")
                    res.status(200).send({ "email_message": "status mail not sent to user", "status_message": "transaction  succesfully" });
                  }
                }
                })

              }


            }
          })

        }
        
      }
    })
   } 
   else
    {
       //console.log("this is faild trans");
       res.status(200).send('failed');
   }
}

const createToken = async (cardData) => {
   let token = {};
   try {
       token = await stripe.tokens.create({
           card: {
               number:cardData.c_number,
               exp_month:cardData.exp_month,
               exp_year:cardData.exp_year,
               cvc: cardData.cvc,
               name:cardData.name
           }
       });
   } catch (error) {
       switch (error.type) {
           case 'StripeCardError':
               token.error = error.message;
               break;
           default:
               token.error = error.message;
               break;
       }
   }
   return token;
}


const createCharge = async (tokenId, amount) => {

   let charge = {};
   try {
       charge = await stripe.charges.create({
           amount: amount,
           currency: 'usd',
           source: tokenId,
           description: 'My first payment'
       });
   } catch (error) {
       charge.error = error.message;
   }
   return charge;
}



function transaction_list(req,res){
    //console.log("req.body")
    var {order_id,method,status}=req.body
    if(order_id != '' || method != '' || status != '' ){

        var stringsearch = 'SELECT * FROM `transaction` WHERE '
        var catobj=req.body;
        //console.log(catobj)
        var objvalue=Object.values(catobj)
        var objkey=Object.keys(catobj)
        for(m=0;m<objkey.length;m++){
        if(objvalue[m]!=''){
        if(m==0){
          stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' "
        }else{
          if(objvalue[0]==''){
            stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' AND "
          }else{
            stringsearch+=" AND `"+objkey[m]+"` LIKE '%"+objvalue[m]+"%'"
          }
        }
      }
      }
      //console.log(stringsearch)
      var lastCharOfHello=stringsearch.slice(-4);
      //console.log("________"+lastCharOfHello+"_______")
      if(lastCharOfHello == "AND "){
        var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
        stringsearch=id;
        }else{
           
          //console.log("no avia")
        }
      connection.query(''+stringsearch+' ORDER BY id DESC',(err,rows,fields)=>{
        if(err){
          //console.log("/transaction_list_error"+err)
          res.status(200).send(err)
        }else{
          res.status(200).send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `transaction` WHERE 1 ORDER BY id DESC',(err,rows,fields)=>{
    if(err){
      //console.log("/transaction_list_error"+err)
      res.status(200).send(err)
    }else{
      res.status(200).send(rows)
    }
  })
}
}


function transaction_details(req,res){
    if (req.query.id == 'all') {
        connection.query('SELECT * FROM transaction WHERE 1  ', (err, rows, fields) => {
          if (err) {
            res.status(200).send(err)
          } else {
            res.status(200).send(rows)
          }
        })
    } else {
        connection.query('SELECT * FROM transaction WHERE id =' + req.query.id + ' ', (err, rows, fields) => {
          if (err) {
            //console.log("/transaction_details_error" + err)
            res.status(200).send(err)
          } else {
            ////console.log("_____")
            res.status(200).send(rows)
          }
        })
    }
}


module.exports={payment,transaction_list,transaction_details}