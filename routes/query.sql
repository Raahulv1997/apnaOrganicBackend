SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "61") as wishlist FROM products_view WHERE is_delete = "1" AND (`product_title_name` LIKE "%%" OR `product_description` LIKE "%%" OR `product_type` LIKE "%%" OR `colors` LIKE "%%" ) LIMIT 0,500"
"SELECT *, (SELECT id FROM wishlist WHERE wishlist.product_id = products_view.id AND user_id = "62") as wishlist FROM products_view WHERE is_delete = "1" AND (`product_price` BETWEEN "20" AND "500000")  AND is_delete = "1"  LIMIT 0,10"
SELECT * FROM `products` WHERE FIND_IN_SET('18',parent_category)