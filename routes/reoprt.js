const connection = require('../db')


function revenue(req, res) {
 var discount_amount=0;
 var str_revenue=''
 var revenuearr = []
 var { vendors_id, categorys, user_locations, brand } = req.body
 console.log(req.body)
 if (vendors_id != '') {
 console.log("true1");
 var vendors_id_ar = JSON.stringify(vendors_id);
 var vendors_id_arr = "'" + vendors_id_ar + "'"
 var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
 console.log("__" + vendors_id_arr + "__")
 str_revenue += ' AND vendor_id IN (' + vendors_id_arr + ')'
 } else {
 console.log("false1")
 }

 if (categorys != '') {
 console.log("true2")
 var categorys_ar = JSON.stringify(categorys);
 var categorys_arr = "'" + categorys_ar + "'"
 var categorys_arr = categorys_arr.substring(categorys_arr.lastIndexOf("'[") + 2, categorys_arr.indexOf("]'"));
 console.log("__" + categorys_arr + "__")
 str_revenue += ' AND FIND_IN_SET ('+categorys_arr+',parent_category)'//FIND_IN_SET ("+cat_string+",parent_category)
 } else {
 console.log("false2")
 }

 if(user_locations!=''){
 console.log("true3")
 var user_locations_ar = JSON.stringify(user_locations);
 var user_locations_arr="'"+user_locations_ar+"'"
 console.log(user_locations_arr)
 var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
 console.log("__"+user_locations_arr+"__")
 str_revenue+= ' AND user_address LIKE '+user_locations_arr+''
 }else{
 console.log("false3")
 }

 if (brand != '') {
 console.log("true4")
 var brand_ar = JSON.stringify(brand);
 var brand_arr = "'" + brand_ar + "'"
 var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
 console.log("__" + brand_arr + "__")
 str_revenue += ' AND brand IN (' + brand_arr + ')'
 } else {
 console.log("false4")
 }

console.log("+++++++++++++++++____________str_revenue______1___++++++++++++++++++++++++++") 

 connection.query("SELECT SUM(`sale_price`) gross_total_amount , SUM(`gst`) total_gst, (SELECT SUM(orders.shipping_charges) FROM orders WHERE (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59')) as total_shipping_charges FROM orders_view WHERE (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') "+str_revenue+"", (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 
 console.log("_____")
 rows != '' ? revenuearr.push(rows[0]) : console.log('error')
 }
 })

 connection.query("SELECT SUM(`sale_price`) gross_total_amount , SUM(`gst`) total_gst, (SELECT SUM(orders.shipping_charges) FROM orders WHERE (`created_on` BETWEEN '" + req.body.prev_from_date + " 00:00:00' AND '" + req.body.prev_to_date + " 23:59:59')) as total_shipping_charges FROM orders_view WHERE (`created_on` BETWEEN '" + req.body.prev_from_date + " 00:00:00' AND '" + req.body.prev_to_date + " 23:59:59') "+str_revenue+"", (err, result, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 console.log("_____+++++++++++++++++++")
 console.log(result[0].gross_total_amount)
 console.log(result[0].total_gst)
 console.log(result[0].total_shipping_charges)
 Object.assign(revenuearr[0], { "prev_gross_total_amount":result[0].gross_total_amount })
 Object.assign(revenuearr[0], { "prev_total_gst": result[0].total_gst })
 Object.assign(revenuearr[0], { "prev_total_shipping_charges": result[0].total_shipping_charges })
 }
 })


 connection.query("SELECT SUM(`sale_price`) return_total FROM `orders_view` WHERE `status` = 'return' AND (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') " + str_revenue + "", (err, rslt, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 console.log("second_query__")
 console.log("_____")
 Object.assign(revenuearr[0], { "return_total": rslt[0].return_total })
 }
 })

 connection.query("SELECT SUM(`sale_price`) return_total FROM `orders_view` WHERE `status` = 'return' AND (`created_on` BETWEEN '" + req.body.prev_from_date + " 00:00:00' AND '" + req.body.prev_to_date + " 23:59:59') " + str_revenue + "", (err, rslts, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 console.log("second_query__")
 console.log(rslts)
 Object.assign(revenuearr[0], { "prev_return_total": rslts[0].return_total })

 }
 })

 connection.query('SELECT DISTINCT order_id,(SELECT SUM(orders.discount_coupon_value) FROM orders WHERE orders.id=orders_view.order_id) as count FROM `orders_view` WHERE status="delivered" AND discount_coupon!="" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 rows.forEach((item, index) => {
 discount_amount += parseInt(item.count);
 })
 // coupon_report_arr.push()
 Object.assign(revenuearr[0], { discount_amount })
 }
 }
 })

 connection.query('SELECT DISTINCT order_id,(SELECT SUM(orders.discount_coupon_value) FROM orders WHERE orders.id=orders_view.order_id) as count FROM `orders_view` WHERE status="delivered" AND discount_coupon!="" AND `created_on` BETWEEN "' + req.body.prev_from_date + ' 00:00:00" AND "' + req.body.prev_to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 rows.forEach((item, index) => {
 discount_amount += parseInt(item.count);
 })
 // coupon_report_arr.push()
 Object.assign(revenuearr[0], {"prev_discount_amount": discount_amount })
 }
 }
 })

 connection.query('SELECT DISTINCT date(date_format(`created_on`, "%Y-%m-%d")) as uniquedates ,SUM(`sale_price`) gross_amount,SUM(`gst`) total_gst, SUM(DISTINCT `shipping_charges`) total_shipping_charges,SUM(`discount_coupon`) discount , (SUM(`sale_price`) - SUM(`discount_coupon`)) net_sales,(SUM(`sale_price`) + SUM(DISTINCT `shipping_charges`)) total_sales from orders_view WHERE (`created_on` BETWEEN "'+ req.body.from_date +' 00:00:00" AND "'+ req.body.to_date +' 23:59:59") ' +str_revenue+' GROUP BY date(date_format(`created_on`, "%Y-%m-%d")) ORDER by date(date_format(`created_on`, "%Y-%m-%d")) DESC', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 console.log("_____"+rows)
 Object.assign(revenuearr[0], { "ravenue_date_data": rows })
 res.status(200).send(revenuearr)
 } else {
 res.status(200).send({"message":"no_data"})
 console.log('error')
 }
 }
 })


}


function orders_report(req, res) {
 console.log(req.body)
 var str_revenue = ''
 var order_report_arr = [];
 var { vendors_id, categorys, user_locations, brand } = req.body
 console.log(req.body)
 if (vendors_id != '') {
 console.log("true1");
 var vendors_id_ar = JSON.stringify(vendors_id);
 var vendors_id_arr = "'" + vendors_id_ar + "'"
 var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
 console.log("__" + vendors_id_arr + "__")
 str_revenue += ' AND vendor_id IN (' + vendors_id_arr + ')'
 } else {
 console.log("false1")
 }

 if (categorys != '') {
 console.log("true2")
 var categorys_ar = JSON.stringify(categorys);
 var categorys_arr = "'" + categorys_ar + "'"
 var categorys_arr = categorys_arr.substring(categorys_arr.lastIndexOf("'[") + 2, categorys_arr.indexOf("]'"));
 console.log("__" + categorys_arr + "__")
 str_revenue += ' AND FIND_IN_SET ('+categorys_arr+',parent_category)'
 } else {
 console.log("false2")
 }

 if(user_locations!=''){
 console.log("true3")
 var user_locations_ar = JSON.stringify(user_locations);
 var user_locations_arr="'"+user_locations_ar+"'"
 console.log(user_locations_arr)
 var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
 console.log("__"+user_locations_arr+"__")
 str_revenue+= ' AND user_address LIKE '+user_locations_arr+''
 }else{
 console.log("false3")
 }

 if (brand != '') {
 console.log("true4")
 var brand_ar = JSON.stringify(brand);
 var brand_arr = "'" + brand_ar + "'"
 var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
 console.log("__" + brand_arr + "__")
 str_revenue += ' AND brand IN (' + brand_arr + ')'
 } else {
 console.log("false4")
 }

 console.log("+++++++++++++++++____________str_______1___++++++++++++++++++++++++++")

 connection.query("SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`sale_price`) net_sales,AVG(`sale_price`) avg_order_value,(SELECT COUNT( product_id) / COUNT(DISTINCT order_id) as avg_item_per_order FROM order_products) as avg_item_per_order FROM orders_view WHERE status='delivered' AND `created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59' " + str_revenue + "", (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 rows != '' ? order_report_arr.push(rows) : console.log('orders_report_error')
 }
 })

 connection.query("SELECT COUNT(DISTINCT `order_id`) as prev_order_count,SUM(`sale_price`) prev_net_sales,AVG(`sale_price`) prev_avg_order_value,(SELECT COUNT( product_id) / COUNT(DISTINCT order_id) as prev_avg_item_per_order FROM order_products) as prev_avg_item_per_order FROM orders_view WHERE status='delivered' AND `created_on` BETWEEN '" + req.body.prev_from_date + " 00:00:00' AND '" + req.body.prev_to_date + " 23:59:59' " + str_revenue + "", (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if(rows != ''){
 console.log(order_report_arr[0])
 order_report_arr.push(rows)
 }
 }
 })


 console.log("+++++++++++++++++____________str_______2___++++++++++++++++++++++++++")
 
 connection.query("SELECT DISTINCT `order_id`,`created_on`,`status`,`user_id`,COUNT(product_id) p_id,SUM(`sale_price`) total_order_amount FROM orders_view WHERE `status` = 'delivered' AND `created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59' " + str_revenue + " GROUP BY `order_id` ", (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 order_report_arr.push(rows)
 console.log(order_report_arr)
 res.status(200).send(order_report_arr)
 } else {
 res.status(200).send({ message: "No_Data" })
 console.log('orders_report_error')
 }
 }
 })


}


function products_report(req, res) {
 console.log(req.body)
 var products_report_arr = [];
 var str_revenue = '';
 var { vendors_id, categorys, user_locations, brand } = req.body
 console.log(req.body)
 if (vendors_id != '') {
 console.log("true1");
 var vendors_id_ar = JSON.stringify(vendors_id);
 var vendors_id_arr = "'" + vendors_id_ar + "'"
 var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
 console.log("__" + vendors_id_arr + "__")
 str_revenue += ' AND vendor_id IN (' + vendors_id_arr + ')'
 } else {
 console.log("false1")
 }

 if (categorys != '') {
 console.log("true2")
 var categorys_ar = JSON.stringify(categorys);
 var categorys_arr = "'" + categorys_ar + "'"
 var categorys_arr = categorys_arr.substring(categorys_arr.lastIndexOf("'[") + 2, categorys_arr.indexOf("]'"));
 console.log("__" + categorys_arr + "__")
 str_revenue += ' AND parent_category IN (' + categorys_arr + ')'
 } else {
 console.log("false2")
 }

 if(user_locations!=''){
 console.log("true3")
 var user_locations_ar = JSON.stringify(user_locations);
 var user_locations_arr="'"+user_locations_ar+"'"
 console.log(user_locations_arr)
 var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
 console.log("__"+user_locations_arr+"__")
 str_revenue+= ' AND user_address LIKE '+user_locations_arr+''
 }else{
 console.log("false3")
 }

 if (brand != '') {
 console.log("true4")
 var brand_ar = JSON.stringify(brand);
 var brand_arr = "'" + brand_ar + "'"
 var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
 console.log("__" + brand_arr + "__")
 str_revenue += ' AND brand IN (' +brand_arr+ ')'
 } else {
 console.log("false4")
 }
 console.log("+++++++++++++++++____________str_revenue______1___++++++++++++++++++++++++++")
 console.log(str_revenue)

 connection.query('SELECT COUNT(DISTINCT `order_id`) as order_count,SUM(`sale_price`) net_sales,COUNT(product_id) as product_count FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" AND NOT `status` = "return" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 //res.status(200).send(err)
 } else {
 rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
 }
 })

 connection.query('SELECT COUNT(DISTINCT `order_id`) as prev_order_count,SUM(`sale_price`) prev_net_sales,COUNT(product_id) as prev_product_count FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.prev_from_date + ' 00:00:00" AND "' + req.body.prev_to_date + ' 23:59:59" AND NOT `status` = "return" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 //res.status(200).send(err)
 } else {
 rows != '' ? products_report_arr.push(rows) : console.log('products_report_error')
 }
 })

 connection.query('SELECT product_id, COUNT(DISTINCT order_id) as order_count,SUM(sale_price) net_sales,COUNT(product_id) as product_count, (SELECT products.product_title_name FROM products WHERE orders_view.product_id = products.id) as product_name, (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as category_name FROM orders_view WHERE `status`="delivered" AND NOT `status` = "return" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + ' GROUP BY product_id', (err, rows, fields) => {
 if (err) {
 console.log(err)
 // res.status(200).send(err)
 } else {
 if (rows != '') {
 products_report_arr.push(rows)
 console.log(products_report_arr)
 res.status(200).send(products_report_arr)
 } else {
 res.status(200).send({ message: "No_Data" })
 console.log('products_report_error')
 }
 }
 })
}


function coupons_report(req, res) {
 console.log(req.body)
 var coupon_report_arr = [];
 var discount_amount = 0;
 var orders_count = 0;
 var prev_discount_amount = 0;
 var prev_orders_count = 0;
 var str_revenue = '';
 var { vendors_id, categorys, user_locations, brand } = req.body
 console.log(req.body)
 if (vendors_id != '') {
 console.log("true1");
 var vendors_id_ar = JSON.stringify(vendors_id);
 var vendors_id_arr = "'" + vendors_id_ar + "'"
 var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
 console.log("__" + vendors_id_arr + "__")
 str_revenue += ' AND vendor_id IN (' + vendors_id_arr + ')'
 } else {
 console.log("false1")
 }

 if (categorys != '') {
 console.log("true2")
 var categorys_ar = JSON.stringify(categorys);
 var categorys_arr = "'" + categorys_ar + "'"
 var categorys_arr = categorys_arr.substring(categorys_arr.lastIndexOf("'[") + 2, categorys_arr.indexOf("]'"));
 console.log("__" + categorys_arr + "__")
 str_revenue += ' AND FIND_IN_SET ('+categorys_arr+',parent_category)'
 } else {
 console.log("false2")
 }

 if(user_locations!=''){
 console.log("true3")
 var user_locations_ar = JSON.stringify(user_locations);
 var user_locations_arr="'"+user_locations_ar+"'"
 console.log(user_locations_arr)
 var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
 console.log("__"+user_locations_arr+"__")
 str_revenue+= ' AND user_address LIKE '+user_locations_arr+''
 }else{
 console.log("false3")
 }

 if (brand != '') {
 console.log("true4")
 var brand_ar = JSON.stringify(brand);
 var brand_arr = "'" + brand_ar + "'"
 var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
 console.log("__" + brand_arr + "__")
 str_revenue += ' AND brand IN (' + brand_arr + ')'
 } else {
 console.log("false4")
 }

 console.log("+++++++++++++++++____________str_revenue______1___++++++++++++++++++++++++++")
 console.log(str_revenue)


 connection.query('SELECT DISTINCT order_id,(SELECT SUM(orders.discount_coupon_value) FROM orders WHERE orders.id=orders_view.order_id) as count FROM `orders_view` WHERE status="delivered" AND discount_coupon!="" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 rows.forEach((item, index) => {
 orders_count = index + 1
 discount_amount += parseInt(item.count);
 })
 coupon_report_arr.push({ discount_amount, orders_count })
 }
 }
 })

 connection.query('SELECT DISTINCT order_id,(SELECT SUM(orders.discount_coupon_value) FROM orders WHERE orders.id=orders_view.order_id) as count FROM `orders_view` WHERE status="delivered" AND discount_coupon!="" AND `created_on` BETWEEN "' + req.body.prev_from_date + ' 00:00:00" AND "' + req.body.prev_to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 rows.forEach((item, index) => {
 prev_orders_count = index + 1
 prev_discount_amount += parseInt(item.count);
 })
 coupon_report_arr.push({ prev_discount_amount, prev_orders_count })
 }
 }
 })

 connection.query('SELECT discount_coupon,COUNT(DISTINCT order_id) order_count, (SELECT coupons.code FROM coupons WHERE orders_view.discount_coupon = coupons.id) as coupons_code, SUM(DISTINCT `discount_coupon_value`) amount_discounted, DATE_FORMAT(order_date, "%Y-%m-%d") created_date FROM orders_view WHERE `status`="delivered" AND discount_coupon !="" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + ' GROUP BY discount_coupon,order_date', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 coupon_report_arr.push(rows)
 console.log(coupon_report_arr)
 res.status(200).send(coupon_report_arr)
 } else {
 res.status(200).send({ "message": "no_data" })
 console.log('coupon_report_error')
 }
 }
 })
}


// function categories_report(req,res){
// console.log(req.body)
// var cat_str = 'SELECT SUM(`sale_price`) total_sold_product_amount, COUNT(`id`) total_sold_product_count, COUNT(DISTINCT order_id) order_count FROM `orders_view` WHERE '
// if(req.body.parent_category ==''){
// cat_str +="(`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')"
// }else{
// var cat_arr = JSON.stringify(req.body.parent_category);

// var abc="'"+cat_arr+"'"
// const cat_string = abc.substring(abc.lastIndexOf("'[") + 2, abc.indexOf("]'"));
// console.log("cat_string__________________________________")
// console.log(cat_string)
// //FIND_IN_SET('1', all_parent)
// cat_str += " FIND_IN_SET ("+cat_string+",parent_category) AND (`created_on` BETWEEN '" + req.body.from_date + " 00:00:00' AND '" + req.body.to_date + " 23:59:59') AND (NOT `status` = 'return')"
// }

// console.log(cat_str)
// connection.query(cat_str, (err, rows, fields) => {
// if (err) {
// console.log(err)
// res.status(200).send(err)
// } else {
// rows != '' ? res.status(200).send(rows) : res.status(200).send({ message: "No_Data" })
// }
// })

// // SELECT (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as cat_name,COUNT(product_id) as product_count,COUNT(DISTINCT order_id) as order_count,SUM(`sale_price`) as total_sales FROM orders_view GROUP BY cat_name

// connection.query('SELECT (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as cat_name,COUNT(product_id) as product_count,COUNT(DISTINCT order_id) as order_count,SUM(`sale_price`) as total_sales FROM orders_view GROUP BY cat_name', (err, rows, fields) => {
// if (err) {
// console.log(err)
// res.status(200).send(err)
// } else {
// rows != '' ? res.status(200).send(rows) : res.status(200).send({ message: "No_Data" })
// }
// })


// }

function categories_report(req,res){
 console.log(req.body);
 var str_revenue=''
 var categories_arr = []
 var { vendors_id, parent_category, user_locations, brand } = req.body
 console.log(req.body)
 if (vendors_id != '') {
 console.log("true1");
 var vendors_id_ar = JSON.stringify(vendors_id);
 var vendors_id_arr = "'" + vendors_id_ar + "'"
 var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
 console.log("__" + vendors_id_arr + "__")
 str_revenue += ' AND vendor_id IN (' + vendors_id_arr + ')'
 } else {
 console.log("false1")
 }

 if (parent_category != '') {
 console.log("true2")
 var parent_category_ar = JSON.stringify(parent_category);
 var parent_category_arr = "'" + parent_category_ar + "'"
 var parent_category_arr = parent_category_arr.substring(parent_category_arr.lastIndexOf("'[") + 2, parent_category_arr.indexOf("]'"));
 console.log("__" + parent_category_arr + "__")
 str_revenue += ' AND FIND_IN_SET ('+parent_category_arr+',parent_category)'//FIND_IN_SET ("+cat_string+",parent_category)
 } else {
 console.log("false2")
 }

 if(user_locations!=''){
 console.log("true3")
 var user_locations_ar = JSON.stringify(user_locations);
 var user_locations_arr="'"+user_locations_ar+"'"
 console.log(user_locations_arr)
 var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
 console.log("__"+user_locations_arr+"__")
 str_revenue+= ' AND user_address LIKE '+user_locations_arr+''
 }else{
 console.log("false3")
 }

 if (brand != '') {
 console.log("true4")
 var brand_ar = JSON.stringify(brand);
 var brand_arr = "'" + brand_ar + "'"
 var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
 console.log("__" + brand_arr + "__")
 str_revenue += ' AND brand IN (' + brand_arr + ')'
 } else {
 console.log("false4")
 }

 connection.query('SELECT SUM(`sale_price`) total_sold_product_amount, COUNT(`id`) total_sold_product_count, COUNT(DISTINCT order_id) order_count FROM `orders_view` WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 console.log(rows)
 categories_arr.push(rows) 
 // res.send(rows)
 }
 }
 })
 connection.query('SELECT SUM(`sale_price`) prev_total_sold_product_amount, COUNT(`id`) prev_total_sold_product_count, COUNT(DISTINCT order_id) prev_order_count FROM `orders_view` WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.prev_from_date + ' 00:00:00" AND "' + req.body.prev_to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 console.log(rows)
 categories_arr.push(rows) 
 // res.send(categories_arr)
 }
 }
 })

 connection.query('SELECT (SELECT (SELECT category.category_name FROM category WHERE products.category=category.id) FROM products WHERE orders_view.product_id = products.id) as cat_name,COUNT(product_id) as product_count,COUNT(DISTINCT order_id) as order_count,SUM(`sale_price`) as total_sales FROM orders_view WHERE status="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + ' GROUP BY cat_name', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 console.log("_____"+rows)
 categories_arr.push(rows)
 res.status(200).send(categories_arr)
 } else {
 res.status(200).send({"message":"no_data"})
 console.log('error')
 }
 }
 })

 }

function stock_report(req,res){
 var {values}=req.body;
 console.log(values)

 if (values != "") {
 if (values == "out of stock") {
 console.log("out of stock")
 var stock_value = 'SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE quantity < 1 '
 }
 if (values == "low stock") {
 console.log("low stock")
 var stock_value = 'SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE quantity < 5 AND quantity > 1'

 }
 if (values == "in stock") {
 console.log("in stock")
 stock_value = 'SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE quantity >= 1'
 }
 }
 else {
 var stock_value = 'SELECT `product_title_name`,`product_status`,`quantity` FROM `products_view` WHERE 1'
 }
 connection.query('' + stock_value + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 console.log("_____")
 res.status(200).send(rows)
 } else {
 res.status(200).send({ message: "No_Data" })
 console.log('stock_report_error')
 }
 }
 }
 })
}

function customers_report(req, res) {
 console.log(req.body)
 var { user_search } = req.body;
 connection.query('SELECT first_name,last_name,`user_id`,`email`,`address`,(SELECT COUNT(`id`) FROM orders WHERE users.user_id=orders.user_id) order_count,(SELECT SUM(`total_amount`) FROM orders WHERE users.user_id=orders.user_id) total_amount,(SELECT AVG(`total_amount`) FROM orders WHERE users.user_id=orders.user_id) avg_value,`created_on` FROM `users` WHERE `first_name` LIKE "%' + user_search + '%" OR `email` LIKE "%' + user_search + '%"', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 rows != '' ? res.send(rows) : res.status(200).send({ message: "No_Data" })
 }
 })
}

function taxes_report(req, res) {
 console.log(req.body)
 var taxes_report_arr = [];
 var str_revenue = '';
 var { vendors_id, categorys, user_locations, brand } = req.body
 console.log(req.body)
 if (vendors_id != '') {
 console.log("true1");
 var vendors_id_ar = JSON.stringify(vendors_id);
 var vendors_id_arr = "'" + vendors_id_ar + "'"
 var vendors_id_arr = vendors_id_arr.substring(vendors_id_arr.lastIndexOf("'[") + 2, vendors_id_arr.indexOf("]'"));
 console.log("__" + vendors_id_arr + "__")
 str_revenue += ' AND vendor_id IN (' + vendors_id_arr + ')'
 } else {
 console.log("false1")
 }

 if (categorys != '') {
 console.log("true2")
 var categorys_ar = JSON.stringify(categorys);
 var categorys_arr = "'" + categorys_ar + "'"
 var categorys_arr = categorys_arr.substring(categorys_arr.lastIndexOf("'[") + 2, categorys_arr.indexOf("]'"));
 console.log("__" + categorys_arr + "__")
 str_revenue += ' AND FIND_IN_SET ('+categorys_arr+',parent_category)'
 } else {
 console.log("false2")
 }

 if(user_locations!=''){
 console.log("true3")
 var user_locations_ar = JSON.stringify(user_locations);
 var user_locations_arr="'"+user_locations_ar+"'"
 console.log(user_locations_arr)
 var user_locations_arr = user_locations_arr.substring(user_locations_arr.lastIndexOf("'[") + 2, user_locations_arr.indexOf("]'"));
 console.log("__"+user_locations_arr+"__")
 str_revenue+= ' AND user_address LIKE '+user_locations_arr+''
 }else{
 console.log("false3")
 }

 if (brand != '') {
 console.log("true4")
 var brand_ar = JSON.stringify(brand);
 var brand_arr = "'" + brand_ar + "'"
 var brand_arr = brand_arr.substring(brand_arr.lastIndexOf("'[") + 2, brand_arr.indexOf("]'"));
 console.log("__" + brand_arr + "__")
 str_revenue += ' AND brand IN (' + brand_arr + ')'
 } else {
 console.log("false4")
 }

 console.log("+++++++++++++++++____________str_revenue______1___++++++++++++++++++++++++++")
 console.log(str_revenue)


 connection.query('SELECT SUM(total_gst) order_tax,COUNT(DISTINCT order_id) order_count FROM orders_view WHERE `status`="delivered" AND `created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 rows != '' ? taxes_report_arr.push(rows) : console.log('No Data')
 }
 })

 connection.query('SELECT SUM(total_gst) prev_order_tax,COUNT(DISTINCT order_id) prev_order_count FROM orders_view WHERE `status`="delivered" AND `created_on` BETWEEN "' + req.body.prev_from_date + ' 00:00:00" AND "' + req.body.prev_to_date + ' 23:59:59" ' + str_revenue + '', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 rows != '' ? taxes_report_arr.push(rows) : console.log('No Data')
 }
 })

 connection.query('SELECT DISTINCT `gst`,COUNT(DISTINCT `order_id`) order_count,SUM(`total_gst`) order_taxes FROM orders_view WHERE `status`="delivered" AND (`created_on` BETWEEN "' + req.body.from_date + ' 00:00:00" AND "' + req.body.to_date + ' 23:59:59 ") ' + str_revenue + ' GROUP by gst', (err, rows, fields) => {
 if (err) {
 console.log(err)
 res.status(200).send(err)
 } else {
 if (rows != '') {
 taxes_report_arr.push(rows)
 console.log(taxes_report_arr)
 res.status(200).send(taxes_report_arr)
 } else {
 res.status(200).send({ message: "No_Data" })
 console.log('No Data')
 }
 }
 })
}




module.exports = { revenue, orders_report, products_report, categories_report, coupons_report, stock_report, customers_report, taxes_report }