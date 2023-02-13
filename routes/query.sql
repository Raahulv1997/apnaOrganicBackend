-- SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "61") as wishlist FROM products_view WHERE is_delete = "1" AND (`product_title_name` LIKE "%%" OR `product_description` LIKE "%%" OR `product_type` LIKE "%%" OR `colors` LIKE "%%" ) LIMIT 0,500"
-- "SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "62") as wishlist FROM products_view WHERE is_delete = "1" AND (`product_price` BETWEEN "20" AND "500000")  AND is_delete = "1"  LIMIT 0,10"
-- SELECT * FROM `products` WHERE FIND_IN_SET('18',parent_category)
-- SELECT`id`, `user_id`, `status`, `created_on`, `order_id`, `product_id`, `sale_price`, `shipping_charges`, `gst`, `parent_category`, `vendor_id`, `is_delete` FROM `orders_view` WHERE created_on BETWEEN '2022-11-28 00:00:00' AND '2022-11-29 23:59:59

-- CREATE VIEW products_view4 AS SELECT products_pricing.id,products_pricing.product_id,products.product_title_name,products.product_slug,products.store_name,products.product_description,products.product_type,products.brand,products.category,products.parent_category,products.seo_tag,products.other_introduction,products.add_custom_input,products.wholesale_sales_tax,products.manufacturers_sales_tax,products.retails_sales_tax,products.gst,products.value_added_tax,products.variety,products.vendor_id,products.shop,products.rating,products_pricing.colors,products_pricing.size,products_pricing.mrp,products_pricing.product_price,products_pricing.sale_price,products_pricing.discount,products_pricing.manufacturing_date,products_pricing.expire_date,products_pricing.special_offer,products_pricing.featured_product,products_pricing.unit,products_pricing.unit_quantity,products_pricing.quantity,products_pricing.is_delete,products_pricing.product_status,products.cgst,products.sgst,(SELECT GROUP_CONCAT(product_image_path) FROM product_images WHERE product_images.product_verient_id = products_pricing.id group by product_verient_id) as all_images FROM products_pricing,products WHERE products_pricing.product_id = products.id



SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "61") as wishlist, (SELECT is_deleted FROM fetured_product_table WHERE fetured_product_table.product_id = products_view.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() ) as is_fetured_product FROM products_view WHERE is_delete = "1" AND  is_fetured_product IN ("1") AND is_delete = "1"  LIMIT 0,10


CREATE VIEW products_view AS SELECT products_pricing.id,products_pricing.product_id,products.product_title_name,products.product_slug,products.store_name,products.product_description,products.product_type,products.brand,products.category,products.parent_category,products.seo_tag,products.other_introduction,products.add_custom_input,products.wholesale_sales_tax,products.manufacturers_sales_tax,products.retails_sales_tax,products.gst,products.value_added_tax,products.variety,products.vendor_id,products.shop,products.rating,products_pricing.colors,products_pricing.size,products_pricing.mrp,products_pricing.product_price,products_pricing.sale_price,products_pricing.discount,products_pricing.manufacturing_date,products_pricing.expire_date,products_pricing.special_offer,products_pricing.featured_product,products_pricing.unit,products_pricing.unit_quantity,products_pricing.quantity,products_pricing.is_delete,products_pricing.product_status,products.cgst,products.sgst,(SELECT GROUP_CONCAT(product_image_path) FROM product_images WHERE product_images.product_verient_id = products_pricing.id AND image_position = 'cover' group by product_verient_id) as all_images,(SELECT id FROM fetured_product_table WHERE fetured_product_table.product_id = products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() ) as fetured_product_id ,(SELECT is_deleted FROM fetured_product_table WHERE fetured_product_table.product_id = products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() ) as is_fetured_product, (SELECT fetured_type FROM fetured_product_table WHERE fetured_product_table.product_id = products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() ) as fetured_type FROM products_pricing,products WHERE products_pricing.product_id = products.id




  var ase_desc = ''
if(id !=''){ase_desc = 'id'+id }else{}
if(product_title_name !=''){ase_desc = 'product_title_name'+product_title_name  }else{}
if(sale_price !=''){ase_desc = 'sale_price'  }else{}











CREATE VIEW products_view1 AS SELECT products_pricing.id,products_pricing.product_id,products.product_title_name,products.product_slug,products.store_name,products.product_description,products.product_type,products.brand,products.category,products.parent_category,products.seo_tag,products.other_introduction,products.add_custom_input,products.wholesale_sales_tax,products.manufacturers_sales_tax,products.retails_sales_tax,products.gst,products.value_added_tax,products.variety,products.vendor_id,products.shop,products.rating,products_pricing.colors,products_pricing.size,products_pricing.mrp,products_pricing.product_price,products_pricing.sale_price,products_pricing.discount,products_pricing.manufacturing_date,products_pricing.expire_date,products_pricing.special_offer,products_pricing.featured_product,products_pricing.unit,products_pricing.unit_quantity,products_pricing.quantity,products_pricing.is_delete,products_pricing.product_status,products.cgst,products.sgst,  products_pricing.created_on, products_pricing.updated_on,

(SELECT GROUP_CONCAT(product_image_path) FROM product_images WHERE product_images.product_verient_id = products_pricing.id AND image_position = 'cover' group by product_verient_id) as all_images,

(SELECT count(id) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=1 AND fetured_type='product_promotion') as is_promotional,

(SELECT CONCAT(start_date,",",end_date) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=1 AND fetured_type='product_promotion') as promotional_date,

(SELECT count(id) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=1 AND fetured_type='featured_offer') as is_featured,

(SELECT CONCAT(start_date,",",end_date) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=1 AND fetured_type='featured_offer') as featured_date,

(SELECT count(id) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=1 AND fetured_type='special_offer') as is_special_offer,

(SELECT CONCAT(start_date,",",end_date) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=1 AND fetured_type='special_offer') as special_offer_date  FROM products_pricing,products WHERE products_pricing.product_id = products.id









CREATE VIEW products_view AS SELECT products_pricing.id,products_pricing.product_id,products.product_title_name,products.product_slug,products.store_name,products.product_description,products.product_type,products.brand,products.category,products.parent_category,products.seo_tag,products.other_introduction,products.add_custom_input,products.wholesale_sales_tax,products.manufacturers_sales_tax,products.retails_sales_tax,products.gst,products.value_added_tax,products.variety,products.vendor_id,products.shop,products.rating,products_pricing.colors,products_pricing.size,products_pricing.mrp,products_pricing.product_price,products_pricing.sale_price,products_pricing.discount,products_pricing.manufacturing_date,products_pricing.expire_date,products_pricing.special_offer,products_pricing.featured_product,products_pricing.unit,products_pricing.unit_quantity,products_pricing.quantity,products_pricing.is_delete,products_pricing.product_status,products.cgst,products.sgst,  products_pricing.created_on, products_pricing.updated_on,(SELECT GROUP_CONCAT(product_image_path) FROM product_images WHERE product_images.product_verient_id = products_pricing.id AND image_position = 'cover' group by product_verient_id) as all_images,(SELECT count(id) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=0 AND fetured_type='product_promotion') as is_promotional,(SELECT CONCAT(start_date,",",end_date) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=0 AND fetured_type='product_promotion') as promotional_date,(SELECT count(id) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=0 AND fetured_type='featured_offer') as is_featured,(SELECT CONCAT(start_date,",",end_date) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=0 AND fetured_type='featured_offer') as featured_date,(SELECT count(id) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=0 AND fetured_type='special_offer') as is_special_offer,(SELECT CONCAT(start_date,",",end_date) FROM fetured_product_table WHERE fetured_product_table.product_id =products_pricing.product_id AND fetured_product_table.start_date < NOW() AND fetured_product_table.end_date > NOW() AND is_deleted=0 AND fetured_type='special_offer') as special_offer_date  FROM products_pricing,products WHERE products_pricing.product_id = products.id



-- CREATE VIEW cart_view AS SELECT cart.id AS cart_id, products_view.id,cart.user_id,products_view.product_id, products_view.product_title_name,products_view.product_slug,products_view.store_name,products_view.product_description,products_view.product_type,products_view.brand,products_view.category,products_view.parent_category,products_view.seo_tag,products_view.other_introduction,products_view.add_custom_input,products_view.wholesale_sales_tax,products_view.manufacturers_sales_tax,products_view.retails_sales_tax,products_view.gst,products_view.cgst,products_view.sgst,products_view.value_added_tax,products_view.variety,products_view.vendor_id,products_view.shop,products_view.rating,products_view.colors,products_view.size,products_view.mrp,products_view.product_price,products_view.sale_price,products_view.discount,products_view.manufacturing_date,products_view.special_offer,products_view.featured_product,products_view.expire_date,products_view.unit,products_view.unit_quantity,products_view.quantity,products_view.is_delete,products_view.product_status,products_view.all_images,cart.quantity AS order_quantity FROM cart,products_view WHERE cart.product_view_id = products_view.id    





-- CREATE VIEW cart_view AS SELECT cart.id AS cart_id, products_view.id,cart.user_id,products_view.product_id, products_view.product_title_name,products_view.product_slug,products_view.store_name,products_view.product_description,products_view.product_type,products_view.brand,products_view.category,products_view.parent_category,products_view.seo_tag,products_view.other_introduction,products_view.add_custom_input,products_view.wholesale_sales_tax,products_view.manufacturers_sales_tax,products_view.retails_sales_tax,products_view.gst,products_view.cgst,products_view.sgst,products_view.value_added_tax,products_view.variety,products_view.vendor_id,products_view.shop,products_view.rating,products_view.colors,products_view.size,products_view.mrp,products_view.product_price,products_view.sale_price,products_view.discount,products_view.manufacturing_date,products_view.special_offer,products_view.featured_product,products_view.expire_date,products_view.unit,products_view.unit_quantity,products_view.quantity,products_view.is_delete,products_view.product_status,products_view.all_images FROM cart,products_view WHERE cart.product_view_id = products_view.id


SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "88") as wishlist, (SELECT id FROM cart WHERE cart.product_view_id = products_view.id AND user_id = "88") as cart FROM products_view WHERE is_delete = "1" AND (`product_title_name` LIKE "%%" OR `product_description` LIKE "%%" OR `product_type` LIKE "%%" OR `colors` LIKE "%%" )  ORDER BY id DESC LIMIT 0,500
SELECT COUNT(id), (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "88") as wishlist, (SELECT id FROM cart WHERE cart.product_view_id = products_view.id AND user_id = "88") as cart FROM products_view WHERE is_delete = "1" AND  0,500