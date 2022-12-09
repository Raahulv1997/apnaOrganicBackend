const connection = require('../db')
var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;


function vendors(req,res){
    // console.log(typeof req.query.category)
    //res.send(req.query.category)
  if(req.query.id == 'all'){
    connection.query('SELECT * FROM vendor WHERE 1  ',(err,rows,fields)=>{
      if(err){
        res.send(err)
      }else{
        res.send(rows)
      }
    })
  }else{
    connection.query('SELECT * FROM vendor WHERE id ='+req.query.id+' ',(err,rows,fields)=>{
      if(err){
        console.log("/vendors_error"+err)
        res.send(err)
      }else{
        //console.log(rows)
        res.send(rows)
      }
    }) 
  }
  }




// function vendor_signup(req, res) {
//     var email_data = req.body.email;
//     var rst = regex.test(email_data);
//     if (rst) {
//       connection.query("SELECT * FROM `vendor` WHERE email = '" + email_data + "'",async (err, rows, fields) => {
//         if (err) {
//           console.log("/signup_error" + err)
//           res.send(err)
//         } else {
//           if (rows != '') {
//             console.log(rows);
//             console.log("redirect login page");
//             var umail = JSON.parse(JSON.stringify(rows));
//             var useremail = umail[0].email;
//             console.log(useremail);
//             res.send({"message":"User Already Exist. Please Login"})
//           } else {
//             console.log("send________otp")
  
//             function generateOTP() {
//               var digits = '0123456789';
//               let OTP = '';
//               for (let o = 0; o < 6; o++ ) {
//                   OTP += digits[Math.floor(Math.random() * 10)];
//               }
//                 connection.query('INSERT INTO `users_otp`(`email`, `otp`) VALUES ("'+email_data+'","'+OTP+'")', (err, rows, fields) => {
//                   if (err) {
//                     console.log("/_otp_error" + err);
//                     res.send(err)
//                   } else {
//                     console.log(rows);
//                     res.send(OTP);
//                   }
//                 })
//               return OTP
//           }
//            console.log(generateOTP()) 
//           }
//         }
//       })
//     } else {
//       res.status(513).send({ "message": "invalid address" })
//     }
//   }


// function vendor_otp_verify(req,res){
// console.log(req.body)
//   var email_otp = req.body.email
//   var otp_ver = req.body.otp
//   var cheked_email = regex.test(email_otp);
//   console.log("--------------------------otp_verify--------------------------")
//   console.log(email_otp)
//   console.log(otp_ver)
//   if(cheked_email){
//     console.log("email_true")
//     connection.query("SELECT * FROM `users_otp` WHERE email = '" + email_otp + "'",async (err, rows, fields) => {
//       if(err){
//         console.log(err)
//       }else{
//         console.log(rows)
//         if(rows!=''){

//           var userauth = JSON.parse(JSON.stringify(rows));
//           var user_otp = userauth[0].otp;
//           console.log( otp_ver +"=="+ user_otp)
//           if(otp_ver === user_otp){
//             console.log("otp verification successfully")
//             //res.send({"message":"otp verification successfully"})

//             connection.query("INSERT INTO `vendor`( `email`) VALUES ('"+email_otp+"')",async (err, rows, fields) => {
//               if(err){
//                 console.log("error"+err)
//               }else{
//                 console.log(rows)
//                 res.send(rows)
//               }
//             })  
//           }else{
//             res.send({"message":"otp does not match"})
//           }
         
//         }else{
//           res.send({"message":"email does not match"})
//         }
//       }
//     })
//   }else{
//     console.log("email_false")
//     res.status(513).send({ "message": "invalid address" })
//   }

// }


// function vendor_register(req,res){
//  var {owner_name,shop_name,mobile,email,shop_address,gstn,geolocation,store_type,shop_logo,status,multiple_document_upload,document_name,availability}=req.body;
//  console.log(req.body)
//  var documents1 = JSON.stringify(multiple_document_upload)
//  var document_name1 = JSON.stringify(document_name)

//    connection.query("INSERT INTO `vendor`(`email`,`owner_name`, `shop_name`, `mobile`, `shop_address`, `gstn`, `geolocation`, `store_type`, `shop_logo`, `status`, `multiple_document_upload`, `document_name`, `availability`) VALUES ('"+email+"','"+owner_name+"','"+shop_name+"','"+mobile+"','"+shop_address+"','"+gstn+"','"+geolocation+"','"+store_type+"','"+shop_logo+"','"+status+"','"+documents1+"','"+document_name1+"','"+availability+"')",async (err, rows, fields) => {
//     if(err){
//       console.log("error"+err)
//       res.send(err)
//     }else{
//       console.log(rows)
//       res.send({"message":"Create vendor Profile"})
  
//     }
//   })
// }
function vendor_register(req,res){
  var {owner_name,shop_name,mobile,email,shop_address,gstn,geolocation,store_type,status,document_name,availability}=req.body;
  console.log(req.body)
  console.log(req.files)

  if(req.files == undefined || req.files == '' ){
   image="no image"
 }else{
   var image = "public/catgory_images/"+req.files[0].filename;
   console.log(image)
 }
  var documents1 = JSON.stringify("public/catgory_images/"+req.files[1].filename)
  var document_name1 = JSON.stringify(document_name)
  console.log(documents1)

 
    connection.query("INSERT INTO `vendor`(`email`,`owner_name`, `shop_name`, `mobile`, `shop_address`, `gstn`, `geolocation`, `store_type`, `shop_logo`, `status`, `multiple_document_upload`, `document_name`, `availability`) VALUES ('"+email+"','"+owner_name+"','"+shop_name+"','"+mobile+"','"+shop_address+"','"+gstn+"','"+geolocation+"','"+store_type+"','"+image+"','"+status+"','"+documents1+"','"+document_name1+"','"+availability+"')",async (err, rows, fields) => {
     if(err){
       console.log("error"+err)
       res.send(err)
     }else{
       console.log(rows)
       res.send({"message":"Create vendor Profile"})
   
     }
   })
 }
 
 

function vendor_list(req,res){
        console.log(req.body)
        var {owner_name,store_type,status}=req.body;
        if(owner_name != '' || store_type != '' || status != '' ){

            var stringsearch = 'SELECT * FROM `vendor` WHERE '
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
          var lastCharOfHello=stringsearch.slice(-4);//d
          console.log("________"+lastCharOfHello+"_______")
          if(lastCharOfHello == "AND "){
            console.log("and")
            var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
            stringsearch=id;
            }else{
               
              console.log("no avia")
            }
          connection.query(''+stringsearch+'',(err,rows,fields)=>{
            if(err){
              console.log("/vendor_error"+err)
              res.send(err)
            }else{
              res.send(rows)
            }
          })
   }else{
    connection.query('SELECT * FROM `vendor` WHERE 1',(err,rows,fields)=>{
        if(err){
          console.log("/vendor_error"+err)
          res.send(err)
        }else{
          res.send(rows)
        }
      })
   }      
}

function vendor_update(req,res){
    var {owner_name,shop_name,mobile,id,shop_address,gstn,geolocation,store_type,status,document_name,availability}=req.body;
    console.log(req.body)

    if(req.files == undefined || req.files == '' ){
      image="no image"
    }else{
      var image = "public/catgory_images/"+req.files[0].filename;
      console.log(image)
    }
     var documents1 = JSON.stringify("public/catgory_images/"+req.files[1].filename)
     var document_name1 = JSON.stringify(document_name)
     console.log(documents1)
   
      connection.query("UPDATE `vendor` SET `owner_name`='"+owner_name+"',`shop_name`='"+shop_name+"',`mobile`='"+mobile+"',`shop_address`='"+shop_address+"',`gstn`='"+gstn+"',`geolocation`='"+geolocation+"',`store_type`='"+store_type+"',`shop_logo`='"+image+"',`status`='"+status+"',`multiple_document_upload`='"+documents1+"',`document_name`= '"+document_name1+"',`availability`='"+availability+"' WHERE id='"+id+"'",async (err, rows, fields) => {
       if(err){
         console.log("error"+err)
         res.send(err)
       }else{
         if(rows!=''){
          console.log(rows)
          res.send({"message":"updated vendor profile"})
        }else{
          res.send({"message":"error plaese give valid data "})
        }
         
     
       }
     })
}

// module.exports={vendor_signup,vendor_otp_verify,vendor_register,vendor_list,vendor_update,vendors}
module.exports={vendor_register,vendor_list,vendor_update,vendors}