const connection = require('../db')
function add_blog(req, res) {
  console.log("______add_blog____")
  console.log(req.body)
  var { admin_id, title, description, category, product_tag, publish_date } = req.body;

  if (req.file == undefined || req.file == '') {
    image = "no image"
  } else {
    var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
    console.log(image)
  }

  connection.query('INSERT INTO `blog`(`admin_id`, `image`, `title`, `description`, `category`, `product_tag`,`publish_date`) VALUES ("' + admin_id + '","' + image + '","' + title + '","' + description + '","' + category + '","' + product_tag + '","' + publish_date + '")', (err, rows, fields) => {
    if (err) {
      res.status(200).send(err)
    } else {
      console.log("add blog Succecsfully")
      res.status(201).send("add blog Succecsfully")
    }
  })
}

function blogs(req, res) {
  var query_flg = false
  var { id, recent, category, product_tag, for_ } = req.body
if(for_=='user'){
  var str_blog = 'SELECT * FROM `blog` WHERE is_delete=1 AND status="published"'
}
if(for_=='admin'){
  var str_blog = 'SELECT * FROM `blog` WHERE is_delete=1'
}

  
  console.log(req.body)
  if (id == '' && recent == '' && category == '' && product_tag == '') {
    query_flg = true
  } else {
    query_flg = true
    if (id != '') {
      str_blog += ' AND id = ' + id + ''
    } else {

      if(category != ''){
        var category_ar = JSON.stringify(category);
        var category_arr = "'" + category_ar + "'"
        var category_arr = category_arr.substring(category_arr.lastIndexOf("'[") + 2, category_arr.indexOf("]'"));
        console.log("__" + category_arr + "__")
        str_blog += ' AND category IN (' + category_arr + ')'
      }else{
        console.log("category_null")
      }
      //category != '' ? str_blog += ' AND category = "' + category + '"' : console.log("category_null")
      product_tag != '' ? str_blog += ' AND product_tag LIKE "%' + product_tag + '%"' : console.log("product_tag_null")
      recent != '' ? str_blog += ' AND created_on >= ( CURDATE() - INTERVAL ' + recent + ' DAY ) ORDER BY id DESC' : console.log("recent_null")
    }
  }
  if (query_flg) {
    console.log(str_blog)
    connection.query(str_blog, (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        console.log("_____")
        res.status(200).send(rows)
      }
    })
  }
}

function update_blog(req, res) {
  console.log(req.body)
  var { id, admin_id, title, description, category, product_tag, publish_date } = req.body;
  if (req.file == undefined || req.file == '') {
    // image = "no image"
    connection.query('UPDATE `blog` SET `title`="' + title + '",`description`="' + description + '",`category`="' + category + '",`product_tag`="' + product_tag + '",`publish_date`="' + publish_date + '" WHERE admin_id="'+admin_id+'" AND id="'+id+'"', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        rows.affectedRows == '1' ? res.status(200).send({ "message": "update_blog_successfully" }) : res.status(200).send({ "message": "invalid_id" })
      }
    })
  } else {
    var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
    console.log(image)
    console.log("pass+++++++")
    connection.query('UPDATE `blog` SET `image`="' + image + '",`title`="' + title + '",`description`="' + description + '",`category`="' + category + '",`product_tag`="' + product_tag + '",`publish_date`="' + publish_date + '" WHERE admin_id="'+admin_id+'" AND id="'+id+'"', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        rows.affectedRows == '1' ? res.status(200).send({ "message": "update_blog_successfully" }) : res.status(200).send({ "message": "invalid_id" })
      }
    })
  }

 
}

function update_blog_status(req, res) {
  console.log("update_blog_status")
  console.log("pass+++++++")
  connection.query('UPDATE `blog` SET `status`="' + req.body.status + '" WHERE id=' + req.body.id + '', (err, rows, fields) => {
    if (err) {
      res.status(200).send(err)
    } else {
      rows.affectedRows == '1' ? res.status(200).send({ "message": "update_status_successfully" }) : res.status(200).send({ "message": "invalid_id" })
    }
  })
}

function delete_blog(req, res) {
  console.log(req.body)
  console.log("pass+++++++")
  if (req.body.is_delete == '0') {
    connection.query('UPDATE `blog` SET `is_delete`="' + req.body.is_delete + '" WHERE id=' + req.body.id + '', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        rows.affectedRows == '1' ? res.status(200).send({ "message": "delete_blog_successfully" }) : res.status(200).send({ "message": "invalid_id" })
      }
    })
  } else {
    res.send("invalid_data")
  }

}

module.exports = { add_blog, blogs, update_blog, update_blog_status, delete_blog}




