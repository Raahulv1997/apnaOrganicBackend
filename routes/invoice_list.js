const connection = require('../db')


function invoice_list(req,res){
    //console.log(req.query.id)

    connection.query('SELECT * FROM `orders` WHERE 1',async (err,rslt)=>{
        if(err){
        console.log(err)
        res.send(err)
        }else{
             if(rslt!=''){
                //console.log(rslt)
                res.send(rslt)
             }else{
                res.send("not search")
             }
        }
    })

    // connection.query('SELECT `id`, `user_id`, `total_quantity`, `ref_no`, `payment_mode`, `delivery_date`, `status`, `created_on`, `updated_on`, `invoice_no` FROM `orders` WHERE `user_id` = '+req.query.id+'',async (err,rslt)=>{
    //     if(err){
    //     console.log(err)
    //     res.send(err)
    //     }else{
    //          if(rslt!=''){
    //             console.log(rslt)
    //             res.send(rslt)
    //          }else{
    //             res.send("not search")
    //          }
    //     }
    // })

}

function invoice_search (req,res){
    //console.log(req.body)
    var {search,from_date,to_date}=req.body
    if(search =='' && from_date == '' && to_date == ''){
    connection.query('SELECT * FROM `orders` WHERE  1',(err,rows,fields)=>{
            if(err){
              console.log("/invoice_search_error"+err)
              res.send(err)
            }else{
             res.send(rows)
            }
          })   
    }else{
        if(search != '' && from_date =='' && to_date ==''){
            connection.query('SELECT * FROM `orders` WHERE `vendor_id` = '+search+' ',(err,rows,fields)=>{
                if(err){
                  console.log("/invoice_search_error"+err)
                  res.send(err)
                }else{
                  res.send(rows)
                }
              })
        }
    
        if(from_date!='' && to_date !='' && search == ''){
            connection.query('SELECT * FROM orders WHERE (`order_date` BETWEEN "'+from_date+'" AND "'+to_date+' 12:00:00" )',(err,rows,fields)=>{
                if(err){
                  console.log("/invoice_search_error"+err)
                  res.send(err)
                }else{
                 res.send(rows)
                }
              }) 
        }
    }
    if(from_date !='' && search != '' && to_date!='' ){
        connection.query('SELECT * FROM `orders` WHERE  `vendor_id` = '+search+'  AND (`order_date` BETWEEN "'+from_date+'" AND "'+to_date+' 12:00:00")',(err,rows,fields)=>{
            if(err){
              console.log("/invoice_search_error"+err)
              res.send(err)
            }else{
              res.send(rows)
            }
          })   
    }
}


function invoice_details(req,res){
  var o_id ;
  var obj ;
    console.log(req.query.invoice_no)
    connection.query('SELECT * FROM `orders` WHERE `invoice_no` ='+req.query.invoice_no+'',(err,rslt)=>{
        if(err){
        console.log(err)
        res.send(err)
        }else{
            if(rslt!=""){
              console.log(rslt)
              //res.send(rslt)
               obj = JSON.parse(JSON.stringify(rslt[0]))
                 o_id = JSON.parse(JSON.stringify(rslt[0].id))
              console.log(o_id)

              connection.query("SELECT * FROM `order_products` WHERE `order_id` = '"+o_id+"'",(err,rows,fields)=>{
                if(err){
                  console.log(err)
                  res.send(err)
                }else{
                  if(rows!=''){
                    obj["product_types"] = JSON.parse(JSON.stringify(rows))
                  console.log(obj)
                  res.send(obj)
                  }else{
                    res.send("error")
                  }
                  
                  //rows!=''?res.send(rows):res.send("error")
                  
                }
              }) 
            }else{
                res.send("wrong_id")
            }
        }
    })

    }

module.exports={invoice_list, invoice_search,invoice_details}