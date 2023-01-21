const connection = require('../db')
function add_banner(req,res) {
    //console.log("______banner____")
    //console.log("req.body")
    var { image, title, description, banner_url, size, banner_location} = req.body;

    if (req.file == undefined || req.file == '') {
        image = "no image"
    } else {
        var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
        //console.log(image)
    }

    connection.query('INSERT INTO `banner`(`image`, `title`, `description`, `banner_url`, `size`, `banner_location`) VALUES ("'+image+'","'+title+'","'+description+'","'+banner_url+'","'+size+'","'+banner_location+'")', (err, rows, fields) => {
        if (err) {
            res.status(200).send(err)
        } else {
            //console.log("add banner Succecsfully")
            res.status(201).send("add banner Succecsfully")
        }
    })
}   

function update_banner(req, res) {
  //console.log("______banner____")
  //console.log("req.body")
  var { banner_id, image, title, description, banner_url, size, banner_location} = req.body;

  if (req.file == undefined || req.file == '') {
      // image = "no image"
      connection.query('UPDATE `banner` SET `title`="'+title+'",`description`="'+description+'",`banner_url`="'+banner_url+'",`size`="'+size+'",`banner_location`="'+banner_location+'" WHERE `banner_id`='+banner_id+'', (err, rows, fields) => {
        if (err) {
          res.status(500).send(err)
        } else {
          rows.affectedRows == '1' ? res.status(200).send({ "message": "update_status_successfully" }) : res.status(200).send({ "message": "invalid_id" })
        }
      })
  } else {
      var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
      //console.log(image)
      connection.query('UPDATE `banner` SET `image`="'+image+'",`title`="'+title+'",`description`="'+description+'",`banner_url`="'+banner_url+'",`size`="'+size+'",`banner_location`="'+banner_location+'" WHERE `banner_id`='+banner_id+'', (err, rows, fields) => {
        if (err) {
          res.status(500).send(err)
        } else {
          rows.affectedRows == '1' ? res.status(200).send({ "message": "update_status_successfully" }) : res.status(200).send({ "message": "invalid_id" })
        }
      })
  }

}



  function banner_list(req,res){
    //console.log("banner_list")
    var {banner_id,title,banner_location}=req.body
    var banner_list_qry = '' 

    if(	banner_id=='' && title=='' && banner_location==''){
        banner_list_qry = 'SELECT * FROM `banner` WHERE is_deleted=1 ' 
    }else{
        banner_list_qry = 'SELECT * FROM `banner` WHERE is_deleted=1 '
        if(	banner_id!=''){
            banner_id!=''? banner_list_qry+=' AND banner_id = '+banner_id+'':console.log("false")
        }else{
            title!=''? banner_list_qry+=' AND title LIKE "%'+title+'%"':console.log("false")
            banner_location!=''? banner_list_qry+=' AND banner_location = "'+banner_location+'"':console.log("false")
        }    
    }
    //console.log(banner_list_qry)
    connection.query(banner_list_qry, (err, rows, fields) => {
        if (err) {
            res.status(200).send(err)
        } else {
            //console.log("_____")
            res.status(200).send(rows)
        }
    }) 
  }
  function banner_delete(req,res){
    //console.log("req.body")
    var {is_deleted,banner_id}=req.body
    if(is_deleted=='0'){
        connection.query('UPDATE `banner` SET `is_deleted`="'+is_deleted+'" WHERE `banner_id`='+banner_id+'', (err, rows, fields) => {
            if (err) {
              res.status(200).send(err)
            } else {
              rows.affectedRows == '1' ? res.status(200).send({ "message": "deleted_successfully" }) : res.status(200).send({ "message": "invalid_id" })
            }
          })
    }else{
        res.status(200).send({ "message": "invalid is_deleted data" })
    }
    
  }

  function cahange_banner_status(req,res){
    //console.log("req.body")
    var {status,banner_id}=req.body
        connection.query('UPDATE `banner` SET `status`="'+status+'" WHERE `banner_id`='+banner_id+'', (err, rows, fields) => {
            if (err) {
              res.status(200).send(err)
            } else {
              rows.affectedRows == '1' ? res.status(200).send({ "message": "change_status_successfully" }) : res.status(200).send({ "message": "invalid_id" })
            }
          })
  }
module.exports={add_banner,update_banner,banner_list,banner_delete,cahange_banner_status}