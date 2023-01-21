const connection = require('../db')
function add_fetured_product(req, res) {
  //console.log("req.body")
  var { product_id, fetured_type, start_date, end_date } = req.body

  connection.query('SELECT * FROM `fetured_product_table` WHERE `product_id`="' + product_id + '" AND `fetured_type`="' + fetured_type + '" AND is_deleted="0"', (err, rows, fields) => {
    if (err) {
      //console.log("/fetured_product" + err)
      res.status(200).send(err)
    } else {
      ////console.log("_____")
      if (rows != '') {
        //res.status(200).send(rows)
        // connection.query('UPDATE `fetured_product_table` SET `is_deleted`="1" WHERE `product_id`="'+product_id+'" AND `fetured_type` <>" " AND is_deleted="0"',(err,rows,fields)=>{
        //   if(err){
        //     //console.log("/fetured_product"+err)
        //     res.status(200).send(err)
        //   }else{
        //     ////console.log("_____")
        //     if( rows!= ''){
        //       //res.status(200).send(rows)
        //       connection.query('INSERT INTO `fetured_product_table`(`product_id`, `fetured_type`, `start_date`, `end_date`) VALUES ("'+product_id+'","'+fetured_type+'","'+start_date+'","'+end_date+'")',(err,rows,fields)=>{
        //         if(err){
        //           //console.log("/fetured_product"+err)
        //           res.status(200).send(err)
        //         }else{
        //           rows!= ''?res.status(200).send(rows):res.status(200).send({"message":"error"})
        //         }
        //       }) 
        //     }else{
        //       //console.log("_____")
        //     }
        //   }
        // }) 
        res.status(200).send({ "message": "Already_Exist" })
      } else {
        connection.query('INSERT INTO `fetured_product_table`(`product_id`, `fetured_type`, `start_date`, `end_date`) VALUES ("' + product_id + '","' + fetured_type + '","' + start_date + '","' + end_date + '")', (err, rows, fields) => {
          if (err) {
            //console.log("/fetured_product" + err)
            res.status(200).send(err)
          } else {
            rows != '' ? res.status(200).send(rows) : res.status(200).send({ "message": "error" })
          }
        })
        // res.status(200).send({"message":"not_match :-  product_id -- fetured_type -- is_deleted "})
      }

    }
  })

}

function update_fetured_product(req, res) {
  //console.log("req.body")
  var { id, start_date, end_date } = req.body

  connection.query('UPDATE `fetured_product_table` SET `start_date`="' + start_date + '",`end_date`="' + end_date + '" WHERE id = ' + id + '', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      ////console.log("_____")
      rows.affectedRows == '1' != '' ? res.status(200).send(rows) : res.status(200).send({ "message": "invalid_id" })
    }
  })
}

function featured_list(req, res) {
  //console.log("req.body")
  var { product_id, fetured_type} = req.body

  var ftr_query = 'SELECT * FROM fetured_product_table WHERE '

  if (fetured_type == '' && product_id == '') {
    ftr_query += '1'
  } else {

    if (fetured_type != '') {
      ftr_query += ' fetured_type = "' + fetured_type + '" AND'
    }
    if (product_id != '') {
      ftr_query += ' product_id = ' + product_id + ' AND'
    }

    var lastIndexOfSpace = ftr_query.lastIndexOf(' ');
    ftr_query = ftr_query.slice(0, lastIndexOfSpace);
  }
  //console.log(ftr_query)

  connection.query(ftr_query, (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
     res.status(200).send(rows)
    }
  })
}



// function featured_list(req,res){
//   //console.log("req.body")
//   connection.query(ftr_query,(err,rows,fields)=>{
//     if(err){
//       //console.log(err)
//       res.status(200).send(err)
//     }else{
//       ////console.log("_____")
//       rows!= ''?res.status(200).send(rows):res.status(200).send({"message":"invalid_id"})
//     }
//   }) 
// }
module.exports = { add_fetured_product, update_fetured_product, featured_list }
