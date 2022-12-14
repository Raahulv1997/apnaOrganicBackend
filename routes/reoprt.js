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
              res.status(200).send(revenuearr)
            }else{
              res.status(500).send("error")
              console.log('error')
            }          
        }
      })
}

function orders_report(req,res){
  console.log(req.body)
  connection.query("SELECT COUNT(`id`) as order_count,SUM(`total_amount`) net_sales,AVG(`total_amount`) avg_order_value,(SELECT COUNT(product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders WHERE `created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59'",(err,rows,fields)=>{
    if(err){
      console.log(err)
      res.status(500).send(err)
    }else{
        if(rows!=''){
          // Object.assign(revenuearr[0],rows[0])
          res.status(200).send(rows)
        }else{
          res.status(500).send("error")
          console.log('error')
        }          
    }
  })  
}

module.exports={revenue,orders_report}