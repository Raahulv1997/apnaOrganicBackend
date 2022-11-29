const connection = require('../db');




function invoice_search (req,res){
      console.log(req.body)
      var {search,from_date,to_date}=req.body
      if(search =='' && from_date == '' && to_date == ''){
      connection.query('SELECT * FROM `category` WHERE  1',(err,rows,fields)=>{
              if(err){
                console.log("/invoice_search_error"+err)
                res.send(err)
              }else{
               res.send(rows)
              }
            })   
      }else{
          if(search != '' && from_date =='' && to_date ==''){
              connection.query('SELECT * FROM `category` WHERE `vendor_id` = '+search+' ',(err,rows,fields)=>{
                  if(err){
                    console.log("/invoice_search_error"+err)
                    res.send(err)
                  }else{
                    res.send(rows)
                  }
                })
          }
      
          if(from_date!='' && to_date !='' && search == ''){
              connection.query('SELECT * FROM category WHERE (`created_on` BETWEEN "'+from_date+'" AND "'+to_date+' 12:00:00" )',(err,rows,fields)=>{
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
          connection.query('SELECT * FROM `category` WHERE  `vendor_id` = '+search+'  AND (`created_on` BETWEEN "'+from_date+'" AND "'+to_date+'" 12:00:00)',(err,rows,fields)=>{
              if(err){
                console.log("/invoice_search_error"+err)
                res.send(err)
              }else{
                res.send(rows)
              }
            })   
      }
  }

function invoice_data(req,res){

    var {invoice_no}=req.body;
    connection.query('SELECT * FROM orders_view WHERE `invoice_no` = '+invoice_no+'',(err,rows,fields)=>{
        if(err){
          res.send(err)
        }else{
          console.log(rows)
          res.send(rows)
        }
      })

}






module.exports={invoice_search,invoice_data}



// SELECT * FROM category WHERE (`created_on` BETWEEN '2022-11-24' AND '2022-11-26')
