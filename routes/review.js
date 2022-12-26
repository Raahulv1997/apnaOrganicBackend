const connection = require('../db')



function review_rating(req,res){
  console.log("review")
  console.log(req.body)
  var {user_id,product_id,product_name,user_name,category_type,review_rating,comment}=req.body;                                                           
  connection.query('INSERT INTO  `review`( `user_id`, `user_name`, `product_id`,`product_name`,`category_type`, `review_rating`, `comment`) VALUES ("'+user_id+'","'+user_name+'","'+product_id+'","'+product_name+'","'+category_type+'","'+review_rating+'","'+comment+'")',(err,rows,fields)=>{
      if(err){
    res.status(500).send(err)
      }else{
          console.log("review_rating Data Insert Succecsfully")
        res.status(201).send("Review Rating Data Insert Succecsfully")
      }
    }) 
}


function review_approved(req,res){

    var {id,status,note}=req.body;
    connection.query('UPDATE `review` SET `status`="'+status+'",`note`="'+note+'"  WHERE `id`="'+id+'" ',(err,rows,fields)=>{
        if(err){
      res.status(500).send(err)
        }else{
            console.log("review_approved update Succecsfully")
          res.status(200).send("Review Approved Update Succecsfully")
        }
    }) 
}



function review_list(req,res){
    console.log(req.body)
    var {product_name,category_type,status}=req.body;
    if(product_name != '' || category_type != '' || status != '' ){

        var stringsearch = 'SELECT * FROM `review` WHERE '
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
      connection.query(''+stringsearch+' ORDER BY id DESC',(err,rows,fields)=>{
        if(err){
          console.log("/review_error"+err)
      res.status(500).send(err)
        }else{
          res.status(200).send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `review` WHERE 1 ORDER BY id DESC',(err,rows,fields)=>{
    if(err){
      console.log("/review_error"+err)
      res.status(500).send(err)
    }else{
      res.status(200).send(rows)
    }
  })
}      
}

function review_detaile(req,res){
console.log(req.query)
connection.query("SELECT * FROM `review` WHERE `id` ="+req.query.id+"",(err,rows,fields)=>{
  if(err){
    console.log(err)
    res.status(500).send(err)
  }else{
    if(rows!=''){
      res.status(200).send(rows)
    }else{
      res.status(500).send("error")
    }
  }
})
}


module.exports={review_rating,review_approved,review_list,review_detaile}
