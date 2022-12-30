-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 30, 2022 at 10:44 AM
-- Server version: 5.7.40-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apnaorganicstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_login_details`
--

CREATE TABLE `admin_login_details` (
  `id` int(11) NOT NULL,
  `admin_email` varchar(255) NOT NULL,
  `admin_name` varchar(225) NOT NULL,
  `admin_phone` varchar(255) NOT NULL,
  `admin_type` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_login_details`
--

INSERT INTO `admin_login_details` (`id`, `admin_email`, `admin_name`, `admin_phone`, `admin_type`, `admin_password`) VALUES
(1, 'mayur.we2code@gmail.com', 'Ashish patidar', '9999999999', 'superadmin', '$2b$10$3amg0Xxda/Xz9cOTkYc51elt/pDTlhuQOpFGtOVIJ1Ho2Wys/wwYW'),
(4, 'ffwse@gmail.com', 'bhavnaaaaaaaaaa', '1544', '2', '$2b$10$rphM0e.V2X0z.l3HxtAh8OXlfmEBjVkWuAWEilVQ5.LhOWV.K6ICG'),
(5, 'mayur.we2code@gmail.com', 'bhavna ', '789456123', '2', '$2b$10$3amg0Xxda/Xz9cOTkYc51elt/pDTlhuQOpFGtOVIJ1Ho2Wys/wwYW'),
(6, 'shiavni.we2code@gmail.com', 'shivvvaaaa', '741852963', '1', '$2b$10$q85rS3yHWqP3xJ9DyAHKG.bQmrelYXnfBj.q4uWGRhFl0XZGXBAmC'),
(7, 'vijendra01@gmail.com', 'vijendra', '9665123987', '1', '$2b$10$xuf7XMhFq5V0d/QFtskxIegXkEPngOr/jeyXV76vyAU10vQMN20mK'),
(8, 'vijendra01@gmail.com', 'vijendraaaa', '9665123987', '1', '$2b$10$Nlnd1FEHDP6ywOnYv0cPeuQGNEt3rISaiVdhlsPj3PC2NhytA7Xv6'),
(9, 'gauran01@gmail.com', 'gaurav', '8896532147', '3', '$2b$10$sRZB/2p9LMVS7MrhyOzz6OorPpdsPjo4lJXk8UesteDYm7AOfHMF2'),
(10, 'mayur.we2code@gmail.com', 'mohan', '789456123', '2', '$2b$10$vOMvPm0lyY0QE.kEDmenruVEajAFGqM4f46PxZFuUEDPsnDACfuNe'),
(11, 'g.choudhary.we2code@gmail.com', 'Gourav Choudhary', '1234567890', 'superadmin', '$2b$10$BX0vUoYOkkL3lB3iSGUNYeC8wdsy9/cWnChZHRDnb7F8NWgbv/G/C'),
(12, 'g.choudhary.we2code@gmail.com', 'Gourav Choudhary', '1234567890', '2', '$2b$10$EuWGhDqroFNP44quNhZBBOjkcq6MI3bWqcoaHMatRFAlFvxBAiA6u');

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `banner_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(225) DEFAULT NULL,
  `banner_url` varchar(255) NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `banner_location` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`banner_id`, `image`, `title`, `description`, `banner_url`, `size`, `banner_location`, `status`, `created_on`, `updated_on`, `is_deleted`) VALUES
(1, 'public/catgory_images/image-1672142190385.png', 'dipawali dhamka sale 60%off', 'get 1 by 1 sale hurry up save 20%', 'aasdfgdddddddddddddddd', 'landscape', 'top carosal', 'pending', '2022-12-27 16:58:32', '2022-12-27 16:58:32', '0'),
(2, 'public/catgory_images/image-1672205460272.png', 'dipawali dhamka sale 60%off', 'get 2 by 2 sale hurry up save 20%', 'aasdfgdddddddddddddddd', 'landscape', 'bottom carosal', 'approved', '2022-12-28 11:01:00', '2022-12-28 11:01:00', '0');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(25) NOT NULL,
  `admin_id` int(25) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `product_tag` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `publish_date` datetime DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `admin_id`, `image`, `title`, `description`, `category`, `product_tag`, `status`, `publish_date`, `created_on`, `updated_on`, `is_delete`) VALUES
(1, 11, 'public/catgory_images/image-1672311069361.png', 'men t', 'man ', 'a', 'ssssss', 'panding', '2022-12-12 00:00:00', '2022-11-26 13:51:31', '2022-12-26 13:51:31', '0'),
(2, 12, 'public/catgory_images/image-1672311069361.png', 'men t', 'man ', 'a', 'ssssss', 'Published', '2022-12-12 00:00:00', '2022-12-26 14:12:07', '2022-12-26 14:12:07', '1'),
(3, 14, 'public/catgory_images/image-1672311069361.png', 'men t', 'man ', 'a', 'ssssss', 'Published', '2022-12-12 00:00:00', '2022-12-26 14:17:45', '2022-12-26 14:17:45', '1'),
(4, 11, 'public/catgory_images/image-1672311069361.png', 'men t', 'man ', 'a', 'ssssss', 'pending', '2022-12-12 00:00:00', '2022-12-29 13:58:27', '2022-12-29 13:58:27', '1'),
(5, 11, 'public/catgory_images/image-1672311069361.png', 'men t', 'man ', 'a', 'ssssss', 'pending', '2022-12-12 00:00:00', '2022-12-29 14:42:26', '2022-12-29 14:42:26', '0'),
(6, 12, 'public/catgory_images/image-1672311069361.png', 'men t', 'man ', 'a', 'ssssss', 'pending', '2022-12-12 00:00:00', '2022-12-29 15:32:06', '2022-12-29 15:32:06', '0');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_view_id` int(250) NOT NULL,
  `price` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_view_id`, `price`, `discount`, `quantity`, `is_active`, `created_on`, `updated_on`) VALUES
(27, 7, 61, 400, 500, 0, 1, '2022-12-12 15:24:13', '2022-12-12 15:24:13'),
(76, 11, 305, 1300, 10, 4, 1, '2022-12-15 12:45:20', '2022-12-15 12:45:20'),
(77, 39, 14, 1300, 10, 4, 1, '2022-12-15 12:47:09', '2022-12-15 12:47:09'),
(78, 39, 14, 1300, 10, 4, 1, '2022-12-15 12:51:42', '2022-12-15 12:51:42'),
(79, 41, 14, 1300, 10, 4, 1, '2022-12-15 12:53:15', '2022-12-15 12:53:15'),
(80, 41, 306, 1300, 10, 4, 1, '2022-12-15 12:55:46', '2022-12-15 12:55:46'),
(81, 39, 3065, 1300, 10, 4, 1, '2022-12-15 12:56:02', '2022-12-15 12:56:02'),
(82, 41, 306, 1300, 10, 4, 1, '2022-12-15 12:56:38', '2022-12-15 12:56:38'),
(83, 43, 86, 1200, 20, 1, 1, '2022-12-15 14:53:56', '2022-12-15 14:53:56'),
(84, 43, 87, 900, 20, 1, 1, '2022-12-15 14:53:59', '2022-12-15 14:53:59'),
(86, 43, 87, 900, 20, 1, 1, '2022-12-15 14:56:05', '2022-12-15 14:56:05'),
(89, 41, 306, 1300, 10, 4, 1, '2022-12-15 17:18:20', '2022-12-15 17:18:20'),
(90, 43, 87, 900, 20, 1, 1, '2022-12-15 17:23:00', '2022-12-15 17:23:00'),
(91, 43, 86, 1200, 20, 1, 1, '2022-12-15 17:26:13', '2022-12-15 17:26:13'),
(92, 43, 86, 1200, 20, 1, 1, '2022-12-15 17:29:50', '2022-12-15 17:29:50'),
(93, 43, 86, 1200, 20, 1, 1, '2022-12-15 17:30:14', '2022-12-15 17:30:14'),
(96, 43, 86, 1200, 20, 1, 1, '2022-12-16 09:56:54', '2022-12-16 09:56:54'),
(116, 43, 222, 1300, 10, 4, 1, '2022-12-16 11:45:12', '2022-12-16 11:45:12'),
(122, 43, 334, 100, 10, 1, 1, '2022-12-16 15:14:30', '2022-12-16 15:14:30'),
(123, 43, 336, 6, 10, 1, 1, '2022-12-16 15:14:31', '2022-12-16 15:14:31'),
(130, 2, 239, 100, 10, 0, 1, '2022-12-17 10:58:38', '2022-12-17 10:58:38'),
(131, 2, 241, 100, 10, 6, 1, '2022-12-17 11:00:13', '2022-12-17 11:00:13'),
(132, 2, 54, 400, 10, 0, 1, '2022-12-17 11:21:42', '2022-12-17 11:21:42'),
(201, 63, 99, 200, 200, 2, 1, '2022-12-22 12:58:00', '2022-12-22 12:58:00'),
(202, 63, 243, 1000, 1000, 0, 1, '2022-12-22 12:58:03', '2022-12-22 12:58:03'),
(220, 62, 328, 200, 200, 0, 1, '2022-12-22 15:26:47', '2022-12-22 15:26:47'),
(221, 62, 336, 200, 200, 0, 1, '2022-12-22 15:26:59', '2022-12-22 15:26:59'),
(232, 60, 319, 200, 200, 2, 1, '2022-12-22 15:31:17', '2022-12-22 15:31:17'),
(233, 61, 99, 200, 200, 2, 1, '2022-12-22 15:57:16', '2022-12-22 15:57:16'),
(234, 61, 236, 1000, 1000, 0, 1, '2022-12-22 15:57:21', '2022-12-22 15:57:21'),
(235, 61, 242, 1000, 1000, 0, 1, '2022-12-22 15:57:27', '2022-12-22 15:57:27'),
(239, 68, 284, 200, 200, 1, 1, '2022-12-23 10:42:11', '2022-12-23 10:42:11'),
(240, 67, 241, 1000, 1000, 6, 1, '2022-12-23 10:47:43', '2022-12-23 10:47:43'),
(242, 67, 278, 400, 400, 4, 1, '2022-12-23 10:47:47', '2022-12-23 10:47:47'),
(318, 69, 178, 1000, 1000, 1, 1, '2022-12-24 14:04:49', '2022-12-24 14:04:49'),
(320, 69, 178, 1000, 1000, 1, 1, '2022-12-24 14:05:07', '2022-12-24 14:05:07'),
(322, 69, 178, 1000, 1000, 1, 1, '2022-12-24 14:05:26', '2022-12-24 14:05:26'),
(324, 69, 178, 1000, 1000, 1, 1, '2022-12-24 14:05:51', '2022-12-24 14:05:51'),
(326, 33, 99, 1300, 10, 4, 1, '2022-12-24 14:09:35', '2022-12-24 14:09:35'),
(414, 70, 239, 1000, 1000, 1, 1, '2022-12-24 16:24:27', '2022-12-24 16:24:27'),
(417, 70, 311, 200, 200, 1, 1, '2022-12-24 16:24:33', '2022-12-24 16:24:33'),
(420, 69, 99, 200, 200, 1, 1, '2022-12-24 16:27:40', '2022-12-24 16:27:40'),
(421, 69, 238, 1000, 1000, 2, 1, '2022-12-24 16:35:15', '2022-12-24 16:35:15'),
(423, 70, 319, 200, 200, 2, 1, '2022-12-26 09:58:45', '2022-12-26 09:58:45'),
(424, 70, 276, 156, 156, 1, 1, '2022-12-26 09:58:47', '2022-12-26 09:58:47'),
(425, 70, 239, 1000, 1000, 4, 1, '2022-12-26 09:58:53', '2022-12-26 09:58:53');

-- --------------------------------------------------------

--
-- Stand-in structure for view `cart_view`
-- (See below for the actual view)
--
CREATE TABLE `cart_view` (
`id` int(11)
,`user_id` int(11)
,`product_id` int(25)
,`product_title_name` varchar(255)
,`product_slug` varchar(255)
,`store_name` varchar(225)
,`product_description` varchar(225)
,`product_type` varchar(225)
,`brand` varchar(255)
,`category` varchar(225)
,`parent_category` varchar(225)
,`seo_tag` varchar(225)
,`other_introduction` varchar(225)
,`add_custom_input` json
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(225)
,`gst` varchar(255)
,`cgst` varchar(255)
,`sgst` varchar(255)
,`value_added_tax` varchar(255)
,`variety` tinyint(1)
,`vendor_id` varchar(255)
,`shop` varchar(255)
,`rating` varchar(225)
,`colors` varchar(255)
,`size` varchar(225)
,`mrp` double
,`product_price` double
,`sale_price` double
,`discount` varchar(255)
,`manufacturing_date` varchar(25)
,`special_offer` tinyint(1)
,`featured_product` tinyint(1)
,`expire_date` varchar(25)
,`unit` varchar(255)
,`unit_quantity` varchar(255)
,`quantity` int(11)
,`is_delete` varchar(255)
,`product_status` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `cart_view1`
-- (See below for the actual view)
--
CREATE TABLE `cart_view1` (
`id` int(11)
,`user_id` int(11)
,`product_title_name` varchar(255)
,`product_slug` varchar(255)
,`store_name` varchar(225)
,`product_description` varchar(225)
,`product_type` varchar(225)
,`brand` varchar(255)
,`category` varchar(225)
,`parent_category` varchar(225)
,`seo_tag` varchar(225)
,`other_introduction` varchar(225)
,`add_custom_input` json
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(225)
,`gst` varchar(255)
,`value_added_tax` varchar(255)
,`variety` tinyint(1)
,`vendor_id` varchar(255)
,`shop` varchar(255)
,`rating` varchar(225)
,`colors` varchar(255)
,`size` varchar(225)
,`mrp` double
,`product_price` double
,`sale_price` double
,`discount` varchar(255)
,`manufacturing_date` varchar(25)
,`special_offer` tinyint(1)
,`featured_product` tinyint(1)
,`product_status` varchar(255)
,`is_delete` varchar(255)
,`unit_quantity` varchar(255)
,`unit` varchar(255)
,`quantity` int(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `all_parent_id` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_type` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `parent_id`, `all_parent_id`, `level`, `category_name`, `category_type`, `image`, `created_on`, `updated_on`, `is_active`) VALUES
(14, 0, '0', 1, 'Fashion', 'Fashion', 'no image', '2022-12-09 11:04:51', '2022-12-09 11:04:51', '0'),
(15, 14, '14,', 2, 'women', 'Fashion', 'public/catgory_images/image-1670564139306.jpg', '2022-12-09 11:05:39', '2022-12-09 11:05:39', '0'),
(16, 14, '14,', 2, 'men', 'Fashion', 'public/catgory_images/image-1670564184144.jpeg', '2022-12-09 11:06:24', '2022-12-09 11:06:24', '0'),
(17, 16, '016', 3, 'woman top wear', 'Fashion', 'no image', '2022-12-09 11:07:03', '2022-12-09 11:07:03', '0'),
(18, 18, '018', 2, 'man bottom wear', 'Fashion', 'no image', '2022-12-09 11:08:29', '2022-12-09 11:08:29', '0'),
(27, 18, '018', 4, 'jeans', 'Fashion', 'no image', '2022-12-09 11:41:03', '2022-12-09 11:41:03', '0'),
(28, 18, '14,16,18', 4, 'shoes', 'Fashion', 'public/catgory_images/image-1670566444852.jpg', '2022-12-09 11:44:05', '2022-12-09 11:44:05', '0'),
(29, 16, '14,16,', 2, 'men top wear', 'Fashion', 'no image', '2022-12-09 11:50:11', '2022-12-09 11:50:11', '0'),
(30, 45, '45', 1, 'shirts', 'Fashion', 'no image', '2022-12-09 11:52:06', '2022-12-09 11:52:06', '0'),
(31, 0, '0,,', 3, 'men\'s tee', 'Fashion', 'public/catgory_images/image-1670653412053.jpeg', '2022-12-09 11:53:14', '2022-12-09 11:53:14', '0'),
(32, 17, '14,15,17', 4, 'Kurta', 'Fashion', 'public/catgory_images/image-1670567046242.jpg', '2022-12-09 11:54:06', '2022-12-09 11:54:06', '0'),
(33, 17, '14,15,17', 4, 'jump suit', 'Fashion', 'public/catgory_images/image-1670567112744.jpg', '2022-12-09 11:55:12', '2022-12-09 11:55:12', '0'),
(36, 0, '0', 1, 'Organic Beauty', 'Health', 'public/catgory_images/image-1670569287917.jpeg', '2022-12-09 12:31:27', '2022-12-09 12:31:27', '0'),
(37, 36, '36', 2, 'skin care', 'Health', 'public/catgory_images/image-1670569599077.jpg', '2022-12-09 12:36:39', '2022-12-09 12:36:39', '0'),
(39, 38, '36,38,', 3, 'organic soaps', 'Health', 'public/catgory_images/image-1670570503873.jpg', '2022-12-09 12:51:43', '2022-12-09 12:51:43', '0'),
(40, 38, '36,38,', 3, 'face wash', 'Health', 'public/catgory_images/image-1670570558814.jpg', '2022-12-09 12:52:38', '2022-12-09 12:52:38', '0'),
(41, 38, '36,38,', 3, 'cream', 'Health', 'public/catgory_images/image-1670570608630.jpg', '2022-12-09 12:53:28', '2022-12-09 12:53:28', '0'),
(42, 35, '34,35,', 3, 'shampoo', 'Health', 'public/catgory_images/image-1670570679079.jpg', '2022-12-09 12:54:39', '2022-12-09 12:54:39', '0'),
(43, 42, '34,35,42', 4, 'onion shampoo', 'Health', 'public/catgory_images/image-1670570774397.jpg', '2022-12-09 12:56:14', '2022-12-09 12:56:14', '0'),
(44, 42, '34,35,42', 4, 'healthy shampoo', 'Health', 'public/catgory_images/image-1670570904019.jpg', '2022-12-09 12:58:24', '2022-12-09 12:58:24', '0'),
(45, 0, '0,,', 1, 'Sports', 'Sports & Accessor', 'public/catgory_images/image-1670570998952.svg', '2022-12-09 12:59:58', '2022-12-09 12:59:58', '0'),
(46, 45, '45,,', 2, 'cricket', 'Sports & Accessor', 'public/catgory_images/image-1670571110204.jpg', '2022-12-09 13:01:50', '2022-12-09 13:01:50', '0'),
(47, 46, '45,46,', 3, 'bet', 'Sports & Accessor', 'public/catgory_images/image-1670571162429.jpg', '2022-12-09 13:02:42', '2022-12-09 13:02:42', '0'),
(48, 47, '45,46,47', 4, 'Willow Cricket Bat', 'Fashion', 'public/catgory_images/image-1670571208736.jpg', '2022-12-09 13:03:28', '2022-12-09 13:03:28', '0'),
(49, 46, '45,46,', 3, 'boll', 'Sports & Accessor', 'public/catgory_images/image-1670571268975.jpg', '2022-12-09 13:04:29', '2022-12-09 13:04:29', '0'),
(50, 49, '45,46,49', 4, 'Cricket Rubber Ball', 'Sports & Accessor', 'public/catgory_images/image-1670571348205.png', '2022-12-09 13:05:48', '2022-12-09 13:05:48', '0'),
(51, 49, '45,46,49', 4, 'Cricket Synthetic Ball ', 'Sports & Accessor', 'public/catgory_images/image-1670574284891.jpg', '2022-12-09 13:54:45', '2022-12-09 13:54:45', '0'),
(52, 0, '0,,', 1, 'Grocery', 'Grocery', 'public/catgory_images/image-1670574550766.jpg', '2022-12-09 13:59:10', '2022-12-09 13:59:10', '0'),
(53, 52, '52,,', 2, 'Grains & Bread', 'Grocery', 'public/catgory_images/image-1670574926457.jpg', '2022-12-09 14:05:26', '2022-12-09 14:05:26', '0'),
(54, 52, '52,,', 2, 'Oil & Fat', 'Grocery', 'public/catgory_images/image-1670574976355.jpg', '2022-12-09 14:06:16', '2022-12-09 14:06:16', '0'),
(55, 53, '52,53,', 3, 'Pasta', 'Grocery', 'public/catgory_images/image-1670575021429.jpg', '2022-12-09 14:07:01', '2022-12-09 14:07:01', '0'),
(56, 53, '52,53,', 3, 'Rice ', 'Grocery', 'public/catgory_images/image-1670575057683.svg', '2022-12-09 14:07:37', '2022-12-09 14:07:37', '0'),
(57, 54, '52,54,', 3, 'Cooking oil ', 'Grocery', 'public/catgory_images/image-1670575135513.jpeg', '2022-12-09 14:08:55', '2022-12-09 14:08:55', '0'),
(58, 54, '52,54,', 3, 'Butter', 'Grocery', 'public/catgory_images/image-1670575169079.jpg', '2022-12-09 14:09:29', '2022-12-09 14:09:29', '0'),
(59, 57, '52,54,57', 4, 'Canola Oil', 'Grocery', 'no image', '2022-12-09 14:11:23', '2022-12-09 14:11:23', '0'),
(60, 57, '52,54,57', 4, 'Peanut Oil', 'Grocery', 'public/catgory_images/image-1670575339791.jpg', '2022-12-09 14:12:20', '2022-12-09 14:12:20', '0'),
(61, 52, '52,,', 2, 'Biscuits & cookies', 'Grocery', 'public/catgory_images/image-1670651487515.jpeg', '2022-12-10 11:20:48', '2022-12-10 11:20:48', '0'),
(62, 0, '0,,', 1, 'appliances', 'Electronic', 'public/catgory_images/image-1670653484133.png', '2022-12-10 11:54:44', '2022-12-10 11:54:44', '0'),
(63, 52, '52', 1, 'sports', 'Sports & Accessor', 'no image', '2022-12-10 12:40:21', '2022-12-10 12:40:21', '0'),
(64, 0, '0', 1, 'jyhuj', 'Fashion', 'public/catgory_images/image-1670657258124.jpeg', '2022-12-10 12:57:38', '2022-12-10 12:57:38', '0'),
(65, 0, '65', 1, 'test sub3', 'Health', 'no image', '2022-12-12 10:27:36', '2022-12-12 10:27:36', '0'),
(66, 0, '65', 2, 'test subb', 'Health', 'no image', '2022-12-12 12:37:23', '2022-12-12 12:37:23', '0'),
(67, 64, '64', 2, 'text', 'Health', 'public/catgory_images/image-1670829618739.jpeg', '2022-12-12 12:50:18', '2022-12-12 12:50:18', '0'),
(68, 64, '64', 2, 'text', 'Health', 'public/catgory_images/image-1670830004045.jpeg', '2022-12-12 12:56:44', '2022-12-12 12:56:44', '0'),
(69, 0, '0', 2, 'text childd', 'Health', 'no image', '2022-12-12 14:03:21', '2022-12-12 14:03:21', '0'),
(70, 68, '64,68,', 3, 'fasttrack', 'Health', 'public/catgory_images/image-1670836576952.jpeg', '2022-12-12 14:46:16', '2022-12-12 14:46:16', '0'),
(71, 0, '0', 1, 'Parent Category', 'Sports & Accessor', 'public/catgory_images/image-1670837321679.png', '2022-12-12 14:58:26', '2022-12-12 14:58:26', '0'),
(72, 71, '71', 2, 'Sub Category', 'Sports & Accessor', 'public/catgory_images/image-1670837475783.jpeg', '2022-12-12 15:01:15', '2022-12-12 15:01:15', '0'),
(73, 71, '71', 2, 'Child Category', 'Sports & Accessor', 'public/catgory_images/image-1670837521394.jpg', '2022-12-12 15:02:01', '2022-12-12 15:02:01', '0'),
(74, 72, '71,72,', 3, 'child', 'Sports & Accessor', 'public/catgory_images/image-1670839349007.jpeg', '2022-12-12 15:32:29', '2022-12-12 15:32:29', '0'),
(75, 73, '71,73', 3, 'child2', '', 'no image', '2022-12-12 15:36:19', '2022-12-12 15:36:19', '0'),
(76, 71, '71', 2, 'subCat', 'Sports & Accessor', 'no image', '2022-12-12 15:47:19', '2022-12-12 15:47:19', '0'),
(77, 0, '0', 1, 'test', 'Health', 'public/catgory_images/image-1671873541353.jpg', '2022-12-24 14:49:01', '2022-12-24 14:49:01', '0'),
(78, 6, '6', 2, 'santoore', 'undefined', 'no image', '2022-12-28 10:40:27', '2022-12-28 10:40:27', '0'),
(79, 6, '6', 2, 'santoore', 'undefined', 'no image', '2022-12-28 10:41:40', '2022-12-28 10:41:40', '0');

-- --------------------------------------------------------

--
-- Table structure for table `comaplains_support`
--

CREATE TABLE `comaplains_support` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `subject` varchar(225) NOT NULL,
  `description` varchar(255) NOT NULL,
  `ticket_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `assigned_to` varchar(255) DEFAULT NULL,
  `resolve_date` varchar(255) DEFAULT NULL,
  `status_` varchar(255) DEFAULT 'pending',
  `resolve_description` varchar(255) DEFAULT NULL,
  `is_active` int(25) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comaplains_support`
--

INSERT INTO `comaplains_support` (`id`, `order_id`, `subject`, `description`, `ticket_date`, `assigned_to`, `resolve_date`, `status_`, `resolve_description`, `is_active`) VALUES
(1, '1234', 'subject', 'descggghh', '2022-12-19 11:30:52', 'undefined', 'undefined', 'undefined', 'undefined', 1),
(2, '5678', 'subject1', 'descggghh1', '2022-12-01 11:48:58', 'ASHISH', '2022-12-01 00:00:00', 'solved', 'DFSDFGSXDGDF', 1),
(3, '5678', 'subject1', 'descggghh1', '2022-12-31 12:09:55', 'jyotish', '2022-12-28', 'pending', 'ddddddddd', 1),
(4, '5678', 'subject1', 'descggghh1', '2022-12-02 12:54:18', 'Mayur', 'null', 'failed', 'null', 1);

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` int(11) NOT NULL,
  `campaign_name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `minimum_amount` varchar(255) NOT NULL,
  `percentage` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `campaign_name`, `code`, `product_type`, `start_date`, `end_date`, `minimum_amount`, `percentage`, `status`, `image`, `is_active`) VALUES
(1, 'Buy 15 Get 4 Free', 'PQRS987654', 'Organic Foods', '2022-12-01 06:30:00', '2022-12-03 12:00:00', '800', '10', 'active', 'public/catgory_images/image-1669273978167.jpg', 0),
(2, 'Buy 10 kanda Get 2 Free kanda', 'PQRS987654', 'Organic Foods', '2022-12-01 12:00:00', '2022-12-03 12:00:00', '300', '5', 'active', 'public/catgory_images/image-1669273978167.jpg', 0),
(3, 'Discount', 'ASHISH987654', 'Organic Foods', '2022-12-01 12:00:00', '2022-12-03 12:00:00', '300', '5', 'expired', 'public/catgory_images/image-1669273978167.jpg', 0),
(4, 'undefined', 'BR85456', 'Grocery', '2022-12-01 12:00:00', '2022-12-04 12:00:00', '4', '2', 'active', 'no image', 0),
(5, 'Garlic', 'SQ85456', 'Grocery', '2022-12-14 00:00:00', '2022-12-23 00:00:00', '2', '2', 'undefined', 'public/catgory_images/image-1669273978167.jpg', 0),
(6, 'Spinach', 'SP895641', 'Grocery', '2022-12-02 12:00:00', '2022-12-05 12:00:00', '2', '5', 'undefined', 'public/catgory_images/image-1670323382918.jpeg', 0),
(7, 'fuddu', 'SP895641', 'Grocery', '2022-12-08 00:00:00', '2022-12-18 00:00:00', '154155', '10', 'undefined', 'undefined', 0),
(8, 'fudddiii', 'FU59854235', 'Sports & Accessor', '2022-12-04 12:00:00', '2022-12-18 12:00:00', '7', '20', 'undefined', 'undefined', 0),
(9, 'undefined', 'undefined', 'undefined', '2022-12-23 00:00:00', '2022-12-31 00:00:00', 'undefined', '10', 'undefined', 'undefined', 0),
(10, 'Spiffffff', 'BR85456t65656', 'Health', '2022-12-03 00:00:00', '2022-12-10 00:00:00', 'undefined', '50', 'undefined', 'undefined', 0),
(11, 'potato', 'BR85456', 'Grocery', '2022-12-21 00:00:00', '2022-12-20 00:00:00', '6', '1', 'undefined', 'undefined', 0),
(12, 'chilli', 'ch0122', 'Grocery', '2022-12-01 00:00:00', '2022-12-15 00:00:00', '2', '3', 'undefined', 'undefined', 0),
(13, 'lady finger', 'LF546', 'Grocery', '2022-12-22 00:00:00', '2022-12-25 00:00:00', '33', '25', '1', 'undefined', 0),
(14, 'green chillii', 'SP895641111111111', 'Grocery', '2022-12-01 00:00:00', '2022-12-05 00:00:00', '2', '2', 'pending', 'undefined', 0),
(15, 'santa', 'ASHISH987654', 'Organic Foods', '2022-12-05 12:00:00', '2022-12-05 12:00:00', '300', '5', 'expired', 'public/catgory_images/image-1669273978167.jpg', 0),
(16, 'santa', 'ASHISH987654', 'Organic Foods', '2022-12-05 00:00:00', '2022-12-05 00:00:00', '300', '5', 'expired', 'public/catgory_images/image-1669273978167.jpg', 0),
(17, 'hjbjn', 'ASHISH987654', 'Organic Foods', '2022-12-05 12:00:00', '2022-12-05 12:00:00', '300', '5', 'expired', 'public/catgory_images/image-1669273978167.jpg', 0),
(18, 'SantaFanta', 'OCTOBER21fcdczsdfzsd', 'Sports & Accessor', '2022-12-05 12:00:00', '2022-12-31 12:00:00', '12000', '14', 'active', 'public/catgory_images/image-1669273978167.jpg', 0),
(19, 'Buy 15 get 4 Free ', 'PQRS987654', 'Organic Foods', '2022-12-01 12:00:00', '2022-12-03 12:00:00', '800', '10', 'active', 'public/catgory_images/image-1669273978167.jpg', 0),
(20, 'Disccjnount', 'ASH987654', 'Organic Foods', '2022-12-01 12:00:00', '2022-12-03 12:00:00', '300', '5', 'expired', 'public/catgory_images/image-1669273978167.jpg', 0),
(21, 'SantaFanta', 'gdfg', 'Grocery', '2022-12-06 00:00:00', '2022-12-31 00:00:00', '5635463', '6', 'active', '', 0),
(22, 'bhoot', 'es', 'Grocery', '2022-12-06 12:00:00', '2022-12-30 12:00:00', '8579', '58', 'active', 'public/catgory_images/image-1670315926599.jpeg', 0),
(23, 'bhoot', 'es', 'Grocery', '2022-12-06 12:00:00', '2022-12-30 12:00:00', '8579', '58', 'active', 'public/catgory_images/image-1670315967968.png', 0),
(24, 'bhoot', 'yhjuyhg', 'Grocery', '2022-12-01 12:00:00', '2022-12-16 12:00:00', '35356', '33', 'active', 'public/catgory_images/image-1670316076506.jpg', 0),
(25, 'big sale', 'yhjuyhg', 'Grocery', '2022-12-16 12:00:00', '2022-12-09 12:00:00', '444', '40', 'active', 'public/catgory_images/image-1670316160903.png', 0),
(26, 'samosa', 'samosa123', 'Grocery', '2022-12-06 12:00:00', '2022-12-30 12:00:00', '1200', '25', 'active', 'public/catgory_images/image-1670316341232.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_table`
--

CREATE TABLE `invoice_table` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `invoice_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `gst` varchar(255) NOT NULL,
  `cgst` varchar(255) NOT NULL,
  `sgst` varchar(255) NOT NULL,
  `taxable_value` varchar(255) NOT NULL,
  `discount/coupon` varchar(255) NOT NULL,
  `total_amount` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `vendor_id` varchar(255) NOT NULL,
  `total_quantity` varchar(255) NOT NULL,
  `ref_no` varchar(255) NOT NULL DEFAULT '123456',
  `payment_mode` varchar(255) NOT NULL,
  `delivery_date` varchar(255) NOT NULL,
  `shipping_charges` varchar(255) DEFAULT NULL,
  `status` varchar(225) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `invoice_no` int(11) NOT NULL,
  `invoice_date` varchar(255) DEFAULT NULL,
  `order_date` varchar(255) NOT NULL,
  `total_amount` varchar(225) DEFAULT NULL,
  `total_gst` varchar(255) DEFAULT NULL,
  `total_cgst` varchar(255) NOT NULL,
  `total_sgst` varchar(255) NOT NULL,
  `taxable_value` varchar(255) NOT NULL,
  `discount_coupon` varchar(255) NOT NULL,
  `discount_coupon_value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `vendor_id`, `total_quantity`, `ref_no`, `payment_mode`, `delivery_date`, `shipping_charges`, `status`, `created_on`, `updated_on`, `invoice_no`, `invoice_date`, `order_date`, `total_amount`, `total_gst`, `total_cgst`, `total_sgst`, `taxable_value`, `discount_coupon`, `discount_coupon_value`) VALUES
(18, '1', '28', '3', '123456', 'upi', '19-08-2022', '100', 'packed', '2022-11-28 14:03:46', '2022-11-15 14:03:46', 10000, '19-08-2022', '19-08-2022', '20000', '5', '54', '54', '1111', '1', '20'),
(19, '1', '36', '3', '123456', 'cash on delivery', '19-08-2022', '100', 'return', '2022-11-28 14:13:57', '2022-11-15 14:13:57', 20000, '19-08-2022', '19-08-2022', '20000', NULL, '54', '54', '1111', '2', '550'),
(20, '1', '25', '3', '123456', 'cash on delivery', '19-08-2022', '200', 'delivered', '2022-11-15 14:15:26', '2022-11-28 14:15:26', 30000, '19-08-2022', '19-08-2022', '20000', NULL, '54', '54', '1111', '3', '550'),
(22, '2', '38', '3', '123456', 'cash on delivery', '19-08-2022', '200', 'delivered', '2022-11-15 17:41:53', '2022-11-28 17:41:53', 5000, '19-08-2022', '19-08-2022', '20000', '5', '54', '54', '1111', '123', '550'),
(124266, '41', '1', '3', '12345678', 'cod', '2022-12-15', 'undefined', 'pending', '2022-12-15 12:58:44', '2022-12-15 12:58:44', 100011, '2022-12-15', '2022-12-15', '11000', '76', '36', '36', '10000', '20', '550'),
(137341, '69', '27', '3', '123456', 'upi', '19-08-2022', '200', 'delivered', '2022-11-29 10:55:17', '2022-11-29 10:55:17', 100001, '19-08-2022', '19-08-2022', '20000', NULL, '54', '54', '111111', '123', '550'),
(145900, '43', '1', '2', '12345678', 'cod', '2022-12-15', '400', 'pending', '2022-12-16 12:03:28', '2022-12-16 12:03:28', 100023, '2022-12-16T11:59:50+05:30', '2022-12-16T11:59:50+05:30', '42404', '', '', '', '', '0', '550'),
(159739, '8', '55', '3', '12345678', 'upi', '2022-12-15', '100', 'return', '2022-11-29 11:28:18', '2022-11-29 11:28:18', 100003, '19-08-2022', '19-08-2022', '20000', NULL, '54', '54', '11111', '123', '550'),
(172081, '4', '85', '3', '123456', 'upi', '19-08-2022', '100', 'cheked7', '2022-11-29 10:41:51', '2022-11-29 10:41:51', 1, '19-08-2022', '19-08-2022', '20000', NULL, '54', '36', '11111', '111233', '550'),
(214763, '41', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'delivered', '2022-12-28 11:37:01', '2022-12-28 11:37:01', 100029, '2022-12-15', '2022-12-15', '200', '76', '36', '36', '10000', '20', 'undefined'),
(227330, '43', '1', '3', '12345678', 'cod', '2022-12-15', 'undefined', 'pending', '2022-12-15 15:04:20', '2022-12-15 15:04:20', 100012, '2022-12-15', '2022-12-15', '11000', '76', '36', '36', '10000', '20', '550'),
(271312, '62', '23', '3', '12345678', 'upi', '2022-12-15', '100', 'delivered', '2022-11-29 16:56:04', '2022-11-29 16:56:04', 100005, '2022-12-15', '2022-12-15', '11000', NULL, '36', '36', '10000', '20', '550'),
(279364, '43', '1', '2', '12345678', 'cod', '2022-12-15', '400', 'pending', '2022-12-16 15:14:53', '2022-12-16 15:14:53', 100024, '2022-12-16T15:14:47+05:30', '2022-12-16T15:14:47+05:30', '106', '', '', '', '', '0', '550'),
(291593, '58', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'delivered', '2022-12-15 17:57:34', '2022-12-15 17:57:34', 100013, '2022-12-15', '2022-12-15', '6000', '76', '36', '36', '10000', '20', '550'),
(308823, '41', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'delivered', '2022-12-28 11:32:29', '2022-12-28 11:32:29', 100028, '2022-12-15', '2022-12-15', 'NaN', '76', '36', '36', '10000', '20', 'undefined'),
(311709, '62', '23', '3', '12345678', 'upi', '2022-12-15', '100', 'delivered', '2022-12-05 12:32:59', '2022-12-05 12:32:59', 100008, '2022-12-15', '2022-12-15', '11000', NULL, '36', '36', '10000', '20', '550'),
(333713, '39', '1', '3', '12345678', 'cod', '2022-12-15', 'undefined', 'pending', '2022-12-15 12:36:18', '2022-12-15 12:36:18', 100010, '2022-12-15', '2022-12-15', '11000', '76', '36', '36', '10000', '20', '550'),
(408366, '52', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'checkke4', '2022-12-27 18:02:40', '2022-12-27 18:02:40', 100027, '2022-12-15', '2022-12-15', 'NaN', '76', '36', '36', '10000', '20', 'undefined'),
(419829, '52', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'delivered', '2022-12-14 10:15:08', '2022-12-14 10:15:08', 100009, '2022-12-15', '2022-12-15', '11000', '76', '36', '36', '10000', '20', '550'),
(454060, '1000', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'delivered', '2022-12-16 11:29:51', '2022-12-16 11:29:51', 100019, '2022-12-15', '2022-12-15', '3600', '76', '36', '36', '10000', '20', '550'),
(462673, '1000', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'delivered', '2022-12-16 16:50:15', '2022-12-16 16:50:15', 100025, '2022-12-15', '2022-12-15', '', '76', '36', '36', '10000', '20', '550'),
(557154, '62', '23', '3', '12345678', 'upi', '2022-12-15', NULL, 'delivered', '2022-12-05 12:15:13', '2022-12-05 12:15:13', 100006, '2022-12-15', '2022-12-15', '11000', NULL, '36', '36', '10000', '20', '550'),
(570833, '43', '1', '2', '12345678', 'cod', '2022-12-15', 'undefined', 'delivered', '2022-12-16 10:16:56', '2022-12-16 10:16:56', 100018, '2022-12-16T10:14:50+05:30', '2022-12-16T10:14:50+05:30', 'NaN', '76', '36', '36', '10000', '0', '550'),
(584375, '8', '23', '3', '12345678', 'upi', '2022-12-15', NULL, 'delivered', '2022-12-05 12:24:47', '2022-12-05 12:24:47', 100007, '2022-12-15', '2022-12-15', '11000', NULL, '36', '36', '10000', '20', '550'),
(657880, '43', '1', '2', '12345678', 'cod', '2022-12-15', 'undefined', 'pending', '2022-12-16 10:10:48', '2022-12-16 10:10:48', 100017, '2022-12-16T10:07:51+05:30', '2022-12-16T10:07:51+05:30', 'NaN', '76', '36', '36', '10000', '0', '550'),
(669568, '4', '42', '3', '123456', 'cash on delivery', '19-08-2022', '100', 'checkke1', '2022-11-29 10:53:13', '2022-11-29 10:53:13', 100000, '19-08-2022', '19-08-2022', '20000', '5', '54', '54', '11111', '11233', '550'),
(736377, '8', '14', '3', '12345678', 'upi', '2022-12-15', '100', 'checkke3', '2022-11-29 16:47:56', '2022-11-29 16:47:56', 100004, '2022-12-15', '2022-12-15', '11000', NULL, '36', '36', '10000', '20', '550'),
(762616, '888', '23', '3', '12345678', 'upi', '2022-12-15', '400', '888', '2022-12-15 18:14:00', '2022-12-15 18:14:00', 100016, '2022-12-15', '2022-12-15', '3000', '76', '36', '36', '10000', '20', '550'),
(833413, '20000', '23', '3', '12345678', 'upi', '2022-12-15', '400', '999', '2022-12-16 16:52:44', '2022-12-16 16:52:44', 100026, '2022-12-15', '2022-12-15', '3600', '76', '36', '36', '10000', '20', '550'),
(869360, '58', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'checkke555', '2022-12-15 18:07:30', '2022-12-15 18:07:30', 100014, '2022-12-15', '2022-12-15', '1000', '76', '36', '36', '10000', '20', '550'),
(883170, '8', '44', '3', '123456', 'paypal', '19-08-2022', NULL, 'checkke3', '2022-11-29 10:56:00', '2022-11-29 10:56:00', 100002, '19-08-2022', '19-08-2022', '20000', NULL, '54', '54', '1', '11123', '1000'),
(926098, '43', '1', '2', '12345678', 'cod', '2022-12-15', '400', 'pending', '2022-12-16 11:59:57', '2022-12-16 11:59:57', 100021, '2022-12-16T11:59:50+05:30', '2022-12-16T11:59:50+05:30', '0', '', '', '', '', '0', '550'),
(944769, '777', '23', '3', '12345678', 'upi', '2022-12-15', '400', 'checkke777', '2022-12-15 18:10:14', '2022-12-15 18:10:14', 100015, '2022-12-15', '2022-12-15', '10000', '76', '36', '36', '10000', '20', '550'),
(981616, '43', '1', '2', '12345678', 'cod', '2022-12-15', '400', 'pending', '2022-12-16 12:01:16', '2022-12-16 12:01:16', 100022, '2022-12-16T11:59:50+05:30', '2022-12-16T11:59:50+05:30', '0', '', '', '', '', '0', '550'),
(985084, '43', '1', '2', '12345678', 'cod', '2022-12-15', '400', 'pending', '2022-12-16 11:59:21', '2022-12-16 11:59:21', 100020, '2022-12-16T11:55:27+05:30', '2022-12-16T11:55:27+05:30', '0', '', '', '', '', '0', '550');

-- --------------------------------------------------------

--
-- Stand-in structure for view `orders_view`
-- (See below for the actual view)
--
CREATE TABLE `orders_view` (
`id` int(11)
,`user_id` varchar(255)
,`status` varchar(225)
,`created_on` datetime
,`updated_on` datetime
,`total_quantity` varchar(255)
,`ref_no` varchar(255)
,`payment_mode` varchar(255)
,`delivery_date` varchar(255)
,`shipping_charges` varchar(255)
,`invoice_no` int(11)
,`invoice_date` varchar(255)
,`order_date` varchar(255)
,`total_amount` varchar(225)
,`total_gst` varchar(255)
,`total_cgst` varchar(255)
,`total_sgst` varchar(255)
,`taxable_value` varchar(255)
,`discount_coupon` varchar(255)
,`discount_coupon_value` varchar(255)
,`order_id` varchar(255)
,`product_id` varchar(225)
,`quantity` varchar(255)
,`gst` varchar(255)
,`cgst` varchar(255)
,`sgst` varchar(255)
,`offer_id` varchar(255)
,`discount` varchar(255)
,`mrp` varchar(255)
,`product_price` varchar(255)
,`product_title_name` varchar(255)
,`store_name` varchar(255)
,`product_description` varchar(225)
,`product_type` varchar(255)
,`brand` varchar(255)
,`category` varchar(255)
,`parent_category` varchar(255)
,`other_introduction` varchar(255)
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(255)
,`variety` varchar(255)
,`vendor_id` varchar(255)
,`shop` varchar(255)
,`rating` varchar(255)
,`colors` varchar(255)
,`size` varchar(255)
,`sale_price` varchar(255)
,`manufacturing_date` varchar(255)
,`special_offer` varchar(255)
,`product_status` varchar(255)
,`expire_date` varchar(255)
,`unit` varchar(225)
,`unit_quantity` varchar(255)
,`is_delete` varchar(255)
,`user_address` varchar(500)
);

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `product_id` varchar(225) NOT NULL,
  `mrp` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `gst` varchar(255) NOT NULL,
  `cgst` varchar(255) NOT NULL,
  `sgst` varchar(255) NOT NULL,
  `offer_id` varchar(255) NOT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `product_price` varchar(255) DEFAULT NULL,
  `product_title_name` varchar(255) NOT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `product_description` varchar(225) DEFAULT NULL,
  `product_type` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `parent_category` varchar(255) DEFAULT NULL,
  `other_introduction` varchar(255) DEFAULT NULL,
  `wholesale_sales_tax` varchar(255) DEFAULT NULL,
  `manufacturers_sales_tax` varchar(255) DEFAULT NULL,
  `retails_sales_tax` varchar(255) DEFAULT NULL,
  `variety` varchar(255) DEFAULT NULL,
  `vendor_id` varchar(255) NOT NULL,
  `shop` varchar(255) DEFAULT NULL,
  `rating` varchar(255) DEFAULT NULL,
  `colors` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `sale_price` varchar(255) DEFAULT NULL,
  `manufacturing_date` varchar(255) DEFAULT NULL,
  `special_offer` varchar(255) DEFAULT NULL,
  `product_status` varchar(255) DEFAULT NULL,
  `expire_date` varchar(255) DEFAULT NULL,
  `unit` varchar(225) DEFAULT NULL,
  `unit_quantity` varchar(255) DEFAULT NULL,
  `is_delete` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `mrp`, `quantity`, `gst`, `cgst`, `sgst`, `offer_id`, `discount`, `product_price`, `product_title_name`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `other_introduction`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `variety`, `vendor_id`, `shop`, `rating`, `colors`, `size`, `sale_price`, `manufacturing_date`, `special_offer`, `product_status`, `expire_date`, `unit`, `unit_quantity`, `is_delete`) VALUES
(39, '18', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, '18', '14,21', NULL, NULL, NULL, NULL, NULL, '12', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(40, '18', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, '19', '14,22', NULL, NULL, NULL, NULL, NULL, '12', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(41, '18', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '12', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(42, '19', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, '', NULL, '18', '5,18', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(43, '19', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(44, '19', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, '19', '5,19', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(45, '20', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, '19', '5,19', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(46, '20', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(47, '20', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(48, '21', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(49, '21', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(50, '21', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(51, '22', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, '19', '5,19', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(52, '22', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(53, '22', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, '22', '5,18,22', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(54, '23', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(55, '23', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, '23', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(57, '552472', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(58, '552472', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(59, '552472', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(60, '172081', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(61, '172081', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(62, '172081', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(63, '622994', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(64, '622994', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(65, '622994', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(66, '436369', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(67, '436369', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(68, '436369', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(69, '503998', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(70, '503998', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(71, '503998', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(72, '847744', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(73, '847744', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(74, '847744', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(75, '669568', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, 'health', 'nike', '21', '5,19,21', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(76, '669568', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(77, '669568', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(78, '137341', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(79, '137341', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80, '137341', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(81, '883170', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(82, '883170', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(83, '883170', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(84, '159739', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(85, '159739', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(86, '159739', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(87, '736377', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(88, '736377', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(89, '736377', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(90, '271312', '2', '3', '4', '6', '7', '8', '9', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(91, '271312', '12', '13', '14', '15', '17', '18', '19', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(92, '271312', '22', '23', '24', '25', '26', '27', '28', NULL, NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(93, '557154', '2', '3', '4', '6', '7', '8', '9', '10%', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(94, '557154', '12', '13', '14', '15', '17', '18', '19', '10%', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(95, '557154', '22', '23', '24', '25', '26', '27', '28', '10%', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(96, '584375', '2', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(97, '584375', '12', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(98, '584375', '22', '23', '24', '25', '26', '27', '28', '10%', '6000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(99, '311709', '2', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(100, '311709', '12', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(101, '311709', '22', '23', '24', '25', '26', '27', '28', '10%', '6000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(102, '419829', '53', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(103, '419829', '54', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(104, '419829', '55', '23', '24', '25', '26', '27', '28', '10%', '6000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(105, '333713', '14', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(106, '333713', '15', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(107, '333713', '16', '23', '24', '25', '26', '27', '28', '10%', '7000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(108, '124266', '306', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(109, '124266', '308', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(110, '124266', '310', '23', '24', '25', '26', '27', '28', '10%', '7000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(111, '227330', '306', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(112, '227330', '308', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(113, '227330', '310', '23', '24', '25', '26', '27', '28', '10%', '7000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(114, '291593', '12', '3', '4', '6', '7', '8', '9', '10%', '5000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(115, '291593', '13', '13', '14', '15', '17', '18', '19', '10%', '60000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(116, '291593', '14', '23', '24', '25', '26', '27', '28', '10%', '6000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(117, '869360', '12', '3', '4', '6', '7', '8', '9', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(118, '869360', '13', '13', '14', '15', '17', '18', '19', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(119, '869360', '14', '23', '24', '25', '26', '27', '28', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(120, '944769', '71', '3', '4', '6', '7', '8', '9', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(121, '944769', '72', '13', '14', '15', '17', '18', '19', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(122, '944769', '73', '23', '24', '25', '26', '27', '28', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(126, '762616', '81', '3', '4', '6', '7', '8', '9', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(127, '762616', '82', '13', '14', '15', '17', '18', '19', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(128, '762616', '83', '23', '24', '25', '26', '27', '28', '10%', '1000', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(129, '657880', 'undefined', 'undefined', '1', '2', '0', '0', 'undefined', '20', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(130, '657880', 'undefined', 'undefined', '200', '2', '0', '0', 'undefined', '20', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(131, '570833', 'undefined', 'undefined', '1', '2', '0', '0', 'undefined', '20', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(132, '570833', 'undefined', 'undefined', '200', '2', '0', '0', 'undefined', '20', 'undefined', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(133, '454060', '1001', '1000', '1', '2', 'null', 'null', 'undefined', '20', '1200', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(134, '454060', '1002', '1000', '1', '2', 'null', 'null', 'undefined', '20', '1200', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(135, '454060', '1003', '1000', '1', '2', '1', '1', 'undefined', '20', '1200', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(136, '145900', '213', '1000', '1', '2', '0', '0', 'undefined', '20', '1200', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(137, '145900', '76', '12', '24', '525', '0', '0', 'undefined', '2', '41204', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(138, '279364', '222', '1000', '3', '36', '5', '5', 'undefined', '10', '100', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(139, '279364', '223', '100', '200', '5', '2.5', '2.5', 'undefined', '10', '6', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '10000', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(140, '833413', '1001', '1000', '1', '2', 'null', 'null', 'undefined', '20', '1200', 'sweatshirt', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', '5,18', 'Fresh', '<p>hey guddu rangeel</p>', '11', '10', '11', '1', '803081', 'my shop', 'null', 'red', 'xl', '10000', '2022-11-24', '1', '1', '2022-11-30', 'pcs', '50', NULL),
(141, '833413', '1002', '1000', '1', '2', 'null', 'null', 'undefined', '20', '1200', 'sweatshirt', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', '5,19', 'Fresh', '<p>hey guddu rangeel</p>', '11', '10', '11', '1', '803081', 'my shop', 'null', 'red', 'xl', '10000', '2022-11-24', '1', '1', '2022-11-30', 'pcs', '50', NULL),
(142, '833413', '1003', '1000', '1', '2', '1', '1', 'undefined', '20', '1200', 'sweatshirt', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', '5,18', 'Fresh', '<p>hey guddu rangeel</p>', '11', '10', '11', '1', '803081', 'my shop', 'null', 'red', 'xl', '10000', '2022-11-24', '1', '1', '2022-11-30', 'pcs', '50', NULL),
(143, '408366', '53', 'undefined', '4', '6', '7', '8', '9', '10%', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', NULL),
(144, '408366', '54', 'undefined', '14', '15', '17', '18', '19', '10%', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', NULL),
(145, '408366', '55', 'undefined', '24', '25', '26', '27', '28', '10%', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', NULL),
(146, '308823', '236', 'undefined', '4', '6', '7', '8', '9', '10%', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', NULL),
(147, '308823', '237', 'undefined', '14', '15', '17', '18', '19', '10%', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', NULL),
(148, '214763', '236', '1000', '3', '36', 'null', 'null', 'undefined', '10', '100', 'myproduct5', 'myproduct_store_name', 'myproduct', 'myproduct1', 'MYBRAND', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '36', '', '', '', 'red', 'm', '1000', '44604.22928240741', '10', 'ok', '44604.22928240741', '5', '5', NULL),
(149, '214763', '237', '1000', '3', '36', 'null', 'null', 'undefined', '10', '100', 'myproduct5', 'myproduct_store_name', 'myproduct', 'myproduct1', 'mybrand1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '36', '', '', '', 'red', 'm', '1000', '44604.22928240741', '10', 'ok', '44604.22928240741', '5', '5', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_title_name` varchar(255) NOT NULL,
  `product_slug` varchar(255) NOT NULL,
  `store_name` varchar(225) NOT NULL,
  `product_description` varchar(225) NOT NULL,
  `product_type` varchar(225) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(225) NOT NULL,
  `parent_category` varchar(225) NOT NULL,
  `seo_tag` varchar(225) NOT NULL,
  `other_introduction` varchar(225) NOT NULL,
  `add_custom_input` json NOT NULL,
  `wholesale_sales_tax` varchar(255) DEFAULT NULL,
  `manufacturers_sales_tax` varchar(255) DEFAULT NULL,
  `retails_sales_tax` varchar(225) DEFAULT NULL,
  `gst` varchar(255) NOT NULL,
  `cgst` varchar(255) DEFAULT NULL,
  `sgst` varchar(255) DEFAULT NULL,
  `value_added_tax` varchar(255) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `variety` tinyint(1) NOT NULL,
  `vendor_id` varchar(255) DEFAULT NULL,
  `shop` varchar(255) DEFAULT NULL,
  `rating` varchar(225) DEFAULT NULL,
  `show_product_rating` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_title_name`, `product_slug`, `store_name`, `product_description`, `product_type`, `brand`, `category`, `parent_category`, `seo_tag`, `other_introduction`, `add_custom_input`, `wholesale_sales_tax`, `manufacturers_sales_tax`, `retails_sales_tax`, `gst`, `cgst`, `sgst`, `value_added_tax`, `created_on`, `updated_on`, `is_active`, `variety`, `vendor_id`, `shop`, `rating`, `show_product_rating`) VALUES
(2, 'jalebi', 'jalebi', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'jalebi', '1', '1,2', 'jalebi', '<p>hey guddu rangeel</p>', '[{\"name\": \"amayue\"}, {\"name\": \"amayue\"}]', '11', '10', '11', '2', '2.5', '2.5', '22', '2022-11-24 18:12:20', '2022-11-24 18:12:20', 0, 1, '', '', '', 1),
(61, 'mnhhm', 'brmunda', 'my cloth store', 'teasty organic mango pickle', 'cloth', 'brand123', '6', '6,28', 'cotton jeans', 'cotton printed jeans', 'null', NULL, NULL, NULL, '', NULL, NULL, NULL, '2022-11-24 18:12:45', '2022-11-24 18:12:45', 1, 1, '114', '', '', 1),
(62, 'errchk', 'brmunda', 'my cloth store', 'teasty organic mango pickle', 'cloth', 'brand123', '6', '6,28', 'cotton jeans', 'cotton printed jeans', 'null', NULL, NULL, NULL, '', NULL, NULL, NULL, '2022-11-24 18:13:27', '2022-11-24 18:13:27', 1, 1, '115', '', '', 1),
(63, 'errchk', 'brmunda', 'my cloth store', 'teasty organic mango pickle', 'cloth', 'brand123', '6', '6,28', 'cotton jeans', 'cotton printed jeans', 'null', NULL, NULL, NULL, '', NULL, NULL, NULL, '2022-11-24 18:18:30', '2022-11-24 18:18:30', 1, 1, '', '', '', 1),
(65, 'mundiiii', 'brmunda', 'my cloth store', 'teasty organic mango pickle', 'cloth', 'brand123', '6', '6,28', 'cotton jeans', 'cotton printed jeans', 'null', NULL, NULL, NULL, '', NULL, NULL, NULL, '2022-11-24 18:26:05', '2022-11-24 18:26:05', 1, 1, '', '', '', 1),
(70, 'aalu bade', 'kachori_123', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"vv\": \"mm\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-11-25 11:54:29', '2022-11-25 11:54:29', 1, 1, '', '', '', 1),
(71, 'aalu bade2', 'bade2', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"vv\": \"yy\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-11-25 11:56:07', '2022-11-25 11:56:07', 1, 1, '', '', '', 1),
(72, 'aalu bade2', 'bade2', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj,jkdf\", \"hdfch,jffj\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-11-25 12:01:32', '2022-11-25 12:01:32', 1, 1, '', '', '', 1),
(73, 'samosa', 'slug123', 'w2c_store_lapssi', '<p>gfdgdf</p>', 'Foods', 'puma', 'Drinks', 'Fresh', 'khki', '<ol><li>Hello from CKEditor 5!</li><li>okay hell</li></ol>', '[\"packaging,grkgokg,ol\", \"storage,good quality\"]', '', 'undefined', 'undefined', '25', NULL, NULL, 'undefined', '2022-11-25 12:34:20', '2022-11-25 12:34:20', 1, 0, '', '', '', 1),
(74, 'aalu bade2', 'bade2', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj,jkdf\", \"hdfch,jffj\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-11-25 13:02:10', '2022-11-25 13:02:10', 1, 1, '', '', '', 1),
(75, 'shoes', 'shoes_12', 'w2c_store_mumbasa', '<p>dcfdfv</p>', 'Foods', 'adidas', '18', 'Organic', 'ikyugikyu', '<p>he</p>', '[\"packaging,good quality\", \"dfvdsf,fdesfd\"]', '', 'undefined', 'undefined', '222', NULL, NULL, 'undefined', '2022-11-25 14:04:16', '2022-11-25 14:04:16', 1, 0, '', '', '', 1),
(76, 'gfdg', 'gdf', 'gdfg', '<p>g</p>', 'Foods', 'puma', 'Drinks', '5,18', 'fswf', '<p>edfsd</p>', '[\"fsd,fsdf\"]', '', 'undefined', 'undefined', '525', NULL, NULL, 'undefined', '2022-11-25 14:28:57', '2022-11-25 14:28:57', 1, 0, '', '', '', 1),
(77, 'aalu bade78', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-11-25 14:36:45', '2022-11-25 14:36:45', 1, 1, '', '4', '', 1),
(78, 'addtest', 'addtest_123', 'w2c_store_lappsi', '<p>sed</p>', 'Foods', 'puma', 'Drinks', 'Organic', 'tst', '<p>hell</p>', '[\"packaging,good quality\", \"456345,42541\"]', '1', '1', '2', '23', NULL, NULL, '22', '2022-11-28 12:03:03', '2022-11-28 12:03:03', 1, 0, '', '2.5', '', 1),
(79, 'addtest', 'addtest_123', 'w2c_store_lappsi', '<p>sed</p>', 'Foods', 'puma', 'Drinks', 'Organic', 'tst', '<p>hell</p>', '[\"packaging,good quality\", \"456345,42541\"]', '1', '1', '2', '23', NULL, NULL, '22', '2022-11-28 12:03:21', '2022-11-28 12:03:21', 1, 0, '', '', '', 1),
(80, 'addtest', 'addtest_123', 'w2c_store_lappsi', '<p>sed</p>', 'Foods', 'puma', 'Drinks', 'Organic', 'tst', '<p>hell</p>', '[\"packaging,good quality\", \"456345,42541\"]', '1', '1', '2', '23', NULL, NULL, '22', '2022-11-28 12:05:30', '2022-11-28 12:05:30', 1, 0, '', '', '', 1),
(81, 'testupdate', 'jalebi', 'w2c_store_lappsi', '<p>ooijk</p>', 'Foods', 'adidas', '18', 'Fresh', 'ghnfghfgv', '<p>Hello from CKEditor 5!hfgtyhtgf</p>', '[\"jhgj,ghjnfgv\", \"fdeftd,tg\"]', '1', '1', '1', '11', NULL, NULL, '1', '2022-11-28 18:03:44', '2022-11-28 18:03:44', 1, 0, '', '', '', 1),
(178, 'myproduct5', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:47:57', '2022-12-01 16:47:57', 1, 36, '', '', '', 1),
(179, 'myproduct6', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:47:59', '2022-12-01 16:47:59', 1, 36, '', '', '', 1),
(180, 'myproduct7', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:48:00', '2022-12-01 16:48:00', 1, 36, '', '', '', 1),
(181, 'myproduct5', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:50:34', '2022-12-01 16:50:34', 1, 36, '', '', '', 1),
(182, 'myproduct6', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:50:36', '2022-12-01 16:50:36', 1, 36, '', '', '', 1),
(183, 'myproduct7', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:50:37', '2022-12-01 16:50:37', 1, 36, '', '', '', 1),
(184, 'myproduct5', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:51:05', '2022-12-01 16:51:05', 1, 36, '', '', '', 1),
(185, 'myproduct6', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:51:06', '2022-12-01 16:51:06', 1, 36, '', '', '', 1),
(186, 'myproduct7', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:51:07', '2022-12-01 16:51:07', 1, 36, '', '', '', 1),
(187, 'myproduct5', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:52:53', '2022-12-01 16:52:53', 1, 36, '', '', '', 1),
(188, 'myproduct6', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:52:54', '2022-12-01 16:52:54', 1, 36, '', '', '', 1),
(189, 'myproduct7', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-01 16:52:55', '2022-12-01 16:52:55', 1, 36, '', '', '', 1),
(190, 'myproduct5', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-06 10:55:08', '2022-12-06 10:55:08', 1, 36, '111000', 'shopone', NULL, 1),
(191, 'myproduct6', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-06 10:55:09', '2022-12-06 10:55:09', 1, 36, '222000', 'shoptwo', NULL, 1),
(192, 'myproduct7', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', NULL, NULL, '36', '2022-12-06 10:55:09', '2022-12-06 10:55:09', 1, 36, '333000', 'shopthree', NULL, 1),
(193, 'retnig_vendore_chek', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-06 11:11:27', '2022-12-06 11:11:27', 1, 1, '803082', 'my shop', NULL, 1),
(194, 'Watches', 'this is best in the world', 'we2code Electronic agancy indore', '', 'electronic', 'puma', 'Drinks', 'Fresh', '', '', '[]', '10', '10', '10', '18', NULL, NULL, '10', '2022-12-07 12:47:33', '2022-12-07 12:47:33', 1, 0, 'undefined', 'undefined', NULL, 1),
(195, 'testadd', 'kachori_123', 'w2c_store_lapssi', '<p>yyyyyrytgrt</p>', 'Foods', 'mamaearth', '18', 'Organic', 'rffffffffffff', '<ul><li>Hello from CKEditor 5!</li><li>hfgjhn</li><li>ghfg</li><li>ghfghn</li></ul>', '[\"fsdf,ghfgh\", \"tghtrf,yygrt\"]', '1', '1', '1', '11', NULL, NULL, '1', '2022-12-10 14:09:47', '2022-12-10 14:09:47', 1, 0, '803082', 'my shop', NULL, 1),
(196, 'paneer', 'slug123', 'apna_store', '<p>y5ttyyyyyyyrhftg</p>', 'Foods', 'adidas', 'Drinks', 'Organic', 'olklkjl', '<ul><li>Hello from CKEditor 5!</li><li>k</li><li>kkll</li></ul>', '[\"Ashish\", \"birju\", \"abcdef,uhytu\"]', '11', '1', '1', '11', NULL, NULL, '1', '2022-12-10 14:15:26', '2022-12-10 14:15:26', 1, 0, '803082', 'my shop', '5', 1),
(197, 'rice', 'lettuce_12123', 'w2c_store_lapssi', '<p>ry5htyt</p>', 'Foods', 'sketchers', 'Drinks', 'Organic', 'jkljl', '<ol><li>Hello from CKEditor 5!</li><li>uj</li></ol>', '[\"jklk,loikol\", \"olijol,ol\"]', '11', '11', '11', '20', NULL, NULL, '2', '2022-12-10 14:36:14', '2022-12-10 14:36:14', 1, 0, '803082', 'my shop', NULL, 1),
(200, 'retnig_vendore_chek', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-10 15:08:11', '2022-12-10 15:08:11', 1, 1, '803082', 'my shop', NULL, 1),
(201, 'retnig_vendore_chek111', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-10 15:09:02', '2022-12-10 15:09:02', 1, 1, '803082', 'my shop', NULL, 1),
(202, 'retnig_vendore_chek222', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj\", \"mm\", \"kk\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-10 15:09:51', '2022-12-10 15:09:51', 1, 1, '803082', 'my shop', NULL, 1),
(203, 'retnig_vendore_chek333', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[\"jj,mm\", \"kk,koo\"]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-10 15:11:12', '2022-12-10 15:11:12', 1, 1, '803082', 'my shop', NULL, 1),
(206, 'hello', 'kachori_123', 'w2c_store_mumbasa', '<p>rfefefrf</p>', 'Foods', 'adidas', 'Drinks', 'Organic', 'wefewrf', '<ul><li>Hello from CKEditor 5!</li><li>uioi</li><li>uyuy</li></ul>', '[\"ashish,good quality\", \"mohan,125gbb\", \"bhavn,BB\"]', '1', '2', '2', '22', NULL, NULL, '41', '2022-12-10 16:03:22', '2022-12-10 16:03:22', 1, 0, '803082', 'my shop', '2.5', 1),
(207, 'bottle', 'lettuce_12123', 'fdfsd', '<p>ttef</p>', 'electronic', 'mamaearth', 'Drinks', 'Organic', 'gfghf', '<ol><li>Hello from CKEditor 5!</li><li>jhvjnh</li></ol>', '[{\"high\": \"low\"}, {\"big\": \"small\"}]', '11', '12', '14', '4', NULL, NULL, '17', '2022-12-10 16:21:43', '2022-12-10 16:21:43', 1, 0, '803082', 'my shop', '3.5', 1),
(208, 'retnig_vendore_chek333', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"jj\": \"mm\"}, {\"kk\": \"koo\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-10 16:37:29', '2022-12-10 16:37:29', 1, 1, '803082', 'my shop', NULL, 1),
(209, 'ear phone', 'lettuce_12123', 'apna_store', '<p>hrtegr</p>', 'electronic', 'puma', 'Drinks', 'Fresh', 'ear', '<ul><li>Hello from CKEditor 5!</li><li>yujgy</li><li>hjhvj</li></ul>', '[\"storage,125gb\"]', '1', '11', '12', '11', NULL, NULL, '12', '2022-12-12 16:37:03', '2022-12-12 16:37:03', 1, 0, '803082', 'my shop', '1.5', 1),
(210, 'headphone', 'lettuce_12123', 'apna_store', '<p>hrtegr</p>', 'electronic', 'puma', 'Drinks', 'Fresh', 'ear', '<ul><li>Hello from CKEditor 5!</li><li>yujgy</li><li>hjhvj</li></ul>', '[\"storage,125gb\"]', '1', '11', '12', '11', NULL, NULL, '12', '2022-12-12 16:37:20', '2022-12-12 16:37:20', 1, 0, '803082', 'my shop', '2', 1),
(211, 'speaker', 'lettuce_12123', 'apna_store', '<p>hrtegr</p>', 'electronic', 'puma', 'Drinks', 'Fresh', 'ear', '<ul><li>Hello from CKEditor 5!</li><li>yujgy</li><li>hjhvj</li></ul>', '[\"storage,125gb\"]', '1', '11', '12', '11', NULL, NULL, '12', '2022-12-12 16:37:37', '2022-12-12 16:37:37', 1, 0, '803082', 'my shop', '2', 1),
(212, 'ADDCUSTOM1222', 'slug123', 'dsfsdf', '<p>sgsfs</p>', 'electronic', 'mamaearth', '18', 'Fresh', 'dfvd', '<p>Hello from CKEditor 5!fgdgdfgdf</p>', '[{\"header\": \"HFGH\", \"description\": \"HFGTHFTG\"}, {\"header\": \"HFGHHYTGFYH\", \"description\": \"HFGTHFTGTFGYH\"}]', '1', '1', '1', '10', NULL, NULL, '11', '2022-12-12 18:33:12', '2022-12-12 18:33:12', 1, 0, '803082', 'my shop', '2.5', 1),
(213, 'sweatshirt', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 12:45:32', '2022-12-15 12:45:32', 1, 1, '803081', 'my shop', NULL, 1),
(214, 'tee', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 13:58:51', '2022-12-15 13:58:51', 1, 1, '803081', 'my shop', NULL, 1),
(215, 'Hooddie', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 14:14:30', '2022-12-15 14:14:30', 1, 1, '803081', 'my shop', NULL, 1),
(216, 'Hooddie', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 14:14:45', '2022-12-15 14:14:45', 1, 1, '803081', 'my shop', NULL, 1),
(217, 'Hooddie', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 14:15:04', '2022-12-15 14:15:04', 1, 1, '803081', 'my shop', NULL, 1),
(218, 'sweatshirt', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 14:36:09', '2022-12-15 14:36:09', 1, 1, '803081', 'my shop', NULL, 1),
(219, 'shirt', 'girls wear', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>Bananya oversized printed cotton-jersey hoodie</li></ul>', 'Cloth', 'HM', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"header\": \"storage\", \"description\": \"152gb\"}, {\"header\": \"storage\", \"description\": \"122gb\"}]', '11', '10', '11', '2', NULL, NULL, '22', '2022-12-15 14:37:49', '2022-12-15 14:37:49', 1, 1, '803081', 'my shop', '4.5', 1),
(220, 'myproduct5', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct1', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', '1', '1', '36', '2022-12-15 16:40:20', '2022-12-15 16:40:20', 1, 36, '111000', 'shopone', '5', 1),
(221, 'myproduct6', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', '2', '2', '36', '2022-12-15 16:40:21', '2022-12-15 16:40:21', 1, 36, '222000', 'shoptwo', '3', 1),
(222, 'myproduct7', 'myproduct_slug', 'myproduct_store_name', 'myproduct', 'myproduct4', 'myproduct', 'myproduct', 'myproduct', 'myproduct', 'myproduct', '\"[{“name”:”mayur”}]\"', 'myproduct', 'myproduct', 'myproduct', '36', '5', '5', '36', '2022-12-15 16:40:21', '2022-12-15 16:40:21', 1, 36, '333000', 'shopthree', '4', 1),
(223, 'mayurchkkkkkkkkk', 'bade78', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mamaearth', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"jj\": \"mm\"}, {\"kk\": \"koo\"}]', '11', '10', '11', '5', '2.5', '2.5', '22', '2022-12-15 16:44:40', '2022-12-15 16:44:40', 1, 1, '803082', 'my shop', '3.5', 1),
(224, 'ghee', 'this is best in the world', 'we2code Electronic agancy indore', '', 'Food', 'sketchers', '', '52', '', '', '[]', '10', '3', '1', '14', 'undefined', 'undefined', '56', '2022-12-26 14:49:59', '2022-12-26 14:49:59', 1, 0, '2', 'my shop', NULL, 1),
(225, 'Leafy Greens', 'food', 'Organic Food Business', '<p>gggggdg</p>', 'Food', 'mamaearth', '', '73', 'undefined', '<p>,mmnn mlklkkdnkfdmcyle</p>', '[]', '10', '5', '2', '2', 'undefined', 'undefined', '8', '2022-12-27 11:29:14', '2022-12-27 11:29:14', 1, 0, '2', 'my shop', NULL, 1),
(226, 'retnig_vendore_chek333', 'lether belt', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'gucchi', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"jj\": \"mm\"}, {\"kk\": \"koo\"}]', '11', '10', '11', '2', 'undefined', 'undefined', '22', '2022-12-28 16:48:51', '2022-12-28 16:48:51', 1, 1, '803082', 'my shop', NULL, 1),
(227, 'retnig_vendore_chek333', 'lether jacket', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'armani', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"jj\": \"mm\"}, {\"kk\": \"koo\"}]', '11', '10', '11', '2', 'undefined', 'undefined', '22', '2022-12-28 16:49:19', '2022-12-28 16:49:19', 1, 1, '803082', 'my shop', NULL, 0),
(228, 'shendal', 'shendal', 'w2c_store_mumbasa', '<ul><li>dsc</li><li>fgdf</li></ul>', 'Foods', 'mochi', 'Drinks', 'Fresh', 'kloik', '<p>hey guddu rangeel</p>', '[{\"jj\": \"mm\"}, {\"kk\": \"koo\"}]', '11', '10', '11', '2', 'undefined', 'undefined', '22', '2022-12-28 16:51:52', '2022-12-28 16:51:52', 1, 1, '803082', 'my shop', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `products_pricing`
--

CREATE TABLE `products_pricing` (
  `id` int(11) NOT NULL,
  `product_id` int(25) NOT NULL,
  `colors` varchar(255) DEFAULT NULL,
  `size` varchar(225) DEFAULT NULL,
  `mrp` double NOT NULL,
  `product_price` double NOT NULL,
  `sale_price` double DEFAULT NULL,
  `discount` varchar(255) DEFAULT NULL,
  `manufacturing_date` varchar(25) NOT NULL,
  `expire_date` varchar(25) NOT NULL,
  `special_offer` tinyint(1) NOT NULL,
  `featured_product` tinyint(1) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `unit_quantity` varchar(255) DEFAULT NULL,
  `quantity` int(255) DEFAULT NULL,
  `is_delete` varchar(255) NOT NULL DEFAULT '1',
  `product_status` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products_pricing`
--

INSERT INTO `products_pricing` (`id`, `product_id`, `colors`, `size`, `mrp`, `product_price`, `sale_price`, `discount`, `manufacturing_date`, `expire_date`, `special_offer`, `featured_product`, `unit`, `unit_quantity`, `quantity`, `is_delete`, `product_status`) VALUES
(11, 43, 'qqqqqqqqqqqqqqqqqqqqqqq', 'qqqqqqqqqqqqqqqqqqqqqqq', 1e15, 6.6666666666666664e16, 2e17, '10000000000000', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(12, 43, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(13, 43, 'Red', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 25, '1', ''),
(14, 43, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(15, 43, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(16, 43, 'green', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(17, 44, 'Red', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', '33'),
(18, 44, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(19, 44, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(20, 44, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(21, 44, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(22, 44, 'green', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(23, 45, 'Red', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(24, 45, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(25, 45, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(26, 45, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(27, 45, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(28, 45, 'green', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(29, 46, 'Red', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, '1', ''),
(30, 46, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, 'no', ''),
(31, 46, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, 'no', ''),
(32, 46, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, 'no', ''),
(33, 46, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, 'no', ''),
(34, 46, 'green', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', NULL, 50, 'no', ''),
(35, 1, 'black', '24', 345, 2000, 1500, '500', 'sda', '30-12-2022', 0, 0, '11', '11', 11, 'no', ''),
(36, 48, 'Red', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(37, 48, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(38, 48, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(39, 48, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(40, 48, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(41, 48, 'green', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(48, 50, 'brown', 'xl', 400, 500, 300, '10', '2022-11-24', '2022-11-30', 0, 0, 'pcs', 'undefined', 200, 'no', ''),
(49, 51, 'brown', 'xl', 230, 100, 200, '20', '2022-11-24', '2022-11-30', 0, 0, 'pcs', 'undefined', 2000, 'no', ''),
(50, 52, 'brown', 'xl', 230, 100, 200, '20', '2022-11-24', '2022-11-30', 0, 0, 'pcs', 'undefined', 2000, 'no', ''),
(51, 55, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 0, 0, 'pcs', 'undefined', 200, 'no', ''),
(52, 57, 'red', 'xl', 112, 40, 200, '10', '2022-11-24', '2022-11-30', 0, 0, 'pcs', 'undefined', 2500, 'no', ''),
(53, 58, 'undefined', 'undefined', 100, 500, 20, '1', '2022-11-18', '2022-11-29', 0, 0, 'gm', '500', 200, 'no', ''),
(54, 60, 'white', 'xxl', 500, 400, 500, '10', '12-10-2022', '12-10-2022', 1, 1, 'gms', '500', 50, '0', ''),
(55, 60, 'red', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'gms', '10', 50, '0', ''),
(56, 60, 'black', 'xxl', 500, 500, 500, '10', '12-10-2022', '12-10-2022', 1, 0, 'pcs', '10', 10, 'no', ''),
(57, 60, 'blue', 's', 500, 400, 500, '11', '12-10-2022', '12-10-2022', 1, 1, 'pcs', '10', 50, 'no', ''),
(58, 60, 'yellow', 'xl', 500, 400, 500, '1', '12-10-2022', '12-10-2022', 1, 1, 'pcs', '10', 50, '0', ''),
(59, 60, 'green', 'xs', 500, 400, 500, '12', '12-10-2022', '12-10-2022', 1, 0, 'pcs', '10', 50, 'no', ''),
(60, 61, 'Red', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, '0', ''),
(61, 61, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, '0', ''),
(62, 61, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, '0', ''),
(63, 61, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(64, 61, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, '0', ''),
(65, 61, 'green', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(66, 62, 'Red', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(67, 62, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(68, 62, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(69, 62, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(70, 62, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(71, 62, '100', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(72, 63, 'Red', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(73, 63, 'white', 'm', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(74, 63, 'black', 'xxl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(75, 63, 'blue', 's', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(76, 63, 'yellow', 'xl', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(77, 63, '100', 'l', 500, 400, 500, '0', '12-10-2022', '12-10-2022', 0, 0, 'pcs', '10', 50, 'no', ''),
(88, 70, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, 'no', ''),
(89, 71, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, 'no', ''),
(90, 71, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, 'no', ''),
(91, 72, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, 'no', ''),
(92, 72, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, 'no', ''),
(93, 73, '', '', 400, 500, 300, '10', '2022-11-25', '2022-11-30', 1, 1, 'gm', '500', 12, 'no', ''),
(94, 74, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, 'no', '1'),
(95, 74, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, 'no', '1'),
(96, 75, '', '', 11, 2, 12, '21', '2022-11-25', '2022-11-27', 1, 1, 'gms', '200', 100, '0', ''),
(97, 76, 'dfgvds', '2', 12, 41204, 2, '2', '2022-11-30', '2022-11-18', 1, 1, 'pcs', '', 22, 'no', ''),
(98, 76, 'dfgvds', '2', 12, 41204, 2, '2', '2022-11-30', '2022-11-18', 1, 1, 'pcs', '', 24, '0', ''),
(99, 77, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 72, '1', '1'),
(100, 77, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(101, 43, 'dgsgrggf', 'gsdx', 1000000, 666666, 0, '100000', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, 'no', '1'),
(102, 78, '', '', 111, 200, 12, '1', '2022-11-28', '2022-11-30', 1, 1, 'gm', '10', 200, 'no', '1'),
(103, 79, '', '', 111, 500, 12, '1', '2022-11-28', '2022-11-30', 1, 1, 'gm', '500', 200, 'no', '1'),
(104, 80, '', '', 111, 500, 12, '1', '2022-11-28', '2022-11-30', 1, 1, 'gm', '500', 200, 'no', '1'),
(105, 60, '', '', 88, 77, 99, '7', '2022-11-21', '2022-11-30', 0, 0, 'weight', '10', 777, '0', '1'),
(106, 60, '', '', 87, 777, 99, '7', '2022-11-21', '2022-11-30', 1, 1, 'gm', '100', 777, '0', '1'),
(107, 81, 'brown', 'xl', 1, 1, 1, '2', '2022-11-28', '2022-11-30', 1, 1, 'gm', '1', 11, 'no', '1'),
(110, 81, 'brown', 'xl', 1, 1, 1, '200', '2022-11-28', '2022-11-30', 1, 1, 'l', '1', 11, 'no', '1'),
(111, 60, '', '', 500, 200, 300, '11', '2022-11-01', '2022-11-30', 0, 0, 'weight', '111', 100, '0', '1'),
(112, 60, '', '', 52, 30, 98, '75', '2022-11-16', '2022-11-04', 0, 0, 'weight', '10', 45365, '0', '1'),
(113, 60, '', '452', 54274, 524, 524, '4', '2022-11-08', '2022-11-25', 0, 0, 'piece', '44', 44, 'no', '1'),
(116, 60, '', '', 252, 525, 654, '5', '2022-11-08', '2022-11-29', 1, 1, 'weight', '13', 11, '1', '1'),
(121, 60, '', '', 900, 800, 700, '10', '2022-11-15', '2022-11-29', 1, 1, 'gms', '44', 11, '1', '1'),
(138, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(139, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(140, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(144, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(145, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(146, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(150, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(151, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(152, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(153, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(154, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(158, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(159, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(160, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(164, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(165, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(166, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(170, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(171, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(172, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(176, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(177, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(178, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(182, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(183, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(184, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(236, 178, 'red', 'm', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(237, 178, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 4, '1', 'ok'),
(238, 178, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(239, 179, 'blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(240, 179, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(241, 180, 'sky blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '7', '7', 3, '1', 'ok'),
(242, 181, 'red', 'm', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(243, 181, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(244, 181, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(245, 182, 'blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(246, 182, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(247, 184, 'red', 'm', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(248, 184, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(249, 184, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(250, 185, 'blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(251, 185, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(252, 186, 'sky blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '7', '7', 3, '1', 'ok'),
(253, 187, 'red', 'm', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(254, 187, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(255, 187, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(256, 188, 'blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(257, 188, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(258, 189, 'sky blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '7', '7', 3, '1', 'ok'),
(259, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(260, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(261, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(262, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(263, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(264, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(265, 0, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(266, 0, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(267, 0, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(268, 190, 'red', 'm', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(269, 190, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(270, 190, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(271, 191, 'blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(272, 191, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(273, 192, 'sky blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '7', '7', 3, '1', 'ok'),
(274, 193, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(275, 193, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(276, 61, 'sdf', '20', 60, 400, 156, '10', '2022-11-29', '2022-12-17', 1, 1, 'gms', '50', 10, '1', '1'),
(277, 195, '', '', 700, 600, 80, '500', '2022-12-19', '2022-12-30', 1, 1, 'gm', '500', 11, '1', '1'),
(278, 196, '', '', 500, 100, 400, '30', '2022-12-10', '2022-12-30', 1, 1, 'gm', '111', 100, '1', '1'),
(282, 200, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(283, 200, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(284, 201, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(285, 201, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(286, 202, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(287, 202, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(288, 203, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(289, 203, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(290, 204, '', '', 500, 100, 400, '10', '2022-12-10', '2022-12-30', 1, 1, 'l', '120', 150, '1', '1'),
(291, 205, '', '', 1500, 12, 400, '20', '2022-12-10', '2022-12-31', 1, 1, 'pcs', '111', 500, '1', '1'),
(292, 206, '', '', 213, 233, 211, '11', '2022-12-10', '2022-12-31', 1, 1, 'l', '123', 233, '1', '1'),
(293, 207, '', '', 400, 100, 200, '10', '2022-12-10', '2022-12-31', 1, 1, 'pcs', '10', 500, '1', '1'),
(294, 208, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(295, 208, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(296, 2, '', '', 550, 305, 450, '3', '2022-12-10', '2022-12-31', 1, 1, 'l', '500', 111, '1', '1'),
(297, 60, '', '', 600, 125, 450, '70', '2022-12-10', '2022-12-30', 1, 1, 'l', '44', 11, '1', '1'),
(298, 60, '', '', 120, 320, 140, '1', '2022-12-10', '2022-12-31', 0, 1, 'piece', '10', 11, '1', '1'),
(299, 60, '', '', 650, 750, 450, '22', '2022-12-01', '2022-12-26', 0, 0, 'piece', '10', 11, '1', '1'),
(300, 209, 'black', 'xl', 1300, 1200, 1100, '100', '2022-12-13', '2022-12-24', 1, 1, 'pcs', '', 12, '1', '1'),
(301, 210, 'black', 'xl', 1300, 1200, 1100, '100', '2022-12-13', '2022-12-24', 1, 1, 'pcs', '', 12, '1', '1'),
(302, 211, 'black', 'xl', 1300, 1200, 1100, '100', '2022-12-13', '2022-12-24', 1, 1, 'pcs', '', 12, '1', '1'),
(303, 60, '', '', 450, 560, 770, '7', '2022-12-13', '2022-12-31', 0, 0, 'piece', '2', 11, '1', '1'),
(304, 61, 'greeny', 'xxl', 130, 120, 140, '1', '2022-12-12', '2022-12-31', 0, 0, 'piece', '12', 12, '1', '1'),
(305, 212, '', '', 120, 101, 30, '12', '2022-12-12', '2022-12-29', 1, 1, 'gm', '100', 100, '1', '1'),
(306, 213, 'red', 'xl', 1000, 1200, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 1, '0', '1'),
(307, 213, 'yellow', 'xxl', 1000, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(308, 213, 'black', 's', 1000, 900, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(309, 213, 'blue', 'xs', 1000, 1200, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(310, 213, 'green', 'l', 1000, 1300, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(311, 214, 'red', 'xl', 1200, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 1, '1', '1'),
(312, 214, 'yellow', 'xxl', 900, 1000, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(313, 214, 'black', 's', 1000, 900, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(314, 214, 'blue', 'xs', 1200, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(315, 214, 'green', 'l', 1300, 1000, 200, '30', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '0', '1'),
(316, 215, 'red', 'xl', 1200, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 1, '0', '1'),
(317, 216, 'black', 'xl', 1200, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 1, '0', '1'),
(318, 217, 'green', 's', 1200, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 1, '0', '1'),
(319, 218, 'red', 'xl', 1000, 1200, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 0, '1', '1'),
(320, 218, 'yellow', 'xxl', 1000, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(321, 218, 'black', 's', 1000, 900, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(322, 218, 'blue', 'xs', 1000, 1200, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(323, 218, 'green', 'l', 1000, 1300, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(324, 219, 'red', 'xl', 1000, 1200, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 1, '1', '1'),
(325, 219, 'yellow', 'xxl', 1000, 1000, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(326, 219, 'black', 's', 1000, 900, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(327, 219, 'blue', 'xs', 1000, 1200, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(328, 219, 'green', 'l', 1000, 1300, 200, '20', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(329, 220, 'red', 'm', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(330, 220, 'yellow', 'l', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(331, 220, 'pink', 'xl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '5', '5', 3, '1', 'ok'),
(332, 221, 'blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(333, 221, 'black', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '6', '6', 3, '1', 'ok'),
(334, 222, 'sky blue', 'xxl', 1000, 100, 1000, '10', '44604.22928240741', '44604.22928240741', 10, 0, '7', '7', 3, '1', 'ok'),
(335, 223, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(336, 223, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(337, 226, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '1'),
(338, 226, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(339, 227, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '0'),
(340, 227, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1'),
(341, 228, 'red', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '50', 200, '1', '0'),
(342, 228, 'yellow', 'xl', 100, 6, 200, '10', '2022-11-24', '2022-11-30', 1, 1, 'pcs', '20', 200, '1', '1');

-- --------------------------------------------------------

--
-- Stand-in structure for view `products_view`
-- (See below for the actual view)
--
CREATE TABLE `products_view` (
`id` int(11)
,`product_id` int(25)
,`product_title_name` varchar(255)
,`product_slug` varchar(255)
,`store_name` varchar(225)
,`product_description` varchar(225)
,`product_type` varchar(225)
,`brand` varchar(255)
,`category` varchar(225)
,`parent_category` varchar(225)
,`seo_tag` varchar(225)
,`other_introduction` varchar(225)
,`add_custom_input` json
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(225)
,`gst` varchar(255)
,`value_added_tax` varchar(255)
,`variety` tinyint(1)
,`vendor_id` varchar(255)
,`show_product_rating` tinyint(1)
,`shop` varchar(255)
,`rating` varchar(225)
,`colors` varchar(255)
,`size` varchar(225)
,`mrp` double
,`product_price` double
,`sale_price` double
,`discount` varchar(255)
,`manufacturing_date` varchar(25)
,`expire_date` varchar(25)
,`special_offer` tinyint(1)
,`featured_product` tinyint(1)
,`unit` varchar(255)
,`unit_quantity` varchar(255)
,`quantity` int(255)
,`is_delete` varchar(255)
,`product_status` varchar(255)
,`cgst` varchar(255)
,`sgst` varchar(255)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `products_view1`
-- (See below for the actual view)
--
CREATE TABLE `products_view1` (
`id` int(11)
,`product_id` int(25)
,`product_title_name` varchar(255)
,`product_slug` varchar(255)
,`store_name` varchar(225)
,`product_description` varchar(225)
,`product_type` varchar(225)
,`brand` varchar(255)
,`category` varchar(225)
,`parent_category` varchar(225)
,`seo_tag` varchar(225)
,`other_introduction` varchar(225)
,`add_custom_input` json
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(225)
,`gst` varchar(255)
,`value_added_tax` varchar(255)
,`variety` tinyint(1)
,`vendor_id` varchar(255)
,`shop` varchar(255)
,`rating` varchar(225)
,`colors` varchar(255)
,`size` varchar(225)
,`mrp` double
,`product_price` double
,`sale_price` double
,`discount` varchar(255)
,`manufacturing_date` varchar(25)
,`expire_date` varchar(25)
,`special_offer` tinyint(1)
,`featured_product` tinyint(1)
,`unit` varchar(255)
,`unit_quantity` varchar(255)
,`quantity` int(255)
,`is_delete` varchar(255)
,`product_status` varchar(255)
,`cgst` varchar(255)
,`sgst` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `user_id` int(25) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `product_id` int(25) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_type` varchar(255) NOT NULL,
  `review_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `review_rating` int(11) NOT NULL,
  `comment` varchar(2000) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `note` varchar(1000) DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `user_id`, `user_name`, `product_id`, `product_name`, `category_type`, `review_date`, `review_rating`, `comment`, `status`, `note`, `is_active`) VALUES
(1, 0, NULL, 0, 'abcdef', 'cloth', '2022-12-01 12:00:00', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'pending', 'hello', 0),
(2, 0, NULL, 0, 'abcdef', 'cloth', '2022-12-01 12:00:00', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'approve', 'null', 0),
(3, 41, 'mayur', 121, 'abcdef', 'cloth', '2022-12-26 18:22:41', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'pending', NULL, 0),
(4, 41, 'mayur', 121, 'abcdef', 'cloth', '2022-12-26 18:22:54', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'pending', NULL, 0),
(5, 70, 'mayur', 292, 'abcdef', 'cloth', '2022-12-26 18:23:40', 4, 'aaaaassrr', 'pending', NULL, 0),
(6, 70, 'mayur', 292, 'abcdef', 'cloth', '2022-12-26 18:26:43', 4, 'kjhjkhluh', 'pending', NULL, 0),
(7, 41, 'mayur', 121, 'abcdef', 'cloth', '2022-12-26 18:28:30', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'pending', NULL, 0),
(8, 70, 'mayur', 292, 'abcdef', 'cloth', '2022-12-26 18:29:59', 4, 'rrrrr', 'pending', NULL, 0),
(9, 70, 'mayur', 292, 'abcdef', 'cloth', '2022-12-26 18:31:13', 4, 'hhhhhhh', 'pending', NULL, 0),
(10, 41, 'mayur', 121, 'abcdef', 'cloth', '2022-12-27 10:01:42', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'pending', 'nullhgj', 0),
(11, 41, 'mayur', 123, 'abcdef', 'cloth', '2023-01-01 00:00:00', 4, 'dsadklsadhhsdjkhsajkdhkb bjdsabjbdj bdhsjkajdhjksahdjh jbhjkhdjkdhsajkhdjk bjkhjkhjkhdsa bhjkhdjksajkhddjh jhjkhjkhjkhjihds jbhnjkjkhjkhnd', 'pending', NULL, 0),
(12, 70, 'mayur', 241, 'wood chair', 'cloth', '2022-12-28 00:00:00', 4, 'good product', 'pending', NULL, 0),
(13, 70, 'mayur', 241, 'food', 'cloth', '2022-12-28 00:00:00', 4, 'hjfghfdgdfddd', 'pending', NULL, 0),
(14, 70, 'mayur', 241, 'electronic', 'cloth', '2022-12-08 00:00:00', 4, 'good', 'pending', NULL, 0),
(15, 70, 'mayur', 324, 'toy', 'cloth', '2022-12-01 00:00:00', 4, 'nice', 'pending', NULL, 0),
(16, 70, 'mayur', 236, 'a', 'cloth', '2022-12-01 00:00:00', 4, 'Sit back, relax, and visualize your future Products - don’t worry you have our permission. How would you describe what you’re seeing?', 'pending', NULL, 0),
(17, 70, 'mayur', 236, 'rrr', 'cloth', '2023-01-01 00:00:00', 4, 'Sit back, relax, and visualize your future Products - don’t worry you have our permission. How would you describe what you’re seeing', 'pending', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `invoice_no` varchar(255) NOT NULL,
  `transaction_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` varchar(255) NOT NULL,
  `method` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `c_number` varchar(255) NOT NULL,
  `exp_month` varchar(225) NOT NULL,
  `exp_year` varchar(255) NOT NULL,
  `receipt_url` varchar(255) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `payment_id`, `order_id`, `invoice_no`, `transaction_date`, `amount`, `method`, `status`, `name`, `c_number`, `exp_month`, `exp_year`, `receipt_url`, `currency`, `brand`, `country`) VALUES
(1, '123554894JHFGHGF', '10', '100004', '2022-12-10 10:15:51', '15000', 'UPI', 'pending', '', '', '', '', '', '', '', ''),
(2, '56516165614JHFGHGF', '10', '100005', '2022-12-10 10:15:51', '200000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(3, 'hhfghfghfgh36546', '11', '100005', '2022-12-10 10:15:51', '200000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(4, 'rewrewr45543545', '11', '100005', '2022-12-10 10:15:51', '200000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(5, '534345435', '11', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(6, 'hgfh35365', '12', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(7, 'utyuyfh35365', '12', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(8, '6586543jhjhjghj', '12', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(9, 'nvbnbvngh543654654', '13', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(10, '43423445432543hgjgh', '13', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(11, 'undefined', 'undefined', 'undefined', '2022-12-10 10:15:51', 'undefined', 'undefined', 'undefined', '', '', '', '', '', '', '', ''),
(12, 'undefined', 'undefined', 'undefined', '2022-12-10 10:15:51', 'undefined', 'undefined', 'active', '', '', '', '', '', '', '', ''),
(13, '43423445432543hgjgh', '11', '50500', '2022-12-10 10:15:51', '58570000', 'Card', 'pending', '', '', '', '', '', '', '', ''),
(14, '43423445432543hgkkkljlji', '12', '5050', '2022-12-10 10:15:51', '58570', 'Upi', 'active', '', '', '', '', '', '', '', ''),
(15, '43423445432543hgkkkljlji', '12', '5050', '2022-12-10 10:15:51', '58570', 'Upi', 'active', '', '', '', '', '', '', '', ''),
(16, 'ch_3MDMt2Eu1FBdOEuw0xhHJnSo', '123456654123', 'inv123456', '2022-12-10 12:20:17', '150000', 'card', 'succeeded', 'mayur', '4242', '12', '2034', 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTEw0UDNFdTFGQmRPRXV3KKjY0JwGMgb1nKU80os6LBZUi50cDLRURRF3GJ-dErEz9tzEsSiYxQPVT6bXh3pK5iTY_33IAX1B4tYx', 'usd', 'visa', 'US'),
(17, 'ch_3MDMvtEu1FBdOEuw1DAOdxXI', '123456654123', 'inv123456', '2022-12-10 12:23:14', '150000', 'card', 'succeeded', 'mayur', '4242', '12', '2034', 'https://pay.stripe.com/receipts/payment/CAcaFwoVYWNjdF8xTEw0UDNFdTFGQmRPRXV3KNrZ0JwGMgagvfcKxaI6LBZMiCM2T6Xwtdk5R4GC3oG9XcmhB4PmoA6EDKiFUjVBL1hPkugGvJBuoBDg', 'usd', 'visa', 'US');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(25) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` text,
  `password` varchar(255) DEFAULT NULL,
  `phone_no` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `address2` varchar(500) DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `email`, `password`, `phone_no`, `gender`, `date_of_birth`, `address`, `address2`, `created_on`, `updated_on`) VALUES
(1, 'mayur', 'yadav', 'ashish.we2code@gmail.com', '21213778', '2121378943', 'male', '1999-07-30', 'indore', 'indore banganga', '2022-11-16 16:27:26', '2022-11-16 16:27:26'),
(22, NULL, NULL, 'raj.e2code@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-11-23 17:46:13', '2022-11-23 17:46:13'),
(23, NULL, NULL, 'mayuimrgk@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 16:29:07', '2022-12-13 16:29:07'),
(25, NULL, NULL, 'mayur1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 16:48:08', '2022-12-13 16:48:08'),
(26, NULL, NULL, 'test@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 16:49:04', '2022-12-13 16:49:04'),
(27, NULL, NULL, 'text3@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 16:52:44', '2022-12-13 16:52:44'),
(28, NULL, NULL, 'mayur1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:00:29', '2022-12-13 17:00:29'),
(29, NULL, NULL, 'mayur1@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:00:32', '2022-12-13 17:00:32'),
(30, NULL, NULL, 'bhavna@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:39:01', '2022-12-13 17:39:01'),
(31, NULL, NULL, 'bhavna@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:41:14', '2022-12-13 17:41:14'),
(32, NULL, NULL, 'bhavna@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-13 17:41:40', '2022-12-13 17:41:40'),
(33, 'test', 'kumar', 'viji@gmail.com', '$2b$10$XWhBe93H4pWZH.8e9uk7S.IqOCjNJfqmNKlUdvDQXOg9p7iq44Eia', '8586655458', 'Male', '2022-12-02', 'dddgtrgrh', ' QV3V+M2F, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010', '2022-12-13 17:43:30', '2022-12-13 17:43:30'),
(34, 'mayuryadavvv11', 'yadavmayur', 'mayuryadav@gmail.com', '$2b$10$SEme2.WzIYVqWZW9l9QhAujS6kcWNoNomuHGufM5iwf7yDP9Khfp.', '9827803082', 'male', '1999-07-30', 'indore', 'indore 78', '2022-12-14 11:18:56', '2022-12-14 11:18:56'),
(35, NULL, NULL, 'shiv@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, '2022-12-14 14:11:08', '2022-12-14 14:11:08'),
(36, 'vijendra', 'patel', 'vijendra@gmail.com', '$2b$10$RUjOdZtgN46SXmmeN6STh.YFW2RDrlfWR9XMg7xT7E/wCOEg785u2', '9898985652', 'Male', '2022-12-01', 'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678', ' QV3V+M2F, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010', '2022-12-14 14:13:42', '2022-12-14 14:13:42'),
(37, 'rahul', 'verma', 'raahulverma106@gmail.com', '$2b$10$uEBRca040SABg..ypyaoOO9IZeDN4AlZNxDxdct2PWUSj5J0VXfEK', '595985959', 'Male', '2022-12-01', 'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678', 'ujjain', '2022-12-14 15:02:59', '2022-12-14 15:02:59'),
(38, 'mayuryadavvv11', 'yadavmayur', 'mayuryadavvv@gmail.com', '$2b$10$NCJV0.J6Dxu5omklp6IJc.5aVpDAmzt7Y4pR1jR34C3iuLRBy9gPO', '9827803082', 'male', '1999-07-30', 'indore', 'indore 78', '2022-12-15 10:27:12', '2022-12-15 10:27:12'),
(39, 'ashish', 'patidar', 'ashish@gmail.com', NULL, '76565685656', 'Female', '2022-12-01', 'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678', ' QV3V+M2F, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010', '2022-12-15 11:56:08', '2022-12-15 11:56:08'),
(40, NULL, NULL, 'mayuryadavvv@gmail.com', '123654789', NULL, NULL, NULL, NULL, NULL, '2022-12-15 12:20:25', '2022-12-15 12:20:25'),
(41, 'mayuryadavvv11', 'yadavmayur', 'mayuryadav777@gmail.com', '$2b$10$ytN2bG3NEsmmzLr31hvFcu3eyKzYyLlxReWxXOWzsy.k0pTZmidlO', '9827803082', 'male', '1999-07-30', 'indore', 'indore 78', '2022-12-15 12:36:41', '2022-12-15 12:36:41'),
(43, 'shivani', 'kirar', 'apna1@gmail.com', '$2b$10$qheWaUqqajimniRhnHnMqur4Z59GtsrLl4jBBuiv.2JkFq4H7l8Ym', '9895621452', 'Female', '1998-01-13', 'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678', ' QV3V+M2F, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010', '2022-12-15 14:05:42', '2022-12-15 14:05:42'),
(44, NULL, NULL, 'arfgd7@gmail.com', '$2b$10$RrvyFyS7OxPD4kTVVU1gEeHrfarOPIQGOeIMOftEBgAreTudsp0Wi', NULL, NULL, NULL, NULL, NULL, '2022-12-15 14:50:48', '2022-12-15 14:50:48'),
(45, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$nKtX0/PYlqkmAxPCPRu29OsYIxY5hQcujwotQ9zysafcnjtEBlcIC', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:28:53', '2022-12-16 14:28:53'),
(46, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$ZA/eVMqhJDaNtQqtO1XD8OnkMOMtYl5xtHiwUT6GKtdurRMnZW6Zi', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:39:05', '2022-12-16 14:39:05'),
(47, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$q8.R474gYAo0ZzWGiMHtgOvVrjv.Q6eHDNS4WqakffaAbReoRzaU.', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:51:51', '2022-12-16 14:51:51'),
(48, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$piH.liaAzU1vpx287OCwEOMLcvA2/iVQSub37hjND91g7zXHoy1uS', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:51:59', '2022-12-16 14:51:59'),
(49, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$UUNYd81EWERuYHetxM9lfOmCYQiwYK75u1yB/IXLMgi.eJHKLFiD6', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:52:29', '2022-12-16 14:52:29'),
(50, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$AYfhJkDdwSrWrcyk5tz62usQ/XzmbLZnGrC2lENwmmFHmzqRqT32q', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:52:39', '2022-12-16 14:52:39'),
(51, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$rxdzBRH5G4YydyGDweRKHeaM16UpKcpDI3ItsKXPnXwiHAVe1uStW', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:52:46', '2022-12-16 14:52:46'),
(52, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$DKhx/neJfayeFC4mCdtbDOgvh52It8DrrYDcYgX.O7Uuj/qSTQrr.', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:52:55', '2022-12-16 14:52:55'),
(53, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$hhz3Deds7bUmWbyjlMuAN.PxY0B9N2invo3tK6OfNszZa.Fvp31Um', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:53:03', '2022-12-16 14:53:03'),
(54, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$R1QGMi0ZvigDtNx4DBGDY.6/uHGHK8iM5HXKKc3AbIYwj9zBQWMcK', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:53:10', '2022-12-16 14:53:10'),
(55, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$18M.hRUA2218vuKnEe9UxuuFhbCCDWWC2fkRJ/uNncg3mXECWwWh6', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:53:52', '2022-12-16 14:53:52'),
(56, 'jatin11', 'pandit', 'hhhhhh777@gmail.com', '$2b$10$.0wzQMuqkhZnwJPFyGtiF.yLwAOejVd/SRo8Yh0OP4b6CNgfKEx8O', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 14:54:01', '2022-12-16 14:54:01'),
(57, 'jatin11', 'pandit', 'mayurvb@gmail.com', '$2b$10$k0zBouciNaiIpg16yIivc.wCrAcVpUjNgtNARyI90cyYWTBRI/hR6', '9827803024', 'male', '1999-08-30', 'indore', 'indore 78', '2022-12-16 15:17:48', '2022-12-16 15:17:48'),
(58, NULL, NULL, 'new@gmail.com', '$2b$10$WXPkt6GGBmPpXdn3vcvMA.ol8G0CwDyz5hUimBju3Z8iWozMdbwGi', NULL, NULL, NULL, NULL, NULL, '2022-12-17 14:15:16', '2022-12-17 14:15:16'),
(59, NULL, NULL, 'mayuryadav777@gmail.com', '$2b$10$BJxabIrMxGd78vQkEITdoOBKw4womLZFEW/3ZSHUWrW8DGudUuoLK', NULL, NULL, NULL, NULL, NULL, '2022-12-17 15:06:22', '2022-12-17 15:06:22'),
(60, NULL, NULL, 'amit@gmail.com', '$2b$10$4TPfJIVs5O1qZvAG1k7Wx.iIDtbIRwD24xgtb2FIkuJIV8Qy01cm.', NULL, NULL, NULL, NULL, NULL, '2022-12-17 15:14:07', '2022-12-17 15:14:07'),
(61, 'Neha', ' Sharma', 'bhavna810@gmail.com', '$2b$10$ZRzr00IXc1IdGIOinHgQDOnl10AizQrGWCq67nrSO2YVUOxjtAPHS', '9131456387', 'Female', '1999-01-01', 'Indore', 'Khandwa', '2022-12-19 11:15:54', '2022-12-19 11:15:54'),
(62, 'Vivek', 'Chaiwala', 'vivek@gmail.com', '$2b$10$X62JThdt0RMJbxuhvtTBk..S09xoieqBCLPLkLi3ed4KXPrKVtT5C', '65465656', 'Male', '2022-12-01', 'dfbhgtfhjykhuj', 'nhjgjyghkjh', '2022-12-21 14:46:32', '2022-12-21 14:46:32'),
(63, NULL, NULL, 'gaurav@gmail.com', '$2b$10$dxmMqfid4fxI72dDQ5ptUeDNjOBIKTZQ2KCMS9fv1a6Dp4tmjp6H.', NULL, NULL, NULL, NULL, NULL, '2022-12-22 12:10:48', '2022-12-22 12:10:48'),
(64, 'neha', 'sharma', 'neha@gmail.com', '$2b$10$fb8srfNvl6VgFzYH2ott5OXEOQTv5k1qGnCQkND0kUEYTYma76wl6', '45656546', 'Female', '2022-12-01', 'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678', ' QV3V+M2F, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010', '2022-12-22 17:30:58', '2022-12-22 17:30:58'),
(65, NULL, NULL, 'mayur_ahir@gmail.com', '$2b$10$oiOjvIIKr28mLRh.CRuLFeQbTF5yHmbiqdBQoytKkgqtV2Sg.7Y1K', NULL, NULL, NULL, NULL, NULL, '2022-12-22 17:32:17', '2022-12-22 17:32:17'),
(66, NULL, NULL, 'aaa@gmail.com', '$2b$10$ZxnVYwMj53JyFU8cbb5RTupNFwWRrn3KQjIRh6zR3jxhrIcppwsJm', NULL, NULL, NULL, NULL, NULL, '2022-12-22 18:25:51', '2022-12-22 18:25:51'),
(67, NULL, NULL, 'rohit@gmail.com', '$2b$10$BWc2qVWEZJQxn4Ul0vDkL.zbwseVFiFNdIj8OHgjTPHQ1vb9USUNm', NULL, NULL, NULL, NULL, NULL, '2022-12-23 10:01:39', '2022-12-23 10:01:39'),
(68, NULL, NULL, 'ujghjubhkjhkjm@gmail.com', '$2b$10$JhcbkkNchi5J62BcwuY2beil980Ot8Gj9UJGKUMvXNoQKW9/Tdsxa', NULL, NULL, NULL, NULL, NULL, '2022-12-23 10:23:51', '2022-12-23 10:23:51'),
(69, 'jyoti', 'kumar', 'jyoti@gmail.com', '$2b$10$OYQ2mYfNK8M6ws1TWDPDaeugrmBco8P8xB4N4w.7giK1rMj6KOfKC', '5974656154', 'Female', '2022-12-01', 'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678', ' QV3V+M2F, Vijay Nagar Square, Vijay Nagar, Indore, Madhya Pradesh 452010', '2022-12-23 12:57:18', '2022-12-23 12:57:18'),
(70, NULL, NULL, 'divya@gmail.com', '$2b$10$08VCxLgkRSYnvgyLpdN2CemaPFNPdwuADgbmHFbUjvAS/v9nSRUn.', NULL, NULL, NULL, NULL, NULL, '2022-12-23 15:06:57', '2022-12-23 15:06:57'),
(71, NULL, NULL, 'vidhi@gmail.com', '$2b$10$PXUdmwEquYhvopGKQ/g.L.TknC9L9jy2LeH4irWG0hj5Yg7x7fggC', NULL, NULL, NULL, NULL, NULL, '2022-12-23 17:30:27', '2022-12-23 17:30:27');

-- --------------------------------------------------------

--
-- Table structure for table `users_otp`
--

CREATE TABLE `users_otp` (
  `id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `otp` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_otp`
--

INSERT INTO `users_otp` (`id`, `email`, `otp`) VALUES
(1, 'mayurIKJUH@gmail.com', 293735);

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor` (
  `id` int(11) NOT NULL,
  `owner_name` varchar(255) DEFAULT NULL,
  `shop_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `shop_address` varchar(255) DEFAULT NULL,
  `gstn` varchar(255) DEFAULT NULL,
  `geolocation` varchar(500) DEFAULT NULL,
  `store_type` varchar(255) DEFAULT NULL,
  `shop_logo` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `multiple_document_upload` text,
  `document_name` text,
  `is_active` int(11) NOT NULL DEFAULT '1',
  `availability` varchar(255) DEFAULT NULL,
  `social_media_links` text,
  `show_product_rating` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vendor`
--

INSERT INTO `vendor` (`id`, `owner_name`, `shop_name`, `mobile`, `email`, `shop_address`, `gstn`, `geolocation`, `store_type`, `shop_logo`, `status`, `multiple_document_upload`, `document_name`, `is_active`, `availability`, `social_media_links`, `show_product_rating`) VALUES
(1, 'Ashish', 'bata', '9754869920', 'ashish.we2code@gmail.com', 'indore india', 'ABCD123456', 'indore', 'shoese', 'public/catgory_images/image-1669273868079.jpg', 'pending', '[\"image-1669273868079.jpg\", \"image-1669273868079.jpg\"]', '[\"pancard\", \"aadharcard\"]', 0, 'block', NULL, 1),
(2, 'ayur', 'peter england', '9754869920', 'mayur.we2code@gmail.com', 'indore india', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1669273868079.jpg', 'pending', '[\"image-1669273868079.jpg\", \"image-1669273868079.jpg\"]', '[\"pancard\", \"aadharcard\", \"Gumasta\"]', 0, 'delete', NULL, 1),
(3, 'shiv', 'shvivi england', '9754869920', 'shvivi.we2code@gmail.com', 'indore india', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1669273868079.jpg', 'pending', '[\"image-1669273868079.jpg\", \"image-1669273868079.jpg\"]', '[\"pancard\", \"aadharcard\", \"Gumasta\"]', 0, 'close', NULL, 1),
(4, 'vijendra', 'w2c lapsi', '452635353', 'bhavnaraut@gmail.com', 'Cecilia Chapman\n711-2880 Nulla St.\nMankato Mississippi 96522\n(257) 563-7401\nIris Watson', '5324563', 'Iris Watson P.O. Box 283 8562 Fusce Rd. Frederick Nebraska 20620 (372) 587-2335', 'shoese', '', 'active', '\"[]\"', '[\"hello\", \"ghfgh\", \"hey\"]', 0, 'update', NULL, 1),
(5, 'mayurmmm', 'mayur england', '9754869920', 'bhavna.we2code@gmail.com', 'indore india', 'ABCDEFG123456789', 'indore', 'Cloths', 'public/catgory_images/image-1670577355477.png', 'pending', '\"public/catgory_images/image-1670577355478.png\"', '\"[\"pancard\",\"aadharcard\"]\"', 0, 'close', NULL, 1),
(6, 'Shivani', 'peter england', '9754869920', 'Shivani.we2code@gmail.com', 'indore india', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1669273868079.jpg', 'pending', '[\"image-1669273868079.jpg\"]', '[\"pancard\"]', 0, 'update', NULL, 1),
(7, 'hello', 'spritlike', '995965454', 'atsush@gmail.com', 'rgrdfgdfgdf', '5324563', 'Iris Watson P.O. Box 283 8562 Fusce Rd. Frederick Nebraska 20620 (372) 587-2335', 'shoese', '', 'active', '[\"https://images.pexels.com/photos/13316720/pexels-photo-13316720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1\"]', '[\"hey\"]', 0, 'update', NULL, 1),
(8, 'vijendra', 'w2c lapsi', '5415626256', 'sdd@thgh.com', 'sdcsf', '5324563', 'Iris Watson P.O. Box 283 8562 Fusce Rd. Frederick Nebraska 20620 (372) 587-2335 Celeste Slater', 'shoese', 'public/catgory_images/image-1670325376469.jpeg', 'active', '\"public/catgory_images/image-1670325376478.jpeg\"', '\"456,fdfcds\"', 0, 'undefined', NULL, 1),
(9, 'vijendra', 'cfds', '89678967896', 'atsush@fdfgfd.com', '8u89yu8i', '5324563', 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522', 'shoese', 'public/catgory_images/image-1670325500780.jpeg', 'pending', '\"public/catgory_images/image-1670325500785.jpg\"', '\"857,olujo\"', 0, 'undefined', NULL, 1),
(10, 'vivivivi', 'beerbar', '332323', 'shivanik.we2code@gmail.com', '232323', '2323we232323', '2433434', 'Cloths', 'public/catgory_images/image-1670329924790.jpeg', 'in progress', '\"public/catgory_images/image-1670329924794.jpeg\"', '\"hyyyy,nyyyyy,hhhhh\"', 0, 'undefined', NULL, 1),
(11, 'shivani', 'spritlike', '546345634563', 'vijendrawe2code@gmail.com', '563546345jkhjik', '5324563', 'Iris Watson P.O. Box 283 8562 Fusce Rd. Frederick Nebraska 20620 (372) 587-2335 Celeste Slater', 'Cloths', 'public/catgory_images/image-1670577657690.jpeg', 'active', '\"public/catgory_images/image-1670577657701.jpeg\"', '\"\"hello,thytgrfy\"\"', 1, 'update', NULL, 1),
(12, 'myadav123', 'maayur_england', '9754869920', 'mayur.we2code123@gmail.com', 'indore', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1671871298146.jpeg', 'pending', '\"public/catgory_images/image-1671871298147.png\"', '\"pancard\"', 1, 'close', NULL, 1),
(13, 'Bhavna Raut', 'Apna organic', '1456432154545', 'bhavnaraut@gmail.com', 'fgfgdf', '45', 'khandwa', 'shoese', 'public/catgory_images/image-1672202958472.png', 'active', '\"public/catgory_images/image-1672202958500.png\"', '\"fgd\"', 1, 'block,block', NULL, 0),
(16, 'myadav123', 'maayur_england', '9754869920', 'mayur.we2code123@gmail.com', 'indore', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1672295425388.jpeg', 'pending', '\"public/catgory_images/image-1672295425389.png\"', '\"pancard\"', 1, 'close', '[object Object]', 1),
(17, 'myadav123', 'maayur_england', '9754869920', 'mayur.we2code123@gmail.com', 'indore', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1672296536484.jpeg', 'pending', '\"public/catgory_images/image-1672296536486.png\"', '\"pancard\"', 1, 'close', '[{\"twitter\":\"tttwwwiiitttttterrrrr\",\"facebook\":\"ffffaaacceebbbooookk\"}]', 1),
(18, 'myada7777', 'maayur_england', '9754869920', 'mayur.we2code123@gmail.com', 'indore', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1672297853627.jpeg', 'pending', '\"public/catgory_images/image-1672297853627.png\"', '\"pancard\"', 1, 'close', '[{\"insta\":\"tttwwwiiitttttterrrrr\",\"facebook\":\"ffffaaacceebbbooookk\"}]', 1),
(19, 'myada7777', 'maayur_england', '9754869920', 'mayur.we2code123@gmail.com', 'indore', 'ABCDEFG123456', 'indore', 'Cloths', 'public/catgory_images/image-1672302918400.jpeg', 'pending', '\"public/catgory_images/image-1672302918401.png\"', '\"pancard\"', 1, 'close', '[{\"insta\":\"tttwwwiiitttttterrrrr\",\"facebook\":\"ffffaaacceebbbooookk\"}]', 1);

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `product_id` varchar(225) NOT NULL,
  `is_active` varchar(255) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `is_active`) VALUES
(55, '33', '99', '1'),
(56, '33', '99', '1'),
(72, '36', '297', '1'),
(73, '36', '297', '1'),
(79, '2', '236', '1'),
(80, '39', '14', '1'),
(81, '39', '15', '1'),
(82, '39', '16', '1'),
(83, '39', '14', '1'),
(85, '41', '306', '1'),
(86, '43', '306', '1'),
(87, '43', '308', '1'),
(88, '43', '310', '1'),
(91, '43', '201', '1'),
(92, '43', '205', '1'),
(93, '43', '297', '1'),
(94, '43', '296', '1'),
(95, '43', '286', '1'),
(96, '36', '55', '1'),
(97, '43', '336', '1'),
(98, '43', '334', '1'),
(100, 'null', '116', '1'),
(101, 'null', '99', '1'),
(102, 'null', '99', '1'),
(103, 'null', '100', '1'),
(104, 'null', '273', '1'),
(105, 'null', '274', '1'),
(108, 'null', '311', '1'),
(109, 'null', '100', '1'),
(110, 'undefined', '240', '1'),
(121, '60', '240', '1'),
(123, '60', '254', '1'),
(125, '60', '243', '1'),
(157, '60', '99', '1'),
(158, '41', '240', '1'),
(159, '41', '333', '1'),
(183, '41', '336', '1'),
(189, 'undefined', '256', '1'),
(190, 'undefined', '100', '1'),
(191, '61', '237', '1'),
(192, '61', '239', '1'),
(193, '61', '236', '1'),
(194, '61', '241', '1'),
(195, '61', '254', '1'),
(196, '61', '269', '1'),
(197, '61', '269', '1'),
(198, '41', '121', '1'),
(199, '61', '336', '1'),
(200, '61', '335', '1'),
(201, '62', '335', '1'),
(202, '64', '277', '1'),
(203, '64', '278', '1'),
(204, '64', '273', '1'),
(205, '65', '333', '1'),
(206, '64', '99', '1'),
(207, '64', '99', '1'),
(208, '60', '236', '1'),
(209, '60', '99', '1'),
(210, '60', '100', '1'),
(211, '58', '99', '1'),
(212, '58', '99', '1'),
(213, '67', '99', '1'),
(214, '67', '242', '1'),
(215, '67', '277', '1'),
(219, '67', '278', '1'),
(226, '68', '99', '1'),
(227, '68', '99', '1'),
(228, '62', '242', '1'),
(237, '62', '292', '1'),
(240, '62', '292', '1'),
(250, '70', 'undefined', '1'),
(259, '69', '236', '1'),
(261, '69', '99', '1'),
(273, '69', '246', '1'),
(277, '70', '239', '1'),
(278, '70', '276', '1'),
(281, '70', '319', '1'),
(282, '69', '100', '1');

-- --------------------------------------------------------

--
-- Stand-in structure for view `wishlist_view`
-- (See below for the actual view)
--
CREATE TABLE `wishlist_view` (
`id` int(11)
,`user_id` varchar(255)
,`product_id` int(25)
,`product_title_name` varchar(255)
,`product_slug` varchar(255)
,`store_name` varchar(225)
,`product_description` varchar(225)
,`product_type` varchar(225)
,`brand` varchar(255)
,`category` varchar(225)
,`parent_category` varchar(225)
,`seo_tag` varchar(225)
,`other_introduction` varchar(225)
,`add_custom_input` json
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(225)
,`gst` varchar(255)
,`value_added_tax` varchar(255)
,`variety` tinyint(1)
,`vendor_id` varchar(255)
,`shop` varchar(255)
,`rating` varchar(225)
,`colors` varchar(255)
,`size` varchar(225)
,`mrp` double
,`product_price` double
,`sale_price` double
,`discount` varchar(255)
,`manufacturing_date` varchar(25)
,`special_offer` tinyint(1)
,`featured_product` tinyint(1)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `wishlist_view1`
-- (See below for the actual view)
--
CREATE TABLE `wishlist_view1` (
`user_id` varchar(255)
,`product_id` int(25)
,`id` int(11)
,`product_title_name` varchar(255)
,`product_slug` varchar(255)
,`store_name` varchar(225)
,`product_description` varchar(225)
,`product_type` varchar(225)
,`brand` varchar(255)
,`category` varchar(225)
,`parent_category` varchar(225)
,`seo_tag` varchar(225)
,`other_introduction` varchar(225)
,`add_custom_input` json
,`wholesale_sales_tax` varchar(255)
,`manufacturers_sales_tax` varchar(255)
,`retails_sales_tax` varchar(225)
,`gst` varchar(255)
,`value_added_tax` varchar(255)
,`variety` tinyint(1)
,`vendor_id` varchar(255)
,`shop` varchar(255)
,`rating` varchar(225)
,`colors` varchar(255)
,`size` varchar(225)
,`mrp` double
,`product_price` double
,`sale_price` double
,`discount` varchar(255)
,`manufacturing_date` varchar(25)
,`special_offer` tinyint(1)
,`featured_product` tinyint(1)
);

-- --------------------------------------------------------

--
-- Structure for view `cart_view`
--
DROP TABLE IF EXISTS `cart_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `cart_view`  AS  select `products_view`.`id` AS `id`,`cart`.`user_id` AS `user_id`,`products_view`.`product_id` AS `product_id`,`products_view`.`product_title_name` AS `product_title_name`,`products_view`.`product_slug` AS `product_slug`,`products_view`.`store_name` AS `store_name`,`products_view`.`product_description` AS `product_description`,`products_view`.`product_type` AS `product_type`,`products_view`.`brand` AS `brand`,`products_view`.`category` AS `category`,`products_view`.`parent_category` AS `parent_category`,`products_view`.`seo_tag` AS `seo_tag`,`products_view`.`other_introduction` AS `other_introduction`,`products_view`.`add_custom_input` AS `add_custom_input`,`products_view`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`products_view`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`products_view`.`retails_sales_tax` AS `retails_sales_tax`,`products_view`.`gst` AS `gst`,`products_view`.`cgst` AS `cgst`,`products_view`.`sgst` AS `sgst`,`products_view`.`value_added_tax` AS `value_added_tax`,`products_view`.`variety` AS `variety`,`products_view`.`vendor_id` AS `vendor_id`,`products_view`.`shop` AS `shop`,`products_view`.`rating` AS `rating`,`products_view`.`colors` AS `colors`,`products_view`.`size` AS `size`,`products_view`.`mrp` AS `mrp`,`products_view`.`product_price` AS `product_price`,`products_view`.`sale_price` AS `sale_price`,`products_view`.`discount` AS `discount`,`products_view`.`manufacturing_date` AS `manufacturing_date`,`products_view`.`special_offer` AS `special_offer`,`products_view`.`featured_product` AS `featured_product`,`products_view`.`expire_date` AS `expire_date`,`products_view`.`unit` AS `unit`,`products_view`.`unit_quantity` AS `unit_quantity`,`cart`.`quantity` AS `quantity`,`products_view`.`is_delete` AS `is_delete`,`products_view`.`product_status` AS `product_status` from (`cart` join `products_view`) where (`cart`.`product_view_id` = `products_view`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `cart_view1`
--
DROP TABLE IF EXISTS `cart_view1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `cart_view1`  AS  select `cart`.`id` AS `id`,`cart`.`user_id` AS `user_id`,`products_view`.`product_title_name` AS `product_title_name`,`products_view`.`product_slug` AS `product_slug`,`products_view`.`store_name` AS `store_name`,`products_view`.`product_description` AS `product_description`,`products_view`.`product_type` AS `product_type`,`products_view`.`brand` AS `brand`,`products_view`.`category` AS `category`,`products_view`.`parent_category` AS `parent_category`,`products_view`.`seo_tag` AS `seo_tag`,`products_view`.`other_introduction` AS `other_introduction`,`products_view`.`add_custom_input` AS `add_custom_input`,`products_view`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`products_view`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`products_view`.`retails_sales_tax` AS `retails_sales_tax`,`products_view`.`gst` AS `gst`,`products_view`.`value_added_tax` AS `value_added_tax`,`products_view`.`variety` AS `variety`,`products_view`.`vendor_id` AS `vendor_id`,`products_view`.`shop` AS `shop`,`products_view`.`rating` AS `rating`,`products_view`.`colors` AS `colors`,`products_view`.`size` AS `size`,`products_view`.`mrp` AS `mrp`,`products_view`.`product_price` AS `product_price`,`products_view`.`sale_price` AS `sale_price`,`products_view`.`discount` AS `discount`,`products_view`.`manufacturing_date` AS `manufacturing_date`,`products_view`.`special_offer` AS `special_offer`,`products_view`.`featured_product` AS `featured_product`,`products_view`.`product_status` AS `product_status`,`products_view`.`is_delete` AS `is_delete`,`products_view`.`unit_quantity` AS `unit_quantity`,`products_view`.`unit` AS `unit`,`products_view`.`quantity` AS `quantity` from (`cart` join `products_view`) where (`cart`.`product_view_id` = `products_view`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `orders_view`
--
DROP TABLE IF EXISTS `orders_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `orders_view`  AS  select `order_products`.`id` AS `id`,`orders`.`user_id` AS `user_id`,`orders`.`status` AS `status`,`orders`.`created_on` AS `created_on`,`orders`.`updated_on` AS `updated_on`,`orders`.`total_quantity` AS `total_quantity`,`orders`.`ref_no` AS `ref_no`,`orders`.`payment_mode` AS `payment_mode`,`orders`.`delivery_date` AS `delivery_date`,`orders`.`shipping_charges` AS `shipping_charges`,`orders`.`invoice_no` AS `invoice_no`,`orders`.`invoice_date` AS `invoice_date`,`orders`.`order_date` AS `order_date`,`orders`.`total_amount` AS `total_amount`,`orders`.`total_gst` AS `total_gst`,`orders`.`total_cgst` AS `total_cgst`,`orders`.`total_sgst` AS `total_sgst`,`orders`.`taxable_value` AS `taxable_value`,`orders`.`discount_coupon` AS `discount_coupon`,`orders`.`discount_coupon_value` AS `discount_coupon_value`,`order_products`.`order_id` AS `order_id`,`order_products`.`product_id` AS `product_id`,`order_products`.`quantity` AS `quantity`,`order_products`.`gst` AS `gst`,`order_products`.`cgst` AS `cgst`,`order_products`.`sgst` AS `sgst`,`order_products`.`offer_id` AS `offer_id`,`order_products`.`discount` AS `discount`,`order_products`.`mrp` AS `mrp`,`order_products`.`product_price` AS `product_price`,`order_products`.`product_title_name` AS `product_title_name`,`order_products`.`store_name` AS `store_name`,`order_products`.`product_description` AS `product_description`,`order_products`.`product_type` AS `product_type`,`order_products`.`brand` AS `brand`,`order_products`.`category` AS `category`,`order_products`.`parent_category` AS `parent_category`,`order_products`.`other_introduction` AS `other_introduction`,`order_products`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`order_products`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`order_products`.`retails_sales_tax` AS `retails_sales_tax`,`order_products`.`variety` AS `variety`,`order_products`.`vendor_id` AS `vendor_id`,`order_products`.`shop` AS `shop`,`order_products`.`rating` AS `rating`,`order_products`.`colors` AS `colors`,`order_products`.`size` AS `size`,`order_products`.`sale_price` AS `sale_price`,`order_products`.`manufacturing_date` AS `manufacturing_date`,`order_products`.`special_offer` AS `special_offer`,`order_products`.`product_status` AS `product_status`,`order_products`.`expire_date` AS `expire_date`,`order_products`.`unit` AS `unit`,`order_products`.`unit_quantity` AS `unit_quantity`,`order_products`.`is_delete` AS `is_delete`,(select `users`.`address` from `users` where (`orders`.`user_id` = `users`.`user_id`)) AS `user_address` from (`orders` join `order_products`) where (`order_products`.`order_id` = `orders`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `products_view`
--
DROP TABLE IF EXISTS `products_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `products_view`  AS  select `products_pricing`.`id` AS `id`,`products_pricing`.`product_id` AS `product_id`,`products`.`product_title_name` AS `product_title_name`,`products`.`product_slug` AS `product_slug`,`products`.`store_name` AS `store_name`,`products`.`product_description` AS `product_description`,`products`.`product_type` AS `product_type`,`products`.`brand` AS `brand`,`products`.`category` AS `category`,`products`.`parent_category` AS `parent_category`,`products`.`seo_tag` AS `seo_tag`,`products`.`other_introduction` AS `other_introduction`,`products`.`add_custom_input` AS `add_custom_input`,`products`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`products`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`products`.`retails_sales_tax` AS `retails_sales_tax`,`products`.`gst` AS `gst`,`products`.`value_added_tax` AS `value_added_tax`,`products`.`variety` AS `variety`,`products`.`vendor_id` AS `vendor_id`,`products`.`show_product_rating` AS `show_product_rating`,`products`.`shop` AS `shop`,`products`.`rating` AS `rating`,`products_pricing`.`colors` AS `colors`,`products_pricing`.`size` AS `size`,`products_pricing`.`mrp` AS `mrp`,`products_pricing`.`product_price` AS `product_price`,`products_pricing`.`sale_price` AS `sale_price`,`products_pricing`.`discount` AS `discount`,`products_pricing`.`manufacturing_date` AS `manufacturing_date`,`products_pricing`.`expire_date` AS `expire_date`,`products_pricing`.`special_offer` AS `special_offer`,`products_pricing`.`featured_product` AS `featured_product`,`products_pricing`.`unit` AS `unit`,`products_pricing`.`unit_quantity` AS `unit_quantity`,`products_pricing`.`quantity` AS `quantity`,`products_pricing`.`is_delete` AS `is_delete`,`products_pricing`.`product_status` AS `product_status`,`products`.`cgst` AS `cgst`,`products`.`sgst` AS `sgst` from (`products_pricing` join `products`) where (`products_pricing`.`product_id` = `products`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `products_view1`
--
DROP TABLE IF EXISTS `products_view1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `products_view1`  AS  select `products_pricing`.`id` AS `id`,`products_pricing`.`product_id` AS `product_id`,`products`.`product_title_name` AS `product_title_name`,`products`.`product_slug` AS `product_slug`,`products`.`store_name` AS `store_name`,`products`.`product_description` AS `product_description`,`products`.`product_type` AS `product_type`,`products`.`brand` AS `brand`,`products`.`category` AS `category`,`products`.`parent_category` AS `parent_category`,`products`.`seo_tag` AS `seo_tag`,`products`.`other_introduction` AS `other_introduction`,`products`.`add_custom_input` AS `add_custom_input`,`products`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`products`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`products`.`retails_sales_tax` AS `retails_sales_tax`,`products`.`gst` AS `gst`,`products`.`value_added_tax` AS `value_added_tax`,`products`.`variety` AS `variety`,`products`.`vendor_id` AS `vendor_id`,`products`.`shop` AS `shop`,`products`.`rating` AS `rating`,`products_pricing`.`colors` AS `colors`,`products_pricing`.`size` AS `size`,`products_pricing`.`mrp` AS `mrp`,`products_pricing`.`product_price` AS `product_price`,`products_pricing`.`sale_price` AS `sale_price`,`products_pricing`.`discount` AS `discount`,`products_pricing`.`manufacturing_date` AS `manufacturing_date`,`products_pricing`.`expire_date` AS `expire_date`,`products_pricing`.`special_offer` AS `special_offer`,`products_pricing`.`featured_product` AS `featured_product`,`products_pricing`.`unit` AS `unit`,`products_pricing`.`unit_quantity` AS `unit_quantity`,`products_pricing`.`quantity` AS `quantity`,`products_pricing`.`is_delete` AS `is_delete`,`products_pricing`.`product_status` AS `product_status`,`products`.`cgst` AS `cgst`,`products`.`sgst` AS `sgst` from (`products_pricing` join `products`) where (`products_pricing`.`product_id` = `products`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `wishlist_view`
--
DROP TABLE IF EXISTS `wishlist_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `wishlist_view`  AS  select `wishlist`.`id` AS `id`,`wishlist`.`user_id` AS `user_id`,`products_view`.`product_id` AS `product_id`,`products_view`.`product_title_name` AS `product_title_name`,`products_view`.`product_slug` AS `product_slug`,`products_view`.`store_name` AS `store_name`,`products_view`.`product_description` AS `product_description`,`products_view`.`product_type` AS `product_type`,`products_view`.`brand` AS `brand`,`products_view`.`category` AS `category`,`products_view`.`parent_category` AS `parent_category`,`products_view`.`seo_tag` AS `seo_tag`,`products_view`.`other_introduction` AS `other_introduction`,`products_view`.`add_custom_input` AS `add_custom_input`,`products_view`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`products_view`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`products_view`.`retails_sales_tax` AS `retails_sales_tax`,`products_view`.`gst` AS `gst`,`products_view`.`value_added_tax` AS `value_added_tax`,`products_view`.`variety` AS `variety`,`products_view`.`vendor_id` AS `vendor_id`,`products_view`.`shop` AS `shop`,`products_view`.`rating` AS `rating`,`products_view`.`colors` AS `colors`,`products_view`.`size` AS `size`,`products_view`.`mrp` AS `mrp`,`products_view`.`product_price` AS `product_price`,`products_view`.`sale_price` AS `sale_price`,`products_view`.`discount` AS `discount`,`products_view`.`manufacturing_date` AS `manufacturing_date`,`products_view`.`special_offer` AS `special_offer`,`products_view`.`featured_product` AS `featured_product` from (`wishlist` join `products_view`) where (`wishlist`.`product_id` = `products_view`.`id`) ;

-- --------------------------------------------------------

--
-- Structure for view `wishlist_view1`
--
DROP TABLE IF EXISTS `wishlist_view1`;

CREATE ALGORITHM=UNDEFINED DEFINER=`we2code`@`localhost` SQL SECURITY DEFINER VIEW `wishlist_view1`  AS  select `wishlist`.`user_id` AS `user_id`,`products_view`.`product_id` AS `product_id`,`products_view`.`id` AS `id`,`products_view`.`product_title_name` AS `product_title_name`,`products_view`.`product_slug` AS `product_slug`,`products_view`.`store_name` AS `store_name`,`products_view`.`product_description` AS `product_description`,`products_view`.`product_type` AS `product_type`,`products_view`.`brand` AS `brand`,`products_view`.`category` AS `category`,`products_view`.`parent_category` AS `parent_category`,`products_view`.`seo_tag` AS `seo_tag`,`products_view`.`other_introduction` AS `other_introduction`,`products_view`.`add_custom_input` AS `add_custom_input`,`products_view`.`wholesale_sales_tax` AS `wholesale_sales_tax`,`products_view`.`manufacturers_sales_tax` AS `manufacturers_sales_tax`,`products_view`.`retails_sales_tax` AS `retails_sales_tax`,`products_view`.`gst` AS `gst`,`products_view`.`value_added_tax` AS `value_added_tax`,`products_view`.`variety` AS `variety`,`products_view`.`vendor_id` AS `vendor_id`,`products_view`.`shop` AS `shop`,`products_view`.`rating` AS `rating`,`products_view`.`colors` AS `colors`,`products_view`.`size` AS `size`,`products_view`.`mrp` AS `mrp`,`products_view`.`product_price` AS `product_price`,`products_view`.`sale_price` AS `sale_price`,`products_view`.`discount` AS `discount`,`products_view`.`manufacturing_date` AS `manufacturing_date`,`products_view`.`special_offer` AS `special_offer`,`products_view`.`featured_product` AS `featured_product` from (`wishlist` join `products_view`) where (`wishlist`.`product_id` = `products_view`.`id`) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_login_details`
--
ALTER TABLE `admin_login_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comaplains_support`
--
ALTER TABLE `comaplains_support`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoice_table`
--
ALTER TABLE `invoice_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_pricing`
--
ALTER TABLE `products_pricing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users_otp`
--
ALTER TABLE `users_otp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendor`
--
ALTER TABLE `vendor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_login_details`
--
ALTER TABLE `admin_login_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `banner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=426;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `comaplains_support`
--
ALTER TABLE `comaplains_support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `invoice_table`
--
ALTER TABLE `invoice_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=985085;
--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;
--
-- AUTO_INCREMENT for table `products_pricing`
--
ALTER TABLE `products_pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=343;
--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT for table `users_otp`
--
ALTER TABLE `users_otp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vendor`
--
ALTER TABLE `vendor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=283;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
