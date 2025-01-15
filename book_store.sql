-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 13, 2025 at 05:30 PM
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
(1, 'arifdhali', 'admin1@gmail.com', 'Arif Dhali', '$2b$10$/doRIMYx6YFsKOdD0AB6DuKNDcBe.7vsb/r70u7KwetltdL7aissy', 'tsfds', '2025-01-12 22:42:02', 'kolkata');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `email`, `profile_img`, `bio`, `dob`, `address`, `phone_no`, `social_link`, `password`, `created_at`, `status`, `last_active`, `password_reset_token`, `password_reset_expires`) VALUES
(2, 'David Bass', 'arif-b@yopmail.com', 'profile_img-WhatsApp Image 2024-11-30 at 21.28.13_ae133996.jpg', 'standard', NULL, NULL, NULL, NULL, '$2b$10$hLwEFcFG3/Hr5uBEO1WWkOHodIj6cN2wC6pnCvcbcH4gW3gIeaE9S', '2024-12-18 23:12:48', 'active', '2025-01-12 17:08:45', NULL, NULL),
(12, 'Blaine Fowler', 'vysahomopy@mailinator.com', 'profile_img-8852.jpg', 'Magna pariatur Even', NULL, NULL, NULL, NULL, '$2b$10$NqTd1z8l.GImsV7agOB/AuTyDiAU0MlbXGYIB.gQbUyTBfaX38z6u', '2024-12-31 23:09:12', 'active', '2024-12-31 17:39:12', NULL, NULL),
(13, 'Elizabeth Baker', 'gabyxed@mailinator.com', 'profile_img-8852.jpg', 'Excepturi optio rei', NULL, NULL, NULL, NULL, '$2b$10$CDCo6mp/Sedcn2g3n25zGeD2SWmKhDvAePINoqPffyAyqNgyzsyQq', '2024-12-31 23:09:23', 'active', '2024-12-31 17:39:23', NULL, NULL),
(15, 'Mumtaj', 'mamtaj@yopmail.com', '1736789302173-profile_img-todo.png', 'test', NULL, NULL, NULL, NULL, '$2b$10$/VKiNu.FvueurFWK720HJeaISGC7fEK/6mOObg3PVHXBs488AQpMS', '2025-01-13 22:58:22', 'active', '2025-01-13 17:28:22', NULL, NULL),
(16, 'Standard Users', 'standardusers@yopmail.com', '1736789376548-profile_img-todo.png', 'standard', NULL, NULL, NULL, NULL, '$2b$10$fZHl3wwiCIMmhdw/EPvIu.FrwzKktJU5y2RZpDftM7h7jo2xBi1MS', '2025-01-13 22:59:36', 'active', '2025-01-13 17:29:36', NULL, NULL),
(17, 'Heidi Doyle', 'gony@yopmail.com', '1736789420690-profile_img-todo.png', 'Soluta dolor cupidat', NULL, NULL, NULL, NULL, '$2b$10$PGf92Od4ToVH4xWAjo0JVuvhMeQPyoRvIIhxReTD7izksmAj7TEhW', '2025-01-13 23:00:20', 'active', '2025-01-13 17:30:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `author_orders`
--

DROP TABLE IF EXISTS `author_orders`;
CREATE TABLE IF NOT EXISTS `author_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(191) NOT NULL,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','complete','failed') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`order_id`) USING BTREE,
  UNIQUE KEY `Order_ID` (`order_id`),
  KEY `users_id` (`user_id`),
  KEY `fk_book_id` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author_orders`
--

INSERT INTO `author_orders` (`id`, `order_id`, `user_id`, `book_id`, `quantity`, `total_price`, `order_date`, `status`, `created_at`) VALUES
(1, 'ORDER0121A', 1, 79, 10, 299.99, '2025-01-13 17:16:00', 'pending', '2025-01-13 17:16:00');

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
  KEY `fk_category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `author_id`, `category_id`, `name`, `price`, `quantity`, `thumbnail`, `status`, `publication_date`, `created_at`) VALUES
(79, 2, 1, 'Exercitation velit ', 35, 3, '1736016946976-thumbnail-todo.png', 'published', '2025-01-05', '2025-01-04 18:53:43');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book_category`
--

INSERT INTO `book_category` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Cameron Hill', 'Ut doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus teneturUt doloribus tenetur', '2024-11-24 22:09:59'),
(2, 'Jameson Mayer', 'Anim sunt aliquip fAnim sunt aliquip fAnim sunt aliquip fAnim sunt aliquip fAnim sunt aliquip fAnim sunt aliquip fAnim sunt aliquip f', '2024-11-24 22:18:59'),
(3, 'Roanna Clark', 'Et et minim delectus Et et minim delectus Et et minim delectusEt et minim delectusEt et minim delectusEt et minim delectus', '2024-11-27 23:00:20');

-- --------------------------------------------------------

--
-- Table structure for table `book_category_relation`
--

DROP TABLE IF EXISTS `book_category_relation`;
CREATE TABLE IF NOT EXISTS `book_category_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_book` (`book_id`),
  KEY `fk_categgory` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book_category_relation`
--

INSERT INTO `book_category_relation` (`id`, `book_id`, `category_id`, `created_at`) VALUES
(44, 79, 1, '2025-01-04 18:53:43');

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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `author_id`, `book_id`, `code`, `discount`, `where_to_apply`, `status`, `start_date`, `expire_date`, `created_at`) VALUES
(44, 2, 79, 'Athena Lester', '37', 'Exercitationem disti', 'active', '2025-01-09 05:30:00', '2025-01-13 05:30:00', '2025-01-08 17:41:39'),
(45, 2, 79, 'Hyatt Kelley', '21', 'Error quis officiis ', 'active', '2025-05-10 05:30:00', '2025-09-02 05:30:00', '2025-01-08 17:41:57'),
(46, 2, 79, 'test2', '20', 'min 20', 'active', '2025-01-14 05:30:00', '2025-10-15 05:30:00', '2025-01-12 18:00:20'),
(48, 2, 79, 'test3', '0', 'Dolorum et dolore do', 'active', '2025-01-15 05:30:00', '2025-02-02 05:30:00', '2025-01-12 18:02:29'),
(49, 2, 79, 'Dora Stevenson', '43', 'Quas laboris quisqua', 'active', '2025-10-13 05:30:00', '2026-02-11 05:30:00', '2025-01-12 18:03:56'),
(50, 2, 79, 'Carolyn Trujillo', '64', 'Voluptatibus reicien', 'active', '2025-01-16 05:30:00', '2026-06-24 05:30:00', '2025-01-12 18:06:37'),
(51, 2, 79, 'Rudyard Bright', '94', 'Provident adipisci ', 'active', '2025-01-28 05:30:00', '2026-09-17 05:30:00', '2025-01-12 18:07:55'),
(52, 2, 79, 'Shelby Crawford', '25', 'Omnis eum et id acc', 'active', '2025-01-17 05:30:00', '2026-04-20 05:30:00', '2025-01-12 18:08:07'),
(53, 2, 79, 'Miranda Vinson', '48', 'Accusantium totam ut', 'active', '2025-01-18 05:30:00', '2025-12-05 05:30:00', '2025-01-12 18:08:50'),
(54, 2, 79, 'Griffin Warner', '22', 'Aperiam sapiente eum', 'active', '2025-01-15 05:30:00', '2025-02-23 05:30:00', '2025-01-12 18:09:12');

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
  `book_quantity` int DEFAULT NULL COMMENT 'Free-10, standard-30',
  `coupons_quantity` int NOT NULL,
  `order_margin` mediumint DEFAULT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `author_id`, `subscription_type`, `book_quantity`, `coupons_quantity`, `order_margin`, `start_date`, `end_date`) VALUES
(2, 2, 'free', 10, 10, 30, '2024-12-18 23:12:48', '2024-12-18 23:12:48'),
(10, 12, 'free', 10, 0, NULL, '2024-12-31 23:09:12', '2024-12-31 23:09:12'),
(11, 13, 'standard', 30, 0, NULL, '2024-12-31 23:09:23', '2024-12-31 23:09:23'),
(13, 15, 'premium', 10000, 50, 0, '2025-01-13 22:58:22', '2025-01-13 22:58:22'),
(14, 16, 'standard', 30, 20, 20, '2025-01-13 22:59:36', '2025-01-13 22:59:36'),
(15, 17, 'free', 10, 10, 30, '2025-01-13 23:00:20', '2025-01-13 23:00:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` int NOT NULL,
  `status` enum('active','inactive','blocked') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `created_at`, `status`) VALUES
(1, 0, 'active');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_orders`
--
ALTER TABLE `author_orders`
  ADD CONSTRAINT `fk_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `book_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_category_relation`
--
ALTER TABLE `book_category_relation`
  ADD CONSTRAINT `fk_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
