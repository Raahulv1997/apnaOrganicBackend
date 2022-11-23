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




function add_category(req,res){
  console.log("add_category")
  //res.send(req.body)
  console.log(req.body)
  var {parent_id,all_parent_id,lavel,main_category,is_active} = req.body
// INSERT INTO `category`(`parent_id`,`all_parent_id`,`lavel`,`main_category`) VALUES (31,"31,33",3,"Samsung")
connection.query('INSERT INTO `category`(`parent_id`,`all_parent_id`,`lavel`,`main_category`,`is_active`) VALUES ("'+ parent_id +'","'+ all_parent_id +'","'+ lavel +'","'+ main_category +'",'+ is_active +'") ',(err,rows,fields)=>{
  if(err){
    console.log("/category_error"+err)
    res.send(err)
  }else{
    console.log(rows)
    res.send(rows)
  }
}) 
}







module.exports =  {category,add_category}