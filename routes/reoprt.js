const connection = require('../db')

function revenue(req,res){
  var revenuearr =[]
    console.log(req.body)
    
    connection.query("SELECT SUM(`total_amount`) gross_total_amount , SUM(`total_gst`) total_gst FROM orders WHERE (`created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59')",(err,rows,fields)=>{
        if(err){
          console.log(err)
          res.status(500).send(err)
        }else{
            rows!=''? revenuearr.push(rows[0]) :console.log('error')
        }
      })

      connection.query("SELECT SUM(coupons.percentage) as total_discount FROM coupons WHERE id IN(SELECT discount_coupon FROM orders WHERE (`created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59'))",(err,rows,fields)=>{
        if(err){
          console.log(err)
          res.status(500).send(err)
        }else{
            if(rows!=''){
              Object.assign(revenuearr[0],rows[0])
              res.status(500).send(revenuearr)
            }else{
              res.status(500).send("error")
              console.log('error')
            }          
        }
      })
}
module.exports={revenue}