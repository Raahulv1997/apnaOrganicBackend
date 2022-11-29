const connection = require('../db')

function orders(req,res){
var order_count = 0;
var {user_id,status,order_product}=req.body
console.log("______chk-1_____")
console.log(user_id+""+status)
console.log(order_product)
connection.query('INSERT INTO `orders`(`user_id`, `status`) VALUES ('+user_id+',"'+status+'")',async (err,results)=>{
    if(err){
    console.log(err)
    res.send(err)
    }else{
        if(results!=''){
            console.log("______chk-2_____")
            var orderid=JSON.parse(JSON.stringify(results.insertId))
            console.log(results)
            //res.send(results)
            order_product.forEach((item,index) => {
                console.log("______chk-3_____"+orderid)
                console.log(item)
                connection.query('INSERT INTO `order_products`(`order_id`, `product_id`, `price`, `quantity`, `gst`, `cgst`, `sgst`, `offer_id`) VALUES ("'+orderid+'","'+item.product_id+'","'+item.price+'","'+item.quantity+'","'+item.gst+'","'+item.cgst+'","'+item.sgst+'","'+item.offer_id+'")',async (err,rslt)=>{
                    if(err){
                    console.log(err)
                    res.send(err)
                    }else{
                         if(rslt!=''){
                         console.log(rslt)
                        order_count++
                         }
                    }
                })

            });
            setTimeout(()=>{res.send("order_count_"+order_count+"")},800)
            
        }
        
    }
})
}

// function order_search(req,res){
// console.log(order_search)
// }

function order_deteils(req,res){
console.log("order_deteils")
// console.log(req.body.id)
console.log(req.query.id)

connection.query('SELECT * FROM `orders_view` WHERE `id` ='+req.query.id+'',(err,rslt)=>{
    if(err){
    console.log(err)
    res.send(err)
    }else{
        if(rslt1!=""){
         console.log(rslt)
        res.send(rslt)
        }else{
            res.send("wrong_id")
        }
    }
})

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

module.exports={orders,order_deteils,orders_list}