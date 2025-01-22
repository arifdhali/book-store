-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 19, 2025 at 06:00 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text,
  `email` text,
  `name` text,
  `password` varchar(200) DEFAULT NULL,
  `image` text NOT NULL,
  `last_active` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `name`, `password`, `image`, `last_active`, `address`) VALUES
(1, 'arifdhali', 'admin1@gmail.com', 'Arif Dhali', '$2b$10$/doRIMYx6YFsKOdD0AB6DuKNDcBe.7vsb/r70u7KwetltdL7aissy', 'tsfds', '2025-01-19 02:59:04', 'kolkata');

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `email` text,
  `profile_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `bio` text,
  `dob` date DEFAULT NULL,
  `address` longtext,
  `phone_no` tinyint DEFAULT NULL,
  `social_link` json DEFAULT NULL,
  `password` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive','block') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active',
  `last_active` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password_reset_token` longtext,
  `password_reset_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `email`, `profile_img`, `bio`, `dob`, `address`, `phone_no`, `social_link`, `password`, `created_at`, `status`, `last_active`, `password_reset_token`, `password_reset_expires`) VALUES
(32, 'Leah Berger', 'curisujeca@yopmail.com', '1737309396620-profile_img-8852.jpg', 'Qui vitae velit aut', NULL, NULL, NULL, NULL, '$2b$10$1xZYQ5Cdp5KUAocVMiCmiueFatxXIhw.6hEj1gZacay7SwXCeLccy', '2025-01-19 23:26:36', 'active', '2025-01-19 17:57:42', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `author_orders`
--

DROP TABLE IF EXISTS `author_orders`;
CREATE TABLE IF NOT EXISTS `author_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(150) NOT NULL,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','complete','failed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`order_id`) USING BTREE,
  UNIQUE KEY `Order_ID` (`order_id`),
  KEY `fk_book_id` (`book_id`),
  KEY `users_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `author_orders_relations`
--

DROP TABLE IF EXISTS `author_orders_relations`;
CREATE TABLE IF NOT EXISTS `author_orders_relations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `order_id` varchar(150) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_order_id` (`order_id`),
  KEY `fK_order_authorid` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `category_id` int NOT NULL,
  `name` text,
  `price` double DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `thumbnail` longtext,
  `status` varchar(30) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author_id` (`author_id`),
  KEY `fk_categgory` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `author_id`, `category_id`, `name`, `price`, `quantity`, `thumbnail`, `status`, `publication_date`, `created_at`) VALUES
(94, 32, 11, 'Aliquip rem sit odi', 190, 359, '1737309555706-thumbnail-8852.jpg', 'draft', '2025-01-19', '2025-01-19 17:59:15');

-- --------------------------------------------------------

--
-- Table structure for table `book_category`
--

DROP TABLE IF EXISTS `book_category`;
CREATE TABLE IF NOT EXISTS `book_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` longtext,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book_category`
--

INSERT INTO `book_category` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Cameron Hill', 'Ut doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus tenetur', '2024-11-24 22:09:59'),
(10, 'Blossom Mann', 'Dolor minima earum o Dolor minima earum oDolor minima earum oDolor minima earum o Dolor minima earum oDolor minima earum oDolor minima earum oDolor minima earum o', '2025-01-15 22:34:11'),
(11, 'Armand Trevino', 'Nulla voluptates ali Nulla voluptates ali Nulla voluptates ali Nulla voluptates ali Nulla voluptates ali Nulla voluptates ali Nulla voluptates ali Nulla voluptates ali ', '2025-01-15 22:34:19');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `book_id` int NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `discount` varchar(100) DEFAULT NULL,
  `where_to_apply` varchar(200) DEFAULT NULL,
  `status` enum('active','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active',
  `start_date` datetime DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `book_id` (`book_id`),
  KEY `author_id` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
CREATE TABLE IF NOT EXISTS `rating` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `book_id` int NOT NULL,
  `rating_value` decimal(10,0) DEFAULT NULL,
  `review` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rating_fk_author` (`author_id`),
  KEY `rating_fk_book_id` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
CREATE TABLE IF NOT EXISTS `subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `subscription_type` enum('free','standard','premium') NOT NULL DEFAULT 'free',
  `subscription_price` double DEFAULT NULL,
  `book_quantity` int DEFAULT NULL,
  `book_limit` int DEFAULT NULL COMMENT 'Free-10, standard-30',
  `coupons_limit` int DEFAULT NULL,
  `order_margin` mediumint DEFAULT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `author_id`, `subscription_type`, `subscription_price`, `book_quantity`, `book_limit`, `coupons_limit`, `order_margin`, `start_date`, `end_date`) VALUES
(25, 32, 'premium', 699, NULL, NULL, NULL, NULL, '2025-01-19 23:26:36', '2025-01-19 23:26:36');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_author_relation`
--

DROP TABLE IF EXISTS `subscription_author_relation`;
CREATE TABLE IF NOT EXISTS `subscription_author_relation` (
  `id` int NOT NULL,
  `author_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `subscript_id` (`id`),
  KEY `fK-author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `created_at`, `status`) VALUES
(1, 'ARif', '0000-00-00 00:00:00', 'active');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_orders`
--
ALTER TABLE `author_orders`
  ADD CONSTRAINT `fk_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `author_orders_relations`
--
ALTER TABLE `author_orders_relations`
  ADD CONSTRAINT `fK_order_authorid` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `author_orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_categgory` FOREIGN KEY (`category_id`) REFERENCES `book_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_fk_author` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_fk_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription_author_relation`
--
ALTER TABLE `subscription_author_relation`
  ADD CONSTRAINT `fK-author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `subscript_id` FOREIGN KEY (`id`) REFERENCES `subscription` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
