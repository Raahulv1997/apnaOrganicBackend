const connection = require('../db')

function revenue(req,res){
    console.log(req.body)
    
    connection.query("SELECT SUM(`total_amount`) gross_total_amount , SUM(`total_gst`) total_gst FROM orders WHERE (`created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59')",(err,rows,fields)=>{
        if(err){
          console.log(err)
          res.status(500).send(err)
        }else{
            rows!=''? res.status(200).send(rows) :res.status(500).send('error')
        }
      }) 

}
module.exports={revenue}