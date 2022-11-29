const connection = require('../db')

function orders(req,res){
console.log(req.body)
}


function orders_list(req,res){
    console.log(req.body)
var { status,created_on} = req.body
 console.log("order list")
 if(created_on == 'one'){
    console.log("0000000")
    var newdate =new Date();
    var current_date = newdate.getFullYear()+"-"+(newdate.getMonth()+1)+"-"+ newdate.getDate();
    console.log(current_date)
    connection.query('SELECT * FROM orders_view WHERE `created_on` LIKE "%'+current_date+'%"',(err,rows,fields)=>{
        if(err){
          res.send(err)
        }else{
          res.send(rows)
        }
      })
  }else{

    console.log("nnnnnnnnnnnnnnnn")
    if(status =='' && created_on == ''){
        connection.query('SELECT * FROM `orders_view` WHERE  1',(err,rows,fields)=>{
            if(err){
              console.log("/admin_login_details_error"+err)
              res.send(err)
            }else{
             res.send(rows)
            }
          })   
    }else{
        if(status != '' && created_on ==''){
            connection.query('SELECT * FROM `orders_view` WHERE `status` LIKE "%'+status+'%" ',(err,rows,fields)=>{
                if(err){
                  console.log("/admin_login_details_error"+err)
                  res.send(err)
                }else{
                  res.send(rows)
                }
              })
        }
    
        if(created_on!='' && status == ''){
            connection.query('SELECT * FROM orders_view WHERE `created_on` >= DATE_SUB(CURDATE(), INTERVAL '+created_on+' DAY)',(err,rows,fields)=>{
                if(err){
                  console.log("/admin_login_details_error"+err)
                  res.send(err)
                }else{
                 res.send(rows)
                }
              }) 
        }
    }
    if(status!='' && created_on != ''){
        connection.query('SELECT * FROM `orders_view` WHERE  `status` LIKE "%'+status+'%"  AND `created_on` >= DATE_SUB(CURDATE(), INTERVAL '+created_on+' DAY)',(err,rows,fields)=>{
            if(err){
              console.log("/admin_login_details_error"+err)
              res.send(err)
            }else{
              res.send(rows)
            }
          })   
    }
    
  }


}









module.exports={orders,orders_list}

