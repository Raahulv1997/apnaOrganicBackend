const fs = require('fs');
const connection = require('../db')
const jsStringEscape = require('js-string-escape')

function products_search(req, res) {
  var condition_flag = true;
  //console.log("products_search");
  ////console.log(req.query.keydk)
  var catobj = req.body.product_search;
  var srch = catobj.search;
  var price_to = catobj.price_to;
  var price_from = catobj.price_from;
  var id = catobj.latest_first;
  var product_title_name = catobj.product_title_name_asc_desc;
  var sale_price = catobj.sale_price;
  var short_by_updated_on = catobj.short_by_updated_on;
  // //console.log(price_to)
  ////console.log(price_from)
  var pg = req.query
  ////console.log(pg)
  ////console.log(srch)
  var newstr = 'SELECT * from products_view WHERE '
  if (srch != '') {
    ////console.log("trueeeee")
    newstr += '(`product_title_name` LIKE "%' + srch + '%" OR `product_description` LIKE "%' + srch + '%" OR `product_type` LIKE "%' + srch + '%") AND '
  } else {
    // //console.log("falseeee")
  }
  if (price_to != '' && price_from != '' && srch != '') {
    ////console.log("trueeeee")
    newstr += '(`sale_price` BETWEEN "' + price_from + '" AND "' + price_to + '") AND'
    condition_flag = false;
  } else {
    if (price_to != '' && price_from != '') {
      newstr += '(`sale_price` BETWEEN "' + price_from + '" AND "' + price_to + '") '
      condition_flag = false;
    }

  }



  //+++++++++++++++++++shorting++++++++++++++++++++++ 
  var ase_desc = 'id DESC'
  if (id != '') { ase_desc = 'id ' + id }
  if (product_title_name != '') { ase_desc = 'product_title_name ' + product_title_name }
  if (sale_price != '') { ase_desc = 'sale_price ' + sale_price }
  if (short_by_updated_on != '') { ase_desc = 'updated_on ' + short_by_updated_on }
  //console.log("+++++++++++++++++++shorting++++++++++++++++++++++ ")
  //console.log(ase_desc)


  //console.log("newstr")
  var onjkayarrry = Object.keys(catobj)
  var onjvaluarrry = Object.values(catobj)

  for (var i = 7; i <= onjkayarrry.length - 1; i++) {

    if (onjvaluarrry[i] != '') {
      condition_flag = false;
      if (price_to != '' && price_from != '' && srch == '') {
        newstr += ' AND'
      }

      if (onjkayarrry.length - 1 == i) {
        //console.log(onjvaluarrry[i])
        var arr = JSON.stringify(onjvaluarrry[i]);
        var abc = "'" + arr + "'"
        ////console.log(abc)
        ////console.log(typeof abc)
        const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
        // //console.log("__"+id+"__")
        newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')'
      } else {
        // //console.log(onjvaluarrry[i])
        var arr = JSON.stringify(onjvaluarrry[i]);
        var abc = "'" + arr + "'"
        ////console.log(abc)
        ////console.log(typeof abc)
        const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
        // //console.log("__"+id+"__")
        newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')' + '___'
      }
    }

  }
  if (condition_flag) {

    // //console.log("_______________ressend-1_______________")

    var newqry = 'SELECT * FROM `products_view` WHERE `product_title_name` LIKE "%' + srch + '%" OR `product_description` LIKE "%' + srch + '%" OR `product_type` LIKE "%' + srch + '%" OR `colors` LIKE "%' + srch + '%" ' + ' ' + '  ORDER BY ' + ase_desc + '  LIMIT'
    //  //console.log("newqry")
    var numRows;
    var queryPagination;
    var numPerPage = pg.per_page
    var page = parseInt(pg.page, pg.per_page) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;

    connection.query('SELECT count(*) as numRows FROM products_view', (err, results) => {
      if (err) {
        // //console.log("error:" + err)
        //console.log(err)
        //return err
      } else {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        ////console.log('number of pages:', numPages);
        ////console.log(''+newqry+' '+limit+'')
        //console.log('++++++++++++++++++++++++++++++++++++++++++++query____1_+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        //console.log(''+newqry+' '+limit+'')
        connection.query('' + newqry + ' ' + limit + '', (err, results) => {
          if (err) {
            //  //console.log(err)
            res.status(502).send(err)
          } else {
            // //console.log("_____")
            var responsePayload = {
              results: results
            };
            if (page < numPages) {
              responsePayload.pagination = {
                current: page,
                perPage: numPerPage,
                previous: page > 0 ? page - 1 : undefined,
                next: page < numPages - 1 ? page + 1 : undefined
              }
            }
            else responsePayload.pagination = {
              err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
            }
            // //console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
            ////console.log(responsePayload);
            res.status(200).send(responsePayload)
          }
        })

      }
    })
  } else {
    var qry = newstr.replace(/___/g, ' AND')
    var lastCharOfHello = qry.slice(-4);//d

    if (lastCharOfHello == " AND") {
      var qry = qry.substring(0, qry.lastIndexOf(" "));
      // //console.log("and available___"+qry)

    } else {
      //console.log("no avia")
    }


    // //console.log(typeof qry)
    // //console.log(qry)

    // //console.log("_______________ressend-2_______________")

    var newqry = qry + ' ' + ' ORDER BY ' + ase_desc + ' LIMIT'
    // //console.log('newqry-------------------------------------------------')
    //console.log("newqry")
    var numRows;

    var numPerPage = pg.per_page
    var page = parseInt(pg.page, pg.per_page) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;

    connection.query('SELECT count(*) as numRows FROM products_view', (err, results) => {
      if (err) {
        //console.log("/category_error" + err)
        //console.log(err)
        //return err
      } else {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        //console.log('++++++++++++++++++++++++++++++++++++++++++++query__2_+++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        //console.log(''+newqry+' '+limit+'')
        connection.query('' + newqry + ' ' + limit + '', (err, results) => {
          if (err) {
            //console.log(err)
            res.status(502).send(err)
          } else {
            // //console.log("_____")
            var responsePayload = {
              results: results
            };
            if (page < numPages) {
              responsePayload.pagination = {
                current: page,
                perPage: numPerPage,
                previous: page > 0 ? page - 1 : undefined,
                next: page < numPages - 1 ? page + 1 : undefined
              }
            }
            else responsePayload.pagination = {
              err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
            }
            // //console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
            ////console.log(responsePayload);
            res.status(200).send(responsePayload)
          }
        })

      }
    })
  }
}


function productpost(req, res) {
  //console.log("---post---product--")
  var postdata = req.body
  var product_catagory = postdata[0].price
  // var base64_type=postdata[0].product_images
  //console.log(postdata)
  //console.log(product_catagory)

  var { product_title_name, product_slug, store_name, product_description, product_type, brand, category, parent_category, seo_tag, other_introduction, add_custom_input, wholesale_sales_tax, manufacturers_sales_tax, retails_sales_tax, gst, value_added_tax, id, variety, vendor_id, shop, show_product_rating, cgst, sgst } = postdata[0]

  // if(product_title_name!='' && product_slug!='' && store_name!='' && product_description!='' && product_type!='' && brand!='' && category!='' && parent_category!='' && seo_tag!='' && other_introduction!='' && add_custom_input!='' && wholesale_sales_tax!='' && manufacturers_sales_tax!='' && retails_sales_tax!='' && gst!='' && value_added_tax!='' && variety!='' && shop!='' && cgst!='' && sgst!=''){

  var product_title_name = jsStringEscape(product_title_name)
  var product_slug = jsStringEscape(product_slug)
  var product_description = jsStringEscape(product_description)
  var seo_tag = jsStringEscape(seo_tag)
  var other_introduction = jsStringEscape(other_introduction)
  var shop = jsStringEscape(shop)

  var add_custom_input1 = JSON.stringify(add_custom_input)
  //console.log(add_custom_input1)
  connection.query("INSERT INTO `products`(`product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `seo_tag`, `other_introduction`, `add_custom_input`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `gst`, `cgst`, `sgst`, `value_added_tax`, `variety`, vendor_id, `shop`,`show_product_rating`) VALUES ('" + product_title_name + "','" + product_slug + "','" + store_name + "','" + product_description + "','" + product_type + "','" + brand + "','" + category + "','" + parent_category + "','" + seo_tag + "','" + other_introduction + "','" + add_custom_input1 + "','" + wholesale_sales_tax + "','" + manufacturers_sales_tax + "','" + retails_sales_tax + "','" + gst + "', '" + cgst + "','" + sgst + "','" + value_added_tax + "'," + variety + ",'" + vendor_id + "', '" + shop + "'," + show_product_rating + ")", (err, rows, fields) => {
    if (err) {
      //console.log("/_products_post_error" + err)
      res.status(200).send(err)
    } else {
      if (rows != '') {
        console.log(rows)
        var p_id = JSON.parse(rows.insertId)
        var iterations = product_catagory.length;
        for (item of product_catagory) {
          //console.log(index)
          //console.log(item.sale_price)
          connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + p_id + ',"' + item.colors + '","' + item.size + '",' + item.mrp + ',' + item.product_price + ',' + item.sale_price + ',' + item.discount + ',"' + item.manufacturing_date + '","' + item.expire_date + '",' + item.special_offer + ',' + item.featured_product + ',"' + item.unit + '","' + item.unit_quantity + '",' + item.quantity + ',"' + item.product_status + '")', (err, rows, fields) => {
            if (err) {
              //console.log("/_products_post_error" + err)
              res.status(200).send(err)
            } else {
              if (rows != '') {
                console.log(rows.insertId)
                var p_v_id = JSON.parse(rows.insertId)
                if (!--iterations) {
                  res.status(201).send({ "product_id": p_id, "product_variant_id": p_v_id, "message": "succesfully added data on new_product table" })
                }
              } else {
                res.status(200).send(err)
              }

            }
          });
        }
      } else {
        res.status(200).send(err)
      }
  }
  })
  // }else{
  //   res.send({"response":"please fill all input"})
  // } 
}

function products_varient_update(req, res) {
  var { id, product_id, colors, size, mrp, product_price, sale_price, discount, manufacturing_date, expire_date, special_offer, featured_product, unit, quantity, product_status, unit_quantity } = req.body;
  var newdate1 = new Date();
  var products_varient_newdate = newdate1.getFullYear() + "-" + (newdate1.getMonth() + 1) + "-" + newdate1.getDate();
  //console.log("req.body")
  //console.log(colors)
  connection.query('UPDATE products_pricing SET colors="' + colors + '",size="' + size + '",mrp=' + mrp + ',product_price=' + product_price + ',sale_price=' + sale_price + ',discount=' + discount + ',manufacturing_date="' + manufacturing_date + '",expire_date="' + expire_date + '",special_offer=' + special_offer + ',featured_product=' + featured_product + ',unit="' + unit + '",unit_quantity="' + unit_quantity + '",product_status="' + product_status + '",quantity=' + quantity + ',`updated_on`="'+products_varient_newdate+'"  WHERE id =' + id + ' AND product_id=' + product_id + '', (err, rows, fields) => {
    if (err) {
      //console.log("/products_update" + err)
      res.status(200).send(err)
    } else {
      //console.log("successfully_updated_data_on_price_table")
      res.status(202).send(rows)
    }
  })
}

function products_update(req, res) {
  var { id, product_title_name, product_slug, store_name, product_description, product_type, category, parent_category, seo_tag, other_introduction, add_custom_input, brand, wholesale_sales_tax, manufacturers_sales_tax, retails_sales_tax, value_added_tax, variety, gst, cgst, sgst } = req.body;
  var newdate = new Date();
  var products_newdate = newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate();
  //console.log("_______products_update________")
  //console.log("req.body")
  var product_title_name = jsStringEscape(product_title_name)
  var product_slug = jsStringEscape(product_slug)
  var product_description = jsStringEscape(product_description)
  var seo_tag = jsStringEscape(seo_tag)
  var other_introduction = jsStringEscape(other_introduction)
  var shop = jsStringEscape(shop)
  var add_custom_input1 = JSON.stringify(add_custom_input)
  //console.log(add_custom_input1)
  connection.query("UPDATE `products` SET `product_title_name`='" + product_title_name + "',`product_slug`='" + product_slug + "',`brand`='" + brand + "',`store_name`='" + store_name + "',`product_description`='" + product_description + "',`product_type`='" + product_type + "',`category`=" + category + ",`parent_category`='" + parent_category + "',`seo_tag`='" + seo_tag + "',`variety`=" + variety + ",`other_introduction`='" + other_introduction + "',`add_custom_input`='" + add_custom_input1 + "',`wholesale_sales_tax`='" + wholesale_sales_tax + "',`manufacturers_sales_tax`='" + manufacturers_sales_tax + "',`retails_sales_tax`='" + retails_sales_tax + "',`gst`='" + gst + "' ,`cgst`='" + cgst + "' ,`sgst`='" + sgst + "',`value_added_tax`='" + value_added_tax + "',`updated_on`='"+products_newdate+"'  WHERE `id`=" + id + "", (err, rows, fields) => {
    if (err) {
      //console.log("/products_update" + err)
      res.status(200).send(err)
    } else {
      //console.log("successfully_updated_data_on_products_table")
      res.status(202).send(rows)
    }
  })
}

function products_delete_remove(req, res) {
  //console.log("-----------products_delete------------")

  var { varient_id, product_id, is_delete } = req.body
  //console.log("req.body")

  connection.query('UPDATE products_pricing SET is_delete= "' + is_delete + '" WHERE id=' + varient_id + ' AND product_id=' + product_id + '', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      //console.log("successfully_products_deleted")

      rows.affectedRows == '1' ? res.status(202).send(rows) : res.status(202).send({ "res": "not deleted" })

    }
  })

}

function products_varient_add(req, res) {
  var { product_id, colors, size, mrp, product_price, sale_price, discount, manufacturing_date, expire_date, special_offer, featured_product, unit, quantity, product_status, unit_quantity } = req.body
  //console.log("req.body")
  //console.log(colors)
  if (product_id != '') {
    connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + product_id + ',"' + colors + '","' + size + '","' + mrp + '","' + product_price + '","' + sale_price + '","' + discount + '","' + manufacturing_date + '","' + expire_date + '",' + special_offer + ',' + featured_product + ',"' + unit + '","' + unit_quantity + '","' + quantity + '","' + product_status + '")', (err, rows, fields) => {
      if (err) {
        //console.log("/products_update" + err)
        res.status(200).send(err)
      } else {
        //console.log("successfully_add_data_on_price_table")
        res.status(202).send(rows)
      }
    })
  } else {
    //console.log("-----------varient_id----------")
  }

}

function products_pricing(req, res) {
 var new_query;
  if (req.query.id == 'all') {
    connection.query('SELECT * FROM products_pricing WHERE 1  ', (err, rows, fields) => {
      if (err) {
        res.status(200).send(err)
      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    if(req.query.user_id== "" || req.query.user_id==null ||req.query.user_id==undefined){
      new_query='SELECT * FROM products_pricing WHERE id =' + req.query.id + ' AND product_id =' + req.query.product_id + ''

    }else{
      new_query='SELECT *,(SELECT id FROM wishlist WHERE wishlist.product_id = products_pricing.id AND user_id = ' + req.query.user_id + ' AND wishlist.is_active!="0") as wishlist, (SELECT id FROM cart WHERE cart.product_view_id = products_pricing.id AND user_id = ' + req.query.user_id + ' AND cart.is_active!="0") cart_ FROM products_pricing WHERE id=' + req.query.id + ' AND product_id=' + req.query.product_id +' ';
    }

 



    connection.query(new_query, (err, rows, fields) => {
      if (err) {
        //console.log("/product_error" + err)
        res.status(200).send(err)
      } else {
        ////console.log("_____")
        res.status(200).send(rows)
      }
    })
  }

}




function product(req, res) {
  var product_details = ''

  connection.query('SELECT * FROM `products` WHERE id =' + req.query.id + '', (err, rows, fields) => {
    if (err) {
      //console.log("/product_error" + err)
      //res.status(200).send(err)
    } else {
      if (rows != '') {
        product_details = rows[0]
        // //console.log(rows[0])
        connection.query('SELECT * FROM products_pricing WHERE product_id =' + req.query.id + ' AND is_delete = 1', (err, row, fields) => {
          if (err) {
            //console.log("/product_error" + err)
            res.status(200).send(err)
          } else {
            if (row != '') {
              {
                Object.assign(product_details, { product_verient: row });
                res.status(200).send(product_details)
              }
            } else { 
              res.status(200).send("error")
            }
          }
        })
      } else {
        res.status(200).send("error")
      }

    }
  })

}

function product_status_update(req, res) {
  // UPDATE `products_pricing` SET `product_status`='Approved' WHERE `id`='35' AND `product_id`='1'
  var { id, product_id, product_status } = req.body

  connection.query('UPDATE products_pricing SET `product_status`="' + product_status + '"  WHERE id=' + id + ' AND product_id=' + product_id + ' ', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      //console.log("successfully_products_updated")
      res.status(202).send({ "message": "successfully_products_updated" })
    }
  })
}


function product_images(req, res) {

  var base64_images = req.body
  let iterations = base64_images.length;

  for (item of base64_images) {
    var imgBase64 = item.img_64
    try {
      var base64Data = imgBase64.replace("data:image/png;base64,", "");
      var name_str = "" + item.product_image_name + "" + item.vendor_id + ""
      fs.writeFileSync("/home/we2code/Desktop/apna backend 19Nov/apna_backend/public/products_images/" + name_str + ".png", base64Data, 'base64');
    } catch (err) {
      //console.log(err)
    }
    //console.log(item.vendor_id)
    connection.query('INSERT INTO `product_images`(`product_id`, `product_verient_id`, `vendor_id`, `product_image_name`, `product_image_path`, `image_position`) VALUES ("' + item.product_id + '", "' + item.product_verient_id + '", "' + item.vendor_id + '", "' + item.product_image_name + '", "http://192.168.29.108:5000/products_images/' + name_str + '.png", "' + item.image_position + '")', (err, rows, fields) => {
      if (err) {
        //console.log(err)
        //res.status(200).send(err)
      } else {
        //console.log("rows")
      }
    })

    if (!--iterations) {
      res.status(200).send("added_succecfully")
    }
  }
}

function product_images_get_all_veriant(req, res) {
  //console.log(req.query)
  var { product_id } = req.query
  //SELECT id ,(SELECT GROUP_CONCAT(product_image_path) FROM product_images WHERE product_images.product_verient_id = products_pricing.id group by product_verient_id) as all_images FROM `products_pricing` WHERE products_pricing.product_id ='product_id'
  connection.query('SELECT id ,(SELECT GROUP_CONCAT(product_image_path) FROM product_images WHERE product_images.product_verient_id = products_pricing.id group by product_verient_id) as all_images FROM `products_pricing` WHERE products_pricing.product_id ="' + product_id + '"', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      //res.status(200).send(err)
    } else {
      //console.log("rows")
      res.status(200).send(rows)
    }
  })
}

function product_image_delete(req, res) {
  //console.log("req.body")
  var { product_image_id, product_image_name, vendor_id } = req.body
  var img_name_dlt = "" + product_image_name + "" + vendor_id + ".png"
  //console.log(img_name_dlt)

  connection.query('DELETE FROM `product_images` WHERE product_image_id ="' + product_image_id + '"', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      //console.log("rows")
      if (rows.affectedRows == '1') {
        fs.unlink("public/products_images/" + img_name_dlt, function (err) {
          if (err) return res.status(200).send({ "message": err, "check": false });;
          //console.log('file deleted successfully');
          res.status(200).send({ "message": "file deleted successfully", "check": true });
        });
      } else {
        res.status(200).send({ "message": "invalid 'product_image_id'" + product_image_id + " ", "check": false });
      }
      //res.status(200).send(rows)
    }
  })
}

function product_images_get_singal_veriant(req, res) {
  //console.log("req.body")

  //console.log(req.query)
  var { product_id, product_verient_id } = req.query
  connection.query('SELECT * FROM product_images WHERE product_id ="' + product_id + '" AND product_verient_id ="' + product_verient_id + '" ', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      //console.log("rows")
      res.status(200).send(rows)
    }
  })
}

function change_porduct_cover_image(req, res) {
  //console.log("req.body")
  var { product_image_id, product_id, product_verient_id } = req.body
  connection.query('UPDATE `product_images` SET `image_position` = "0" WHERE product_id ="' + product_id + '" AND product_verient_id ="' + product_verient_id + '" ', (err, rows, fields) => {
    if (err) {
      //console.log(err)
      res.status(200).send(err)
    } else {
      connection.query('UPDATE `product_images` SET `image_position` = "cover" WHERE product_image_id =' + product_image_id + '', (err, rows, fields) => {
        if (err) {
          //console.log(err)
          res.status(200).send(err)
        } else {
          rows.affectedRows == '1' ? res.status(200).send(rows) : res.status(200).send({ "message": "invalid_data" })
        }
      })
    }
  })
}

module.exports = { products_search, productpost, products_varient_update, products_update, products_delete_remove, products_varient_add, products_pricing, product, product_images, product_status_update, product_images_get_all_veriant, product_images_get_singal_veriant, product_image_delete, change_porduct_cover_image };
