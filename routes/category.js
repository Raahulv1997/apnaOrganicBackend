const connection = require('../db');
const path  = require('path');

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

var {parent_id,level,all_parent_id,new_category,image,category_type} = req.body

if(req.file == undefined || req.file == '' ){
  image="no image"
}else{
  var image = "public/catgory_images/"+req.file.filename;
  console.log(image)
}

connection.query('INSERT INTO `category`(`parent_id`,`all_parent_id`,`level`,`category_name`,`category_type`,`image`,`is_active`) VALUES ('+parent_id+',"'+all_parent_id+'",'+parseInt(level+1)+',"'+new_category+'","'+category_type+'","'+image+'",'+0+')',(err,rows,fields)=>{
  if(err){
    console.log("/category_error"+err)
    res.send(err)
  }else{
    console.log(rows)
    res.send(rows)
  }
}) 
}


function update_category(req,res){
  console.log(req.body)
  var {id,parent_id,level,all_parent_id,new_category} = req.body

  connection.query('UPDATE `category` SET `parent_id`="'+parent_id+'",`all_parent_id`="'+all_parent_id+'",`level`="'+level+'",`category_name`="'+new_category+'",`is_active`= "'+0+'" WHERE `id`= "'+id+'"',(err,rows,fields)=>{
    if(err){
      console.log("/category_error"+err)
      res.send(err)
    }else{
      res.send(rows)
    }
  }) 
}
delete_category

function delete_category(req,res){
  console.log(req.body)
  var {id,is_active,level} = req.body
if(is_active =='0'){
  connection.query('UPDATE `category` SET `is_active`= "'+is_active+'" WHERE `id`= '+id+' AND `level`='+level+'',(err,rows,fields)=>{
    if(err){
      console.log(err)
      res.send(err)
    }else{
      connection.query('UPDATE `category` SET `is_active`= "'+is_active+'" WHERE `parent_id`= '+id+'',(err,rows,fields)=>{
        if(err){
          console.log(err)
          res.send(err)
        }else{
          res.send(rows)
          console.log("deactivated category")
        }
      })
    }
}) 
}
  
}

function search_category(req,res){

  console.log(req.body)
  var stringsearch = 'SELECT * FROM `category` WHERE '
  //var {category_name,category_type,level} = req.body

  var catobj=req.body;
var objvalue=Object.values(catobj)
var objkey=Object.keys(catobj)

  for(m=0;m<objkey.length;m++){
if(objvalue[m]!=''){
  if(m==0){
    stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' "
  }else{
    stringsearch+=" AND `"+objkey[m]+"` LIKE '%"+objvalue[m]+"%'"
  }
}
}
console.log(stringsearch)
connection.query(''+stringsearch+'',(err,rows,fields)=>{
  if(err){
    console.log("/category_error"+err)
    res.send(err)
  }else{
    res.send(rows)
  }
})
}

// UPDATE `category` SET `parent_id`='"'+parent_id+'"',`all_parent_id`='"'+all_parent_id+'"',`level`='"'+level+'"',`category_name`='"'+new_category+'"',`is_active`= '"'+0+'"'
// WHERE `id`= id


module.exports =  {category,add_category,update_category,delete_category,search_category}
