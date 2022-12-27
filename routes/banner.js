const connection = require('../db')
function add_banner(req,res) {
    console.log("______banner____")
    console.log(req.body)
    var { image, title, description, banner_url, size, banner_location} = req.body;

    if (req.file == undefined || req.file == '') {
        image = "no image"
    } else {
        var image = "public/catgory_images/" + req.file.filename;
        console.log(image)
    }

    connection.query('INSERT INTO `banner`(`image`, `title`, `description`, `banner_url`, `size`, `banner_location`) VALUES ("'+image+'","'+title+'","'+description+'","'+banner_url+'","'+size+'","'+banner_location+'")', (err, rows, fields) => {
        if (err) {
            res.status(200).send(err)
        } else {
            console.log("add banner Succecsfully")
            res.status(201).send("add banner Succecsfully")
        }
    })
}

function update_banner(req, res) {
    console.log("______banner____")
    console.log(req.body)
    var { banner_id, image, title, description, banner_url, size, banner_location} = req.body;

    if (req.file == undefined || req.file == '') {
        image = "no image"
    } else {
        var image = "public/catgory_images/" + req.file.filename;
        console.log(image)
    }
    connection.query('UPDATE `banner` SET `image`="'+image+'",`title`="'+title+'",`description`="'+description+'",`banner_url`="'+banner_url+'",`size`="'+size+'",`banner_location`="'+banner_location+'" WHERE `banner_id`='+banner_id+'', (err, rows, fields) => {
        if (err) {
          res.status(500).send(err)
        } else {
          rows.affectedRows == '1' ? res.status(200).send({ "message": "update_status_successfully" }) : res.status(200).send({ "message": "invalid_id" })
        }
      })
  }
module.exports={add_banner,update_banner}