const connection = require('../db')

function revenue(req,res){
  var revenuearr =[]
    console.log(req.body)
    
    connection.query("SELECT SUM(`total_amount`) gross_total_amount , SUM(`total_gst`) total_gst, SUM(`shipping_charges`) total_shipping_charges FROM orders WHERE (`created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59') AND (NOT `status` = 'return')",(err,rows,fields)=>{
        if(err){
          console.log(err)
          res.status(500).send(err)
        }else{
            rows!=''? revenuearr.push(rows[0]) :console.log('error')
        }
      })

      connection.query("SELECT SUM(total_amount) return_total FROM `orders` WHERE `status` = 'return' AND (`created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59')",(err,rslt,fields)=>{
        if(err){
          console.log(err)
          res.status(500).send(err)
        }else{
          Object.assign(revenuearr[0],{"return_total":rslt[0].return_total})
           
        }
      })





      connection.query("SELECT SUM(coupons.percentage) as total_discount FROM coupons WHERE id IN(SELECT discount_coupon FROM orders WHERE (`created_on` BETWEEN '"+req.body.from_date+" 24:00:00' AND '"+req.body.to_date+" 23:59:59') AND (NOT `status` = 'return'))",(err,rows,fields)=>{
        if(err){
          console.log(err)
          res.status(500).send(err)
        }else{
            if(rows!=''){
              Object.assign(revenuearr[0],rows[0])
              var coupon_discount = revenuearr[0].gross_total_amount/100*revenuearr[0].total_discount
              var net_sale = revenuearr[0].gross_total_amount-coupon_discount
              var total_amount_with_shipping_tax = revenuearr[0].gross_total_amount+revenuearr[0].total_shipping_charges
              Object.assign(revenuearr[0],{net_sale,total_amount_with_shipping_tax})
              res.status(200).send(revenuearr)
            }else{
              res.status(500).send("error")
              console.log('error')
            }          
        }
      })
}
module.exports={revenue}