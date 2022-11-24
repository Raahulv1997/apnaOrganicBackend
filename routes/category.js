const connection = require('../db')

function category(req,res){
  // console.log(typeof req.query.category)
  //res.send(req.query.category)
if(req.query.category == 'all'){
  connection.query('SELECT * FROM category WHERE 1  ',(err,rows,fields)=>{
    if(err){
      res.send(err)
    }else{
      res.send(rows)
    }
  })
}else{
  connection.query('SELECT * FROM category WHERE parent_id ='+req.query.category+' ',(err,rows,fields)=>{
    if(err){
      console.log("/category_error"+err)
      res.send(err)
    }else{
      //console.log(rows)
      res.send(rows)
    }
  }) 
}
}


function add_category(req,res){
  console.log("add_category")
  var {parent_id,level,all_parent_id,new_category} = req.body
  //res.send(req.body)
connection.query('INSERT INTO `category`(`parent_id`,`all_parent_id`,`level`,`category_name`,`is_active`) VALUES ('+parent_id+',"'+all_parent_id+'",'+ parseInt(level+1) +',"'+new_category+'",'+0+')',(err,rows,fields)=>{
  if(err){
    console.log("/category_error"+err)
    res.send(err)
  }else{
    console.log(rows)
    res.send(rows)
  }
}) 
}//UPDATE `category` SET `category_name`="mamu" WHERE id=33 


function update_category(req,res){

  console.log(req.body)
  var {id,parent_id,level,all_parent_id,new_category} = req.body

  connection.query('INSERT INTO `category`(`parent_id`,`all_parent_id`,`level`,`category_name`,`is_active`) VALUES ("'+parent_id+'","'+all_parent_id+'",'+ parseInt(level+1) +',"'+new_category+'",'+0+')',(err,rows,fields)=>{
    if(err){
      console.log("/category_error"+err)
      res.send(err)
    }else{
      res.send(rows)
    }
  }) 
}

// UPDATE `category` SET `parent_id`='"'+parent_id+'"',`all_parent_id`='"'+all_parent_id+'"',`level`='"'+parent_id+'"',`category_name`='"'+new_category+'"',`image`='"'+null+'"',`is_active`= '"'+0+'"'
// WHERE `id`=


module.exports =  {category,add_category,update_category}
