-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 31, 2024 at 05:39 PM
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
(1, 'arifdhali', 'admin1@gmail.com', 'Arif Dhali', '$2b$10$/doRIMYx6YFsKOdD0AB6DuKNDcBe.7vsb/r70u7KwetltdL7aissy', 'tsfds', '2024-12-31 22:47:35', 'kolkata');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `email`, `profile_img`, `bio`, `dob`, `address`, `phone_no`, `social_link`, `password`, `created_at`, `status`, `last_active`, `password_reset_token`, `password_reset_expires`) VALUES
(1, 'Arif Dhali', 'arif-a@yopmail.com', 'profile_img-pexels-realtoughcandycom-11035380.jpg', 'Free testing account', NULL, NULL, NULL, NULL, '$2b$10$HF185KhuLi7kZ5JQRUejaueyeZ7y98q8FBQjI0e1o/vBLhttRBuwe', '2024-12-18 23:09:02', 'active', '2024-12-30 18:27:03', NULL, NULL),
(2, 'David Bass', 'arif-b@yopmail.com', 'profile_img-WhatsApp Image 2024-11-30 at 21.28.13_ae133996.jpg', 'standard', NULL, NULL, NULL, NULL, '$2b$10$hLwEFcFG3/Hr5uBEO1WWkOHodIj6cN2wC6pnCvcbcH4gW3gIeaE9S', '2024-12-18 23:12:48', 'active', '2024-12-22 14:40:25', NULL, NULL),
(12, 'Blaine Fowler', 'vysahomopy@mailinator.com', 'profile_img-8852.jpg', 'Magna pariatur Even', NULL, NULL, NULL, NULL, '$2b$10$NqTd1z8l.GImsV7agOB/AuTyDiAU0MlbXGYIB.gQbUyTBfaX38z6u', '2024-12-31 23:09:12', 'active', '2024-12-31 17:39:12', NULL, NULL),
(13, 'Elizabeth Baker', 'gabyxed@mailinator.com', 'profile_img-8852.jpg', 'Excepturi optio rei', NULL, NULL, NULL, NULL, '$2b$10$CDCo6mp/Sedcn2g3n25zGeD2SWmKhDvAePINoqPffyAyqNgyzsyQq', '2024-12-31 23:09:23', 'active', '2024-12-31 17:39:23', NULL, NULL),
(14, 'Barbara Fernandez', 'tocadi@mailinator.com', 'profile_img-8852.jpg', 'Quos nostrud minus e', NULL, NULL, NULL, NULL, '$2b$10$jHavGskUh9894QPEG5dfG.fO4n1jO0mGQQ5KQtu3kNtv6bBhHWEWm', '2024-12-31 23:09:32', 'active', '2024-12-31 17:39:32', NULL, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `author_id`, `category_id`, `name`, `price`, `quantity`, `thumbnail`, `status`, `publication_date`, `created_at`) VALUES
(4, 2, 1, 'Mister Silver Fox', 10, 5, 'thumbnail-Le_Livre_d\'image.png', 'published', '2024-12-24', '2024-12-23 18:24:35'),
(5, 1, 3, 'The Image Book', 199.99, 12, 'thumbnail-Fabrice_Aragno_1.jpg', 'published', '2024-12-28', '2024-12-23 18:26:50'),
(6, 1, 3, 'Esse eos quibusdam ', 728, 5, 'thumbnail-Fabrice_Aragno_1.jpg', 'published', '2024-12-25', '2024-12-24 19:05:55'),
(11, 1, 3, 'Reiciendis Nam unde ', 199.99, 5, 'thumbnail-pexels-realtoughcandycom-11035380.jpg', 'published', '2024-12-25', '2024-12-25 07:32:33'),
(12, 1, 2, 'Illo reprehenderit ', 374, 7, 'thumbnail-Le_Livre_d\'image.png', 'published', '2024-12-25', '2024-12-25 07:35:33'),
(13, 1, 2, 'Macbeth', 399, 2, 'thumbnail-8852.jpg', 'published', '2024-12-30', '2024-12-30 18:26:11');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book_category_relation`
--

INSERT INTO `book_category_relation` (`id`, `book_id`, `category_id`, `created_at`) VALUES
(3, 4, 1, '2024-12-23 18:24:35'),
(4, 5, 3, '2024-12-23 18:26:50'),
(5, 6, 3, '2024-12-24 19:05:55'),
(6, 11, 3, '2024-12-25 07:32:33'),
(7, 12, 2, '2024-12-25 07:35:33'),
(8, 13, 2, '2024-12-30 18:26:11');

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
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `author_id`, `subscription_type`, `book_quantity`, `start_date`, `end_date`) VALUES
(1, 1, 'free', NULL, '2024-12-18 23:09:02', '2024-12-18 23:09:02'),
(2, 2, 'standard', NULL, '2024-12-18 23:12:48', '2024-12-18 23:12:48'),
(10, 12, 'free', 10, '2024-12-31 23:09:12', '2024-12-31 23:09:12'),
(11, 13, 'standard', 30, '2024-12-31 23:09:23', '2024-12-31 23:09:23'),
(12, 14, 'premium', 10000, '2024-12-31 23:09:32', '2024-12-31 23:09:32');

--
-- Constraints for dumped tables
--

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
