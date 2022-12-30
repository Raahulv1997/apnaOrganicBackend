const connection = require('../db')
const secretKey="sk_test_51LL4P3Eu1FBdOEuwSWSMEgcb36RKi4rE1Ix4hHHGL5V7wnm68PciVXNgmjvif9H6rqBEJOEcYP59NlKUApN1xd8U003I8dLiBY";
const stripe = require('stripe')(secretKey);


// var stripe = require('stripe')('sk_test_51MD0K3SDWoTO57i2TZXcmiHXX720CQwZKgM9VT9S0V1urGTRwUQTtt7dw95R1qHBXxOlJP6nYHSnkffAEOEzQSgx00w7Q0Xykf');
// var Publishable_Key = 'pk_test_51MD0K3SDWoTO57i29HWoPwjLang8JVgF9NRsavOJEYg3Kf5KdcbRODGlLnzbtXTVHFuovA04Uj5MCkMxveWL5PDu00C3VJma7P'
// var Secret_Key = 'sk_test_51MD0K3SDWoTO57i2TZXcmiHXX720CQwZKgM9VT9S0V1urGTRwUQTtt7dw95R1qHBXxOlJP6nYHSnkffAEOEzQSgx00w7Q0Xykf'

//function transaction(req,res){
   // console.log(req.body)
// var {transaction_id,order_id,invoice_no,transaction_date,amount,method,status}=req.body
    // connection.query("INSERT INTO `transaction`(`transaction_id`, `order_id`, `invoice_no`, `transaction_date`, `amount`, `method`, `status`) VALUES ('"+transaction_id+"','"+order_id+"','"+invoice_no+"','"+transaction_date+"','"+amount+"','"+method+"','"+status+"')",(err,results)=>{
    //     if(err){
    //       console.log(err)
    //       res.status(502).send(err)
    //     }else{
    //      console.log("_____")
    //      results!=''?res.status(200).send(results):res.status(500).send("invalid input data ")
         
    //     }
    // })
//}

async function payment(req,res){

  //totalAmount=req.session.totalSelectedCartCost1;
 var totalAmount=req.body.totalAmount;
 console.log(totalAmount)

   const token = await createToken(req.body);
   console.log(token);
   if (token.error) {
      //res.send('failed')
   }
   if (!token.id) {
      // res.send('failed');
   }

   const charge = await createCharge(token.id, totalAmount);
   console.log(charge);
   if (charge && charge.status == 'succeeded') { 

      //  req.session.updateShopCart = [];
      //  allCartData = [];
      //  console.log(req.session.updateShopCart)
      console.log("success____________________________________________________________________________________success")
      console.log(charge)
   // res.send('success');
    
     var {id, amount, payment_method_details, status , source, source, source, source, receipt_url, currency, payment_method_details, payment_method_details}= charge

     console.log("___________________________++++++++++++++____________________________")
    console.log("'"+id+"','"+req.body.order_id+"', '"+req.body.invoice_no+"', '"+amount+"', '"+payment_method_details.type+"', '"+status+"' , '"+source.name+"', '"+source.last4+"', '"+source.exp_month+"', '"+source.exp_year+"', '"+receipt_url+"', '"+currency+"', '"+payment_method_details.card.brand+"', '"+payment_method_details.card.country+"'")

    
    connection.query("INSERT INTO `transaction`(`payment_id`, `order_id`, `invoice_no`, `amount`, `method`, `status`, `name`, `c_number`, `exp_month`, `exp_year`, `receipt_url`, `currency`, `brand`, `country`) VALUES ('"+id+"','"+req.body.order_id+"', '"+req.body.invoice_no+"', '"+amount+"', '"+payment_method_details.type+"', '"+status+"' , '"+source.name+"', '"+source.last4+"', '"+source.exp_month+"', '"+source.exp_year+"', '"+receipt_url+"', '"+currency+"', '"+payment_method_details.card.brand+"', '"+payment_method_details.card.country+"')", (err, rows, fields) => {
      if (err) {
        console.log("/transaction_details_error" + err)
        res.status(500).send(err)
      } else {
        //console.log("_____")
        rows ==''?res.status(500).send(err):res.status(200).send(rows)
        
      }
    })

   } 
   else
    {
       console.log("this is faild trans");
       res.status(500).send('failed');
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
    console.log(req.body)
    var {order_id,method,status}=req.body
    if(order_id != '' || method != '' || status != '' ){

        var stringsearch = 'SELECT * FROM `transaction` WHERE '
        var catobj=req.body;
        console.log(catobj)
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
      console.log(stringsearch)
      var lastCharOfHello=stringsearch.slice(-4);
      console.log("________"+lastCharOfHello+"_______")
      if(lastCharOfHello == "AND "){
        var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
        stringsearch=id;
        }else{
           
          console.log("no avia")
        }
      connection.query(''+stringsearch+' ORDER BY id DESC',(err,rows,fields)=>{
        if(err){
          console.log("/transaction_list_error"+err)
          res.status(500).send(err)
        }else{
          res.status(200).send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `transaction` WHERE 1 ORDER BY id DESC',(err,rows,fields)=>{
    if(err){
      console.log("/transaction_list_error"+err)
      res.status(500).send(err)
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
            res.status(500).send(err)
          } else {
            res.status(200).send(rows)
          }
        })
    } else {
        connection.query('SELECT * FROM transaction WHERE id =' + req.query.id + ' ', (err, rows, fields) => {
          if (err) {
            console.log("/transaction_details_error" + err)
            res.status(500).send(err)
          } else {
            //console.log("_____")
            res.status(200).send(rows)
          }
        })
    }
}


module.exports={payment,transaction_list,transaction_details}