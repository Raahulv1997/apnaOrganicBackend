const connection = require('../db')

function add_complaint(req,res){
    console.log(req.body)
    var {order_id,subject,description}=req.body
    //return false
   connection.query("INSERT INTO `comaplains_support`(`order_id`, `subject`, `description`) VALUES ('"+order_id+"','"+subject+"','"+description+"')",async (err, rows, fields) => {
    if(err){
      console.log("error"+err)
      res.status(500).send(err)
    }else{
      console.log(rows)
      res.status(201).send({"Message":"Complaint Added"})
  
    }
})
}

function complaint_details(req,res){
    console.log(req.query)
    var quy ;
    if(req.query.id == 'all'){
       quy = "SELECT * FROM `comaplains_support` WHERE 1"
    }else{
       quy = "SELECT * FROM `comaplains_support` WHERE `id` ="+req.query.id+""
    }
    connection.query(quy,async (err, rows, fields) => {
        if(err){
          console.log("error"+err)
          res.status(500).send(err)
        }else{
          console.log(rows)
          rows!=''?res.status(200).send(rows):res.status(500).send("Not Found Complaints")
        }
    })
}

function complaint_update(req,res){
    console.log(req.body)
    var {id, assigned_to, resolve_date, status_, resolve_description}=req.body
    connection.query("UPDATE `comaplains_support` SET `assigned_to`='"+assigned_to+"',`resolve_date`='"+resolve_date+"',`status_`='"+status_+"',`resolve_description`='"+resolve_description+"' WHERE `id`= "+id+"",async (err, rows, fields) => {
        if(err){
          console.log("error"+err)
          res.status(500).send(err)
        }else{
            rows!=''?resstatus(200).send("Succesfully Update Complaint"):res.status(500).send("Faild Complaint Update")          
        }
    })
}


function complaint_search(req,res){
  console.log(req.body)
    var {id,status_,ticket_date}=req.body;
    if(id != '' || status_ != '' || ticket_date != '' ){

        var stringsearch = 'SELECT * FROM `comaplains_support` WHERE '
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
        var newid = stringsearch.substring(stringsearch.lastIndexOf(' AND') +1, stringsearch.indexOf("  "));   
        stringsearch=newid;
        }else{
           
          console.log("no avia")
        }
      connection.query(''+stringsearch+' ORDER BY id DESC',(err,rows,fields)=>{
        if(err){
          console.log("/complaint_error"+err)
          res.status(500).send(err)
        }else{
          res.status(200).send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `comaplains_support` WHERE 1 ORDER BY id DESC ',(err,rows,fields)=>{
    if(err){
      console.log("/complaint_error"+err)
      res.status(500).send(err)
    }else{
      res.status(200).send(rows)
    }
  })
}   
}

module.exports={add_complaint,complaint_details,complaint_update,complaint_search}