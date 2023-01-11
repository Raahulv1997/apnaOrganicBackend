const connection = require('../db')
function add_fetured_product(req,res){
    console.log(req.body)
    var {product_id,fetured_type,start_date,end_date}=req.body
    connection.query('INSERT INTO `fetured_product_table`(`product_id`, `fetured_type`, `start_date`, `end_date`) VALUES ("'+product_id+'","'+fetured_type+'","'+start_date+'","'+end_date+'")',(err,rows,fields)=>{
        if(err){
          console.log("/fetured_product"+err)
          res.status(200).send(err)
        }else{
          //console.log("_____")
          rows!= ''?res.status(200).send(rows):res.status(200).send({"message":"error"})
          
        }
      }) 
}

function update_fetured_product(req,res){
  console.log(req.body)
  var {id,start_date,end_date}=req.body

  connection.query('UPDATE `fetured_product_table` SET `start_date`="'+start_date+'",`end_date`="'+end_date+'" WHERE id = '+id+'',(err,rows,fields)=>{
    if(err){
      console.log(err)
      res.status(200).send(err)
    }else{
      //console.log("_____")
      rows.affectedRows=='1'!= ''?res.status(200).send(rows):res.status(200).send({"message":"invalid_id"})
    }
  }) 
}

function get_singal_fetured_product(req,res){
console.log(req.query.id)
connection.query('SELECT * FROM fetured_product_table WHERE id = '+req.query.id+'',(err,rows,fields)=>{
  if(err){
    console.log(err)
    res.status(200).send(err)
  }else{
    //console.log("_____")
    rows!= ''?res.status(200).send(rows):res.status(200).send({"message":"invalid_id"})
  }
}) 
}
module.exports={add_fetured_product,update_fetured_product,get_singal_fetured_product}
