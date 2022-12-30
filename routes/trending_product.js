const connection = require('../db')

function trending_product(req,res){
    var all_res_data=[];
    connection.query('select product_id, count(total_amount) from orders_view,products where orders_view.product_id=products.id group by product_id order by count(total_amount) DESC limit 20'
    ,(err,results)=>{
        if(err){
          console.log(err)
          res.status(502).send(err)
        }else{
         console.log("_____")
        //  results!=''?res.status(200).send(results):res.status(500).send("Invalid Input Data ")
        results.forEach((item, index) => {
            console.log(item.product_id)
            var count_id=item.product_id
            connection.query('SELECT * FROM products WHERE id ='+count_id+' ',(err,results)=>{
                if(err){
                  console.log("/product_error"+err)
                  res.status(500).send(err)
                }else{
                  console.log("_____")
                  all_res_data.push(results)
                }
              })
          });
          setTimeout(() => { res.status(200).send(all_res_data) }, 800)
        }
    })
}

module.exports={trending_product}