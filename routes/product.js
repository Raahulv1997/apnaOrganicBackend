const connection = require('../db')

function products_search(req, res) {
  var condition_flag = true;
  console.log("products_search");
  //console.log(req.query.keydk)
  var catobj = req.body.product_search;
  var srch = catobj.search;
  var price_to=catobj.price_to;
  var price_from=catobj.price_from;
  console.log(price_to)
  console.log(price_from)
  var pg = req.query
  console.log(pg)
  console.log(srch)
  var newstr = 'SELECT * from products_view WHERE '
  if (srch != '') {
    //console.log("trueeeee")
    newstr += '(`product_title_name` LIKE "%' + srch + '%" OR `product_description` LIKE "%' + srch + '%" OR `product_type` LIKE "%' + srch + '%") AND '
  } else {
    // console.log("falseeee")
  }
  if (price_to != '' && price_from !='' && srch != '' ) {
    //console.log("trueeeee")
    newstr += '(`product_price` BETWEEN "'+price_from+'" AND "'+price_to+'") AND'
    condition_flag = false;
  } else {
    if(price_to != '' && price_from !=''){
      newstr += '(`product_price` BETWEEN "'+price_from+'" AND "'+price_to+'") '
      condition_flag = false;  
    }

  }
  console.log(newstr)
  var onjkayarrry = Object.keys(catobj)
  var onjvaluarrry = Object.values(catobj)

  for (var i = 3; i <= onjkayarrry.length - 1; i++) {

    if (onjvaluarrry[i] != '') {
      condition_flag = false;
      if(price_to != '' && price_from !='' && srch ==''){
        newstr += ' AND'
      }

      if (onjkayarrry.length - 1 == i) {
        console.log(onjvaluarrry[i])
        var arr = JSON.stringify(onjvaluarrry[i]);
        var abc="'"+arr+"'"
        console.log(abc)
        console.log(typeof abc)
        const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
        console.log("__"+id+"__")
        newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')'
      } else {
        console.log(onjvaluarrry[i])
        var arr = JSON.stringify(onjvaluarrry[i]);
        var abc="'"+arr+"'"
        console.log(abc)
        console.log(typeof abc)
        const id = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
        console.log("__"+id+"__")
        newstr += ' ' + onjkayarrry[i] + ' IN ' + '(' + id + ')' + '___'
      }
    } 

  }
  if (condition_flag) {

    // console.log("_______________ressend-1_______________")

    var newqry = 'SELECT * FROM `products_view` WHERE `product_title_name` LIKE "%' + srch + '%" OR `product_description` LIKE "%' + srch + '%" OR `product_type` LIKE "%' + srch + '%" OR `colors` LIKE "%' + srch + '%" ' + ' ' + '  ORDER BY id DESC  LIMIT'
    console.log(newqry)
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
        console.log("error:" + err)
        console.log(err)
        //return err
      } else {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        //console.log('number of pages:', numPages);
        //console.log(''+newqry+' '+limit+'')
        connection.query('' + newqry + ' ' + limit + '', (err, results) => {
          if (err) {
            console.log(err)
            res.status(502).send(err)
          } else {
            // console.log(results)
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
            // console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
            //console.log(responsePayload);
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
      // console.log("and available___"+qry)

    } else {
      console.log("no avia")
    }


    // console.log(typeof qry)
    // console.log(qry)

    // console.log("_______________ressend-2_______________")

    var newqry = qry + ' ' + ' ORDER BY id DESC LIMIT'
    // console.log('newqry-------------------------------------------------')
    console.log(newqry)
    var numRows;

    var numPerPage = pg.per_page
    var page = parseInt(pg.page, pg.per_page) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;

    connection.query('SELECT count(*) as numRows FROM products_view', (err, results) => {
      if (err) {
        console.log("/category_error" + err)
        console.log(err)
        //return err
      } else {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        // console.log('number of pages:', numPages);
        //console.log(''+newqry+' '+limit+'')
        connection.query('' + newqry + ' ' + limit + '', (err, results) => {
          if (err) {
            console.log(err)
            res.status(502).send(err)
          } else {
            // console.log(results)
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
            // console.log("responsePayload++++++++++++++++++++++++++++++++++++++++");
            //console.log(responsePayload);
            res.status(200).send(responsePayload)
          }
        })

      }
    })
  }
}


function productpost(req, res) {
  console.log("---post---product--")
  var postdata = req.body
  var product_catagory = postdata[0].price
  console.log(postdata)
  console.log(product_catagory)

  var { product_title_name, product_slug, store_name, product_description, product_type, brand, category, parent_category, seo_tag, other_introduction, add_custom_input, wholesale_sales_tax, manufacturers_sales_tax, retails_sales_tax, gst, value_added_tax, id, variety, vendor_id, shop ,cgst,sgst} = postdata[0]

  var add_custom_input1 = JSON.stringify(add_custom_input)
  console.log(add_custom_input1)
  connection.query("INSERT INTO `products`(`product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `seo_tag`, `other_introduction`, `add_custom_input`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `gst`, `cgst`, `sgst`, `value_added_tax`, `variety`, vendor_id, `shop`) VALUES ('" + product_title_name + "','" + product_slug + "','" + store_name + "','" + product_description + "','" + product_type + "','" + brand + "','" + category + "','" + parent_category + "','" + seo_tag + "','" + other_introduction + "','" + add_custom_input1 + "','" + wholesale_sales_tax + "','" + manufacturers_sales_tax + "','" + retails_sales_tax + "','" + gst + "', '" + cgst + "','" + sgst + "','" + value_added_tax + "'," + variety + ",'" + vendor_id + "', '" + shop + "')", (err, rows, fields) => {
    if (err) {
      console.log("/_products_post_error" + err)
      res.status(500).send(err)
    } else {

      var p_id = JSON.parse(rows.insertId)
      console.log("p_id______" + p_id)
      res.status(201).send({ "message": "succesfully added data on new_product table" })
      console.log("successfully_add_data_on_new_products")
      product_catagory.forEach((item, index) => {
        console.log(index)

        connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + p_id + ',"' + item.colors + '","' + item.size + '",' + item.mrp + ',' + item.product_price + ',' + item.sale_price + ',' + item.discount + ',"' + item.manufacturing_date + '","' + item.expire_date + '",' + item.special_offer + ',' + item.featured_product + ',"' + item.unit + '","' + item.unit_quantity + '",' + item.quantity + ',"' + item.product_status + '")', (err, rows, fields) => {
          if (err) {
            console.log("/_products_post_error" + err)
            res.status(500).send(err)
          } else {
            console.log("successfully_added_data_on_price_table")

          }
        });
      });
    }
  })
}

function products_varient_update(req, res) {
  var { id, product_id, colors, size, mrp, product_price, sale_price, discount, manufacturing_date, expire_date, special_offer, featured_product, unit, quantity, product_status, unit_quantity } = req.body
  console.log(req.body)
  console.log(colors)
  connection.query('UPDATE products_pricing SET colors="' + colors + '",size="' + size + '",mrp=' + mrp + ',product_price=' + product_price + ',sale_price=' + sale_price + ',discount=' + discount + ',manufacturing_date="' + manufacturing_date + '",expire_date="' + expire_date + '",special_offer=' + special_offer + ',featured_product=' + featured_product + ',unit="' + unit + '",unit_quantity="' + unit_quantity + '",product_status="' + product_status + '",quantity=' + quantity + '  WHERE id=' + id + ' AND product_id=' + product_id + '', (err, rows, fields) => {
    if (err) {
      console.log("/products_update" + err)
      res.status(500).send(err)
    } else {
      console.log("successfully_updated_data_on_price_table")
      res.status(202).send(rows)
    }
  })
}

function products_update(req, res) {
  var { id, product_title_name, product_slug, store_name, product_description, product_type, category, parent_category, seo_tag, other_introduction, add_custom_input, brand, wholesale_sales_tax, manufacturers_sales_tax, retails_sales_tax, value_added_tax, variety, gst, cgst, sgst, is_active } = req.body
  console.log("_______products_update________")
  console.log(req.body)

  var add_custom_input1 = JSON.stringify(add_custom_input)
  console.log(add_custom_input1)
  connection.query("UPDATE `products` SET `product_title_name`='" + product_title_name + "',`product_slug`='" + product_slug + "',`brand`='" + brand + "',`store_name`='" + store_name + "',`product_description`='" + product_description + "',`product_type`='" + product_type + "',`category`=" + category + ",`parent_category`='" + parent_category + "',`seo_tag`='" + seo_tag + "',`variety`=" + variety + ",`other_introduction`='" + other_introduction + "',`add_custom_input`='" + add_custom_input1 + "',`wholesale_sales_tax`='" + wholesale_sales_tax + "',`manufacturers_sales_tax`='" + manufacturers_sales_tax + "',`retails_sales_tax`='" + retails_sales_tax + "',`gst`='" + gst + "' ,`cgst`='" + cgst + "' ,`sgst`='" + sgst + "',`value_added_tax`='" + value_added_tax + "' ,`is_active`='" + is_active + "' WHERE `id`=" + id + "", (err, rows, fields) => {
    if (err) {
      console.log("/products_update" + err)
      res.status(500).send(err)
    } else {
      console.log("successfully_updated_data_on_products_table")
      res.status(202).send(rows)
    }
  })
}

function products_delete(req, res) {
  console.log("-----------products_delete------------")

  var { id, product_id, is_delete } = req.body
  console.log(req.body)
  if (is_delete == '0') {
    connection.query('UPDATE products_pricing SET is_delete= "' + is_delete + '" WHERE id=' + id + ' AND product_id=' + product_id + '', (err, rows, fields) => {
      if (err) {
        console.log(err)
        res.status(500).send(err)
      } else {
        console.log("successfully_products_deleted")
        res.status(202).send(rows)
      }
    })
  } else {
    res.status(500).send("not deleted product")
  }
}

function products_varient_add(req, res) {
  var { product_id, colors, size, mrp, product_price, sale_price, discount, manufacturing_date, expire_date, special_offer, featured_product, unit, quantity, product_status, unit_quantity } = req.body
  console.log(req.body)
  console.log(colors)
  if (product_id != '') {
    connection.query('INSERT INTO `products_pricing`(`product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`,`product_status`) VALUES (' + product_id + ',"' + colors + '","' + size + '",' + mrp + ',' + product_price + ',' + sale_price + ',' + discount + ',"' + manufacturing_date + '","' + expire_date + '",' + special_offer + ',' + featured_product + ',"' + unit + '",' + unit_quantity + ',' + quantity + ',' + product_status + ')', (err, rows, fields) => {
      if (err) {
        console.log("/products_update" + err)
        res.status(500).send(err)
      } else {
        console.log("successfully_add_data_on_price_table")
        res.status(202).send(rows)
      }
    })
  } else {
    console.log("-----------varient_id----------")
  }

}

function products_pricing(req, res) {

  if (req.query.id == 'all') {
    connection.query('SELECT * FROM products_pricing WHERE 1  ', (err, rows, fields) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(rows)
      }
    })
  } else {
    connection.query('SELECT * FROM products_pricing WHERE id =' + req.query.id + ' AND product_id =' + req.query.product_id + ' ', (err, rows, fields) => {
      if (err) {
        console.log("/product_error" + err)
        res.status(500).send(err)
      } else {
        //console.log(rows)
        res.status(200).send(rows)
      }
    })
  }

}

function product(req, res) {
  var product_details = ''

  connection.query('SELECT * FROM `products` WHERE id =' + req.query.id + '', (err, rows, fields) => {
    if (err) {
      console.log("/product_error" + err)
      //res.status(500).send(err)
    } else {
      if (rows != '') {
        product_details = rows[0]
        console.log(rows[0])
        connection.query('SELECT * FROM products_pricing WHERE product_id =' + req.query.id + '', (err, row, fields) => {
          if (err) {
            console.log("/product_error" + err)
            res.status(500).send(err)
          } else {
            if (row != '') {
              {
                Object.assign(product_details, { product_verient: row });
                res.status(200).send(product_details)
              }
            } else {
              res.status(500).send("error")
            }
          }
        })
      } else {
        res.status(500).send("error")
      }

    }
  })

}

module.exports = { products_search, productpost, products_varient_update, products_update, products_delete, products_varient_add, products_pricing, product };