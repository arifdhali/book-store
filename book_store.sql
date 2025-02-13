-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 13, 2025 at 01:28 PM
-- Server version: 8.0.27
-- PHP Version: 8.0.13

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
(1, 'arifdhali', 'admin1@gmail.com', 'Arif Dhali', '$2b$10$/doRIMYx6YFsKOdD0AB6DuKNDcBe.7vsb/r70u7KwetltdL7aissy', 'tsfds', '2025-02-13 11:49:51', 'kolkata');

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` text,
  `profile_img` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `bio` text,
  `dob` date DEFAULT NULL,
  `address` longtext,
  `phone_no` int DEFAULT NULL,
  `social_link` json DEFAULT NULL,
  `password` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive','block') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active',
  `last_active` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password_reset_token` longtext,
  `password_reset_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `first_name`, `last_name`, `email`, `profile_img`, `bio`, `dob`, `address`, `phone_no`, `social_link`, `password`, `created_at`, `status`, `last_active`, `password_reset_token`, `password_reset_expires`) VALUES
(86, 'Arif', 'Arif', 'Dhali', 'arif@yopmail.com', '13-1-2025-profileImage-DALLÂ·E 2024-10-07 16.48.38 - A sleek and modern logo design representing a car. The logo features a stylized silhouette of a car, emphasizing aerodynamic lines and a dynamic feel.webp', 'this is test bio', '2000-07-31', 'Kolkata , 700301', 1232321321, NULL, '$2b$10$5aXgzWt2ecqU/MkXoYtLOeTDlqTSRmwlY1o0VnY8IyVg5OFMWdJ/y', '2025-02-02 00:00:42', 'active', '2025-02-13 13:27:39', NULL, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(1, 'Cameron Hill', 'Ut doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus tenetur', '2024-11-24 22:09:59');

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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` text,
  `message` text,
  `related_id` int DEFAULT NULL,
  `related_type` text,
  `is_read` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `type`, `message`, `related_id`, `related_type`, `is_read`, `created_at`) VALUES
(1, 'new-author-register', 'Sam is registered', 86, 'author', 0, '2025-02-05 16:10:48'),
(2, 'new-author-register', 'Yoshio is registered', 142, 'author', 0, '2025-02-13 11:59:52'),
(3, 'new-author-register', 'Shelly is registered', 143, 'author', 0, '2025-02-13 12:01:58'),
(4, 'new-author-register', 'Jelani is registered', 144, 'author', 0, '2025-02-13 12:03:56'),
(5, 'new-author-register', 'Reuben is registered', 145, 'author', 0, '2025-02-13 12:04:03'),
(6, 'new-author-register', 'Alec is registered', 146, 'author', 0, '2025-02-13 12:05:55');

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
  `end_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `author_id`, `subscription_type`, `subscription_price`, `book_quantity`, `book_limit`, `coupons_limit`, `order_margin`, `start_date`, `end_date`, `created_at`) VALUES
(72, 86, 'premium', 0, 10, 10, 10, 30, '2025-02-02 00:00:42', '2025-02-02 00:00:42', '2025-02-02 00:00:42');

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
