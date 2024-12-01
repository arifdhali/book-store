-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 01, 2024 at 05:18 PM
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
(1, 'arifdhali', 'admin1@gmail.com', 'Arif Dhali', '$2b$10$/doRIMYx6YFsKOdD0AB6DuKNDcBe.7vsb/r70u7KwetltdL7aissy', 'tsfds', '2024-12-01 22:47:41', 'kolkata');

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
  `password` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('active','inactive','block') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'active',
  `last_active` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`id`, `name`, `email`, `profile_img`, `bio`, `password`, `created_at`, `status`, `last_active`) VALUES
(9, 'Arif Dhali', 'arifdhali1231@gmail.com', 'profile_img-me.jpg', 'Irure velit placeat', '$2b$10$KzpxoU5Mx4v4UiNS4JJa7OX6vqefkCTSWEsfcC3LStmhySevAZvjq', '2024-12-01 22:44:59', 'active', '2024-12-01 17:14:59');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int DEFAULT NULL,
  `name` text,
  `prcie` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_author_id` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `author_id`, `name`, `prcie`, `created_at`) VALUES
(1, NULL, 'The last word', 201, '2024-11-26 17:04:24');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscription_type` enum('standard','premium') DEFAULT NULL,
  `purchase_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `subscription_type`, `purchase_at`, `price`) VALUES
(1, 'standard', '2024-11-21 14:23:32', 100.05),
(2, 'premium', '2024-11-21 14:23:32', 999.99);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_category_relation`
--
ALTER TABLE `book_category_relation`
  ADD CONSTRAINT `fk_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_categgory` FOREIGN KEY (`category_id`) REFERENCES `book_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
