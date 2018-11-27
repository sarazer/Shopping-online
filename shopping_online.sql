-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2018 at 12:59 AM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` varchar(9) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`) VALUES
('200529238');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `user_id` varchar(9) COLLATE utf8_bin NOT NULL,
  `product_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`user_id`, `product_id`, `quantity`) VALUES
('050655794', 'V001', 2);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(40) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Vegetables & Fruit'),
(2, 'Dairy & Eggs'),
(3, 'Sanks'),
(4, 'Pastries & Breads');

-- --------------------------------------------------------

--
-- Table structure for table `categoriestoproducts`
--

CREATE TABLE `categoriestoproducts` (
  `product` varchar(20) COLLATE utf8_bin NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categoriestoproducts`
--

INSERT INTO `categoriestoproducts` (`product`, `category`) VALUES
('B001', 4),
('B002', 4),
('D001', 2),
('D002', 2),
('E001', 2),
('F006', 1),
('F008', 1),
('S0012', 3),
('S0015', 3),
('S002', 3),
('V001', 1),
('V002', 1),
('V003', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `value` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`value`, `name`) VALUES
(3000, 'Jerusalem'),
(4000, 'Haifa'),
(5000, 'Tel-Aviv'),
(6700, 'Tveria'),
(7900, 'Petah-Tiqva'),
(8400, 'Rehovot'),
(8600, 'Ramat-Gan');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` varchar(9) COLLATE utf8_bin NOT NULL,
  `city_code` int(11) NOT NULL,
  `delivery_street` varchar(30) COLLATE utf8_bin NOT NULL,
  `delivery_date` date NOT NULL,
  `order_date` date NOT NULL,
  `credit_card_info` varchar(4) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `city_code`, `delivery_street`, `delivery_date`, `order_date`, `credit_card_info`) VALUES
(1019, '300111630', 3000, 'uziel, 3', '2018-11-27', '2018-11-01', '3456');

-- --------------------------------------------------------

--
-- Table structure for table `orders_products`
--

CREATE TABLE `orders_products` (
  `order_id` int(11) NOT NULL,
  `product_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `orders_products`
--

INSERT INTO `orders_products` (`order_id`, `product_id`, `quantity`) VALUES
(1019, 'F008', 1),
(1019, 'V002', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` varchar(20) COLLATE utf8_bin NOT NULL,
  `product_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `price` float NOT NULL,
  `image` varchar(250) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `price`, `image`) VALUES
('B001', 'bread', 5, 'images/bread.png'),
('B002', 'rogalach', 15, 'images/rogalach.png'),
('D001', 'milk', 4, 'images/milk.png'),
('D002', 'cheese', 5, 'images/cheese.png'),
('E001', 'eggs', 21, 'images/eggs.png'),
('F006', 'mango', 9, 'images/mango.png'),
('F008', 'banana', 5, 'images/banana.png'),
('S0012', 'bamba', 7, 'images/Bamba.png'),
('S0015', 'bisli', 7, 'images/bisli.png'),
('S002', 'chips', 5, 'images/chips.png'),
('V001', 'tomato', 3, 'images/Tomato.png'),
('V002', 'cucumber', 2, 'images/cucumber.png'),
('V003', 'carrot', 3, 'images/carrot.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(9) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `first_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `last_name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone` varchar(16) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `city_id` int(11) NOT NULL,
  `street` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `house_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `email`, `password`, `city_id`, `street`, `house_number`) VALUES
('050655794', 'oshra', 'cohen', '052-555-6160', 'a@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 4000, 'radmin', '65'),
('200529238', 'Sara', 'Zer', '052-555-3134', 'sara@gmail.com', '5bd537fc3789b5482e4936968f0fde95', 3000, 'Hantke', '25'),
('300111630', 'Avi', 'Zer', '052-555-3130', 'avi@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 3000, 'uziel', '3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `cart_product` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  ADD PRIMARY KEY (`product`,`category`),
  ADD KEY `categoryFK` (`category`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`value`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_order` (`user_id`),
  ADD KEY `city_order` (`city_code`);

--
-- Indexes for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD KEY `orders_ID` (`order_id`),
  ADD KEY `orders_product_ID` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city_fk` (`city_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1020;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admin_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `cart_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `categoriestoproducts`
--
ALTER TABLE `categoriestoproducts`
  ADD CONSTRAINT `categoryFK` FOREIGN KEY (`category`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `productFK` FOREIGN KEY (`product`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `city_order` FOREIGN KEY (`city_code`) REFERENCES `cities` (`value`),
  ADD CONSTRAINT `user_order` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders_products`
--
ALTER TABLE `orders_products`
  ADD CONSTRAINT `orders_ID` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orders_product_ID` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `city_fk` FOREIGN KEY (`city_id`) REFERENCES `cities` (`value`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
