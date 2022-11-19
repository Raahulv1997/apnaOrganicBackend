const connection = require('../db')

function category(req,res){
  console.log("+==================================++++============++=====+++=")
    connection.query('SELECT * FROM category',(err,rows,fields)=>{
        if(err){
          console.log("/category_error"+err)
          res.send(err)
        }else{
          console.log(rows) 
          res.send(rows)
        }
      }) 
}
module.exports =  {category}