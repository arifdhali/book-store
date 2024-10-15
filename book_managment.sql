-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 15, 2024 at 01:11 PM
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
-- Database: `book_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `bookID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(2000) NOT NULL,
  `author` varchar(50) NOT NULL,
  `stock` int NOT NULL,
  `price` int NOT NULL,
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`bookID`),
  KEY `fk_cat_id` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`bookID`, `title`, `author`, `stock`, `price`, `categoryId`) VALUES
(1, 'title 1', 'author 1', 10, 111, 1),
(3, 'title 3', 'author 3', 5, 1111, 4),
(4, 'title 4', 'author 4', 11, 3000, 3);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`categoryId`, `name`) VALUES
(1, 'cat 1'),
(3, 'cat 3'),
(4, 'cat 4');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

DROP TABLE IF EXISTS `orderitem`;
CREATE TABLE IF NOT EXISTS `orderitem` (
  `OrderItemID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int NOT NULL,
  `BookID` int NOT NULL,
  `Quantity` int NOT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`OrderItemID`),
  KEY `fk_order_id` (`OrderID`),
  KEY `fk_book_id` (`BookID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`OrderItemID`, `OrderID`, `BookID`, `Quantity`, `Price`) VALUES
(1, 4, 3, 2, '22.00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `orderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `fk_usersid` (`userID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `orderDate`, `userID`) VALUES
(3, '2024-10-14 16:56:00', 7),
(4, '2024-10-14 16:56:00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` enum('user','admin','author') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'user',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `name`, `email`, `password`, `role`) VALUES
(5, 'arif', 'arif@gmail.com', 'afsdfds', 'user'),
(6, 'test', 'test@gmail.com', 'fasdfdsf', 'author'),
(7, 'testing', 'testing@yopmail.com', 'fasfdsfsd', 'admin');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_cat_id` FOREIGN KEY (`categoryId`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `fk_book_id` FOREIGN KEY (`BookID`) REFERENCES `book` (`bookID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_id` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
