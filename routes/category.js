const connection = require('../db');
const path = require('path');

function category(req, res) {
  // //console.log(typeof req.query.category)
  //res.send(req.query.category)
  if (req.query.category == 'all') {
    connection.query('SELECT * FROM category ORDER BY updated_on DESC ', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    connection.query('SELECT * FROM category WHERE parent_id =' + req.query.category + '  ORDER BY updated_on DESC', (err, rows, fields) => {
      if (err) {
        //console.log("/category_error" + err)
        res.status(200).send(err)
      } else {
        ////console.log("_____")
        res.status(200).send(rows)
      }
    })
  }
}


function add_category(req, res) {
  var newlevel = 1
  //console.log("add_category")
  //console.log("req.body")
var { parent_id, level, all_parent_id, new_category, image, category_type } = req.body
if(parent_id !=''&& level!=''&& all_parent_id!=''&& new_category!='' &&  category_type!=''){

  if (req.file == undefined || req.file == '') {
    image = "no image"
  } else {
    var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
    //console.log(image)
  }
//if(level>1){
   newlevel = parseInt(level) + 1
//}else{
   //newlevel = level
//}
  connection.query('INSERT INTO `category`(`parent_id`,`all_parent_id`,`level`,`category_name`,`category_type`,`image`,`is_active`) VALUES (' + parent_id + ',"' + all_parent_id + '",' + newlevel + ',"' + new_category + '","' + category_type + '","' + image + '",' + 1 + ')', (err, rows, fields) => {
    if (err) {
      console.log("/add_category_error" + err)
      res.status(200).send(err)
    } else {
      console.log("_____")
      res.status(201).send("Succesfully Add Category")
    }
  })
}else{res.send({"response":"please fill all inputs"})}
}

function update_category(req, res) {
  //console.log("req.body")
  var { id, parent_id, level, all_parent_id, new_category,category_type } = req.body;
  var  newdate= new Date();
  var category_newdate = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
if(id !=''&& parent_id!=''&& level!=''&& all_parent_id!='' &&  new_category!='' &&  category_type!=''){
  if (req.file == undefined || req.file == '') {
    // image = "no image"
    connection.query('UPDATE `category` SET `parent_id`="' + parent_id + '",`all_parent_id`="' + all_parent_id + '",`level`="' + level + '",`category_name`="' + new_category + '", `category_type`="'+category_type+'", `is_active`= "' + 1 + '",`updated_on`="'+category_newdate+'" WHERE `id`= "' + id + '"', (err, rows, fields) => {
      if (err) {
        //console.log("/category_error" + err)
        res.status(500).send(err)
      } else {
        res.status(200).send({message:"Succesfully Update Category"})
      }
    })
  } else {
    var image = "http://192.168.29.108:5000/catgory_images/" + req.file.filename;
    //console.log(image)

    connection.query('UPDATE `category` SET `parent_id`="' + parent_id + '",`all_parent_id`="' + all_parent_id + '",`level`="' + level + '",`category_name`="' + new_category + '", `category_type`="'+category_type+'",`image`="' +image+ '", `is_active`= "' + 1 + '",`updated_on`="'+category_newdate+'" WHERE `id`= "' + id + '"', (err, rows, fields) => {
      if (err) {
        //console.log("/category_error" + err)
        res.status(500).send(err)
      } else {
        res.status(200).send("Succesfully Update Category")
      }
    })
  }
}else{
  res.send({"response":"please fill all inputs"})
}


}

function delete_category(req, res) {
  //console.log("req.body")
  var { id, is_active, level } = req.body
  // if(id!=''&&is_active!=''&&level!=''){
    if (is_active == '0') {
      connection.query('UPDATE `category` SET `is_active`= "' + is_active + '" WHERE `id`= ' + id + ' AND `level`=' + level + '', (err, rows, fields) => {
        if (err) {
          //console.log(err)
          res.status(200).send(err)
        } else {
          connection.query('UPDATE `category` SET `is_active`= "' + is_active + '" WHERE `parent_id`= ' + id + '', (err, rows, fields) => {
            if (err) {
              //console.log(err)
              res.status(200).send(err)
            } else {
              res.status(202).send("deactivated category")
              //console.log("deactivated category")
            }
          })
        }
      })
    }else{
      res.status(202).send("send is_active = 0")

    }
  // }else{
  // res.send({"response":"please fill all inputs"})
  // }
}

function search_category(req, res) {

  console.log(req.body)
  var stringsearch = 'SELECT * FROM `category` WHERE '
  //var {category_name,category_type,level} = req.body
var all_blank = true
  var catobj = req.body;
  var objvalue = Object.values(catobj)
  var objkey = Object.keys(catobj)

for (m = 0; m < objkey.length; m++) {
if(objvalue[m]!=''){
  stringsearch += " `" + objkey[m] + "` LIKE '%" + objvalue[m] + "%' AND"
  all_blank = false
}else{
  //console.log("null"+m)
}
}
  console.log(stringsearch)
  var lastIndexOfSpace = stringsearch.lastIndexOf(' ');
  stringsearch = stringsearch.slice(0, lastIndexOfSpace);

if(all_blank){
  stringsearch = 'SELECT * FROM `category` '
}
  console.log(stringsearch)

  connection.query('' + stringsearch +' ORDER BY updated_on DESC', (err, rows, fields) => {
    if (err) {
      //console.log("/category_error" + err)
      res.status(502).send(err)
    } else {
      res.status(200).send(rows)
    }
  })
}


function get_all_category(req, res) {
  //console.log("ssss")
  //console.log("req.body")
  //select root.category_name as root_category_name,root.id as root_id, down1.category_name as down1_category_name,down1.id as down1_id, down2.category_name as down2_category_name, down2.id as down2_id, down3.category_name as down3_category_name, down3.id as down3_id from category as root left outer join category as down1 on down1.parent_id = root.id left outer join category as down2 on down2.parent_id = down1.id left outer join category as down3 on down3.parent_id = down2.id WHERE root.id=5 AND down1.id = 18
  // var nomore = true
  // var strg = "select root.category_name as root_category_name,root.id as root_id, down1.category_name as down1_category_name,down1.id as down1_id, down2.category_name as down2_category_name, down2.id as down2_id, down3.category_name as down3_category_name, down3.id as down3_id from category as root left outer join category as down1 on down1.parent_id = root.id left outer join category as down2 on down2.parent_id = down1.id left outer join category as down3 on down3.parent_id = down2.id WHERE"
  // req.body.forEach((item, index) => {
  //   //console.log(index)
  //   //console.log(item)
  //   if (index == '0') {
  //     strg += " root.id = " + item + ""
  //   } else {
  //     strg += " AND down" + index + ".id = " + item + ""
  //     //console.log(strg)
  //     if (nomore) {
  //       setTimeout(() => {
  //         connection.query(strg, (err, rows, fields) => {
  //           if (err) {
  //             //console.log("/category_error" + err)
  //             res.status(502).send(err)
  //           } else {
  //             rows!=''?res.status(200).send(rows):res.status(200).send("not found category")
  //           }
  //         })
  //       }, 200);
  //       nomore = false
  //     }
  //   }
  // });

  connection.query("select root.category_name as root_category_name,root.id as root_id, down1.category_name as down1_category_name,down1.id as down1_id, down2.category_name as down2_category_name, down2.id as down2_id, down3.category_name as down3_category_name, down3.id as down3_id from category as root left outer join category as down1 on down1.parent_id = root.id left outer join category as down2 on down2.parent_id = down1.id left outer join category as down3 on down3.parent_id = down2.id WHERE root.level=1 ORDER BY `root_id` ASC", (err, rows, fields) => {
              if (err) {
                //console.log("/category_error" + err)
                res.status(502).send(err)
              } else {
                rows!=''?res.status(200).send(rows):res.status(200).send("Not Found Category")
      }
  })

}


function category_details(req,res){
  //console.log(req.query)
  connection.query("SELECT * FROM `category` WHERE id ="+req.query.id+"", (err, rows, fields) => {
    if (err) {
      //console.log("/category_error" + err)
      res.status(502).send(err)
    } else {
      rows!=''?res.status(200).send(rows):res.status(200).send("Not Found Category")
    }
  })
  
}

module.exports = { category, add_category, update_category, delete_category, search_category, get_all_category,category_details}
