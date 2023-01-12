const connection = require('../db')
const jsStringEscape = require('js-string-escape')

function add_email_template(req,res){
  console.log("add_email_template_____________")
    console.log(req.body)
     var {type,email_type,email_name,email_text,text_msg,test_email,status}=req.body;
     var email_text=jsStringEscape(email_text)

    connection.query('INSERT INTO `email_template`(`type`, `email_type`, `email_name`, `email_text`, `text_msg`, `test_email`, `status`) VALUES ("'+type+'","'+email_type+'","'+email_name+'","'+email_text+'","'+text_msg+'","'+test_email+'","'+status+'")',(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         res.status(200).send(results)
         console.log("_____"+results)       
        }
    })
}


function update_email_template(req,res){
    console.log(req.body)
    var {id,type,email_type,email_name,email_text,text_msg,test_email,status}=req.body;

    connection.query('UPDATE `email_template` SET `type`="'+type+'",`email_type`="'+email_type+'",`email_name`="'+email_name+'",`email_text`="'+email_text+'",`text_msg`="'+text_msg+'",`test_email`="'+test_email+'",`status`="'+status+'"  WHERE `id`="'+id+'" ', (err, rows, fields) => {
        if (err) {
          res.status(200).send(err)
        } else {
          rows.affectedRows == '1' ? res.status(200).send({ "message": "update_email_template_successfully" }) : res.status(200).send({ "message": "invalid_id" })
        }
      })
}


function email_template_list(req,res){

        console.log(req.body)
        var {type,email_type,status}=req.body;
        if(type != '' || email_type != '' || status != '' ){
    
            var stringsearch = 'SELECT * FROM `email_template` WHERE '
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
              console.log("/email_template_list_error"+err)
              res.status(200).send(err)
            }else{
              res.status(200).send(rows)
            }
          })
    }else{
    connection.query('SELECT * FROM `email_template` WHERE 1 ',(err,rows,fields)=>{
        if(err){
          console.log("/email_template_list_error"+err)
          res.status(200).send(err)
        }else{
          res.status(200).send(rows)
        }
      })
    }      
}

function email_template_remove(req,res){

        console.log(req.body)
        var {is_deleted,id}=req.body
        if(is_deleted == '0'){
            connection.query('UPDATE `email_template` SET `is_deleted`="'+is_deleted+'" WHERE `id`='+id+'', (err, rows, fields) => {
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

function email_template_status(req,res){
    console.log(req.body)
    var {status,id}=req.body
    connection.query('UPDATE `email_template` SET `status`="'+status+'" WHERE `id`='+id+'', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        rows.affectedRows == '1' ? res.status(200).send({ "message": "status_update_successfully" }) : res.status(200).send({ "message": "invalid_id" })
      }
    })
  }
  function email_template_get(req,res){
    console.log(req.query.id)
    connection.query('SELECT * FROM email_template WHERE id ='+req.query.id+' ',(err,rows,fields)=>{
      if(err){
        console.log("/email_template_error"+err)
        res.status(200).send(err)
      }else{
        //console.log("_____")
        res.status(200).send(rows)
      }
    })
  }
  
  module.exports={add_email_template,update_email_template,email_template_list,email_template_remove,email_template_status,email_template_get}

  

