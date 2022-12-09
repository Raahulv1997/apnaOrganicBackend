const connection = require('../db')


function transaction(req,res){
    console.log(req.body)
    var {transaction_id,order_id,invoice_no,transaction_date,amount,method,status}=req.body
    connection.query("INSERT INTO `transaction`(`transaction_id`, `order_id`, `invoice_no`, `transaction_date`, `amount`, `method`, `status`) VALUES ('"+transaction_id+"','"+order_id+"','"+invoice_no+"','"+transaction_date+"','"+amount+"','"+method+"','"+status+"')",(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log(results)
         results!=''?res.status(200).send(results):res.status(500).send("invalid input data ")
         
        }
    })
}

function transaction_list(req,res){
    console.log(req.body)
    var {order_id,method,status}=req.body
    if(order_id != '' || method != '' || status != '' ){

        var stringsearch = 'SELECT * FROM `transaction` WHERE '
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
      connection.query(''+stringsearch+'',(err,rows,fields)=>{
        if(err){
          console.log("/transaction_list_error"+err)
          res.send(err)
        }else{
          res.send(rows)
        }
      })
}else{
connection.query('SELECT * FROM `transaction` WHERE 1',(err,rows,fields)=>{
    if(err){
      console.log("/transaction_list_error"+err)
      res.send(err)
    }else{
      res.send(rows)
    }
  })
}
}


function transaction_details(req,res){

    if (req.query.id == 'all') {
        connection.query('SELECT * FROM transaction WHERE 1  ', (err, rows, fields) => {
          if (err) {
            res.send(err)
          } else {
            res.status(200).send(rows)
          }
        })
      } else {
        connection.query('SELECT * FROM transaction WHERE id =' + req.query.id + ' ', (err, rows, fields) => {
          if (err) {
            console.log("/transaction_details_error" + err)
            res.status(500).send(err)
          } else {
            //console.log(rows)
            res.status(200).send(rows)
          }
        })
      }
}


module.exports={transaction,transaction_list,transaction_details}