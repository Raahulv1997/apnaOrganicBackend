const connection = require('../db')

function product(req,res){
    connection.query('SELECT * FROM products',(err,rows,fields)=>{
        if(err){
          console.log("/_products_error"+err)
          res.send(err)
        }else{
          console.log(rows)
          res.send(rows)   
        }
      })  
}
module.exports =  {product};