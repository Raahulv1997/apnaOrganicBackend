const connection = require('../db')

function add_notification_template(req,res) {
// console.log(req.body)
     var {type,notification_type,notification_name,notification_text,status}=req.body;

    connection.query('INSERT INTO `notification_template`(`type`, `notification_type`, `notification_name`, `notification_text`, `status`) VALUES ("'+type+'","'+notification_type+'","'+notification_name+'","'+notification_text+'","'+status+'")',(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         res.status(200).send(results)
         console.log("_____"+results)       
        }
    })

}

function update_notification_template(req,res){
  console.log(req.body)
  var {id,type,notification_type,notification_name,notification_text,status}=req.body;

  connection.query('UPDATE `notification_template` SET `type`="'+type+'",`notification_type`="'+notification_type+'",`notification_name`="'+notification_name+'",`notification_text`="'+notification_text+'",`status`="'+status+'" WHERE `id`="'+id+'" ', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        rows.affectedRows == '1' ? res.status(200).send({ "message": "update_notification_template_successfully" }) : res.status(200).send({ "message": "invalid_id" })
      }
    })
}

function notification_template_list(req,res){

  console.log(req.body)
  var {type,notification_type,status}=req.body;
  if(type != '' || notification_type != '' || status != '' ){

      var stringsearch = 'SELECT * FROM `notification_template` WHERE '
      var catobj=req.body;
      console.log(catobj)
      var objvalue=Object.values(catobj)
      var objkey=Object.keys(catobj)
      for(m=0;m<objkey.length;m++){
      if(objvalue[m]!=''){
      if(m==0){
        stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' "
      }else{
        if(objvalue[0]==''){
          stringsearch+="`"+objkey[m]+"` LIKE '%"+objvalue[m]+"%' AND "
        }else{
          stringsearch+=" AND `"+objkey[m]+"` LIKE '%"+objvalue[m]+"%'"
        }
      }
    }
    }
    console.log(stringsearch)
    var lastCharOfHello=stringsearch.slice(-4);
    console.log("________"+lastCharOfHello+"_______")
    if(lastCharOfHello == "AND "){
      var id = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
      stringsearch=id;
      }else{
         
        console.log("no avia")
      }
    connection.query(''+stringsearch+' ',(err,rows,fields)=>{
      if(err){
        console.log("/notification_template_list_error"+err)
        res.status(200).send(err)
      }else{
        res.status(200).send(rows)
      }
    })
}else{
connection.query('SELECT * FROM `notification_template` WHERE 1 ',(err,rows,fields)=>{
  if(err){
    console.log("/notification_template_list_error"+err)
    res.status(200).send(err)
  }else{
    res.status(200).send(rows)
  }
})
}      
}

function notification_template_remove(req,res){

  console.log(req.body)
  var {is_deleted,id}=req.body
  if(is_deleted == '0'){
      connection.query('UPDATE `notification_template` SET `is_deleted`="'+is_deleted+'" WHERE `id`='+id+'', (err, rows, fields) => {
          if (err) {
            res.status(200).send(err)
          } else {
            rows.affectedRows == '1' ? res.status(200).send({ "message": "Deleted_successfully" }) : res.status(200).send({ "message": "invalid_id" })
          }
        })
  }else{
      res.status(200).send({ "message": "invalid is_deleted data" })
  } 
}

function notification_template_status(req,res){
console.log(req.body)
var {status,id}=req.body
connection.query('UPDATE `notification_template` SET `status`="'+status+'" WHERE `id`='+id+'', (err, rows, fields) => {
if (err) {
  res.status(200).send(err)
} else {
  rows.affectedRows == '1' ? res.status(200).send({ "message": "status_update_successfully" }) : res.status(200).send({ "message": "invalid_id" })
}
})
}
function notification_template_get(req,res){
console.log(req.query.id)
connection.query('SELECT * FROM notification_template WHERE id ='+req.query.id+' ',(err,rows,fields)=>{
if(err){
  console.log("/notification_template_error"+err)
  res.status(200).send(err)
}else{
  //console.log("_____")
  res.status(200).send(rows)
}
})
}


module.exports = {add_notification_template ,update_notification_template,notification_template_list,notification_template_remove,notification_template_status,notification_template_get}