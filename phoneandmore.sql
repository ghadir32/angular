-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2022 at 05:35 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phoneandmore`
--

-- --------------------------------------------------------

--
-- Table structure for table `sold`
--

CREATE TABLE `sold` (
  `s_id` int(5) NOT NULL,
  `itm_id` int(2) NOT NULL,
  `sold_quantity` int(2) NOT NULL,
  `total` int(5) NOT NULL,
  `dateAndTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sold`
--

INSERT INTO `sold` (`s_id`, `itm_id`, `sold_quantity`, `total`, `dateAndTime`) VALUES
(1, 35, 3, 3, '2022-09-09 11:45:17'),
(3, 37, 1, 10, '2022-09-08 11:45:24'),
(4, 37, 3, 30, '2022-09-09 11:45:27'),
(47, 39, 1, 4, '2022-09-06 13:27:53'),
(48, 36, 2, 12, '2022-09-06 13:28:36'),
(68, 40, 2, 70, '2022-09-08 07:33:57'),
(69, 40, 2, 70, '2022-09-08 07:54:38'),
(70, 39, 1, 4, '2022-09-08 09:35:45'),
(71, 63, 2, 15, '2022-09-08 11:48:08');

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `name` varchar(100) NOT NULL,
  `quantity` int(5) NOT NULL,
  `id` int(11) NOT NULL,
  `cost` float NOT NULL,
  `note` varchar(250) NOT NULL,
  `price` float NOT NULL,
  `status` int(2) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`name`, `quantity`, `id`, `cost`, `note`, `price`, `status`) VALUES
('car charger', 200, 35, 2, 'KC12 chargerr', 3, 0),
('Adapter', 50, 36, 5, 'KY104A', 6, 1),
('power adapter', 60, 37, 8, 'bala wasle', 10, 1),
('mobile phone baggg', 77, 39, 2, 'portable', 4, 0),
('tp link repeater', 200, 40, 30, '', 35, 0),
('tyty', 5, 54, 5, 'yyyy', 5, 0),
('name', 8, 55, 8, 'noteee', 8, 0),
('nmmee', 6, 56, 6, 'mmmm', 6, 0),
('hhh', 6, 57, 6, 'uuu', 6, 0),
('silicone cover', 155, 58, 2, '', 3, 1),
('CC08 data cable', 15, 59, 5, '', 7, 1),
('car charger', 5, 60, 4, 'with bluetooth', 6, 1),
('mini speaker', 3, 61, 3, '', 5, 1),
('portable mobile bag', 7, 62, 2, '', 4, 1),
('fast adapter type C', 15, 63, 5, 'with cable', 7.5, 1),
('CARG', 5, 64, 2, '', 4, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sold`
--
ALTER TABLE `sold`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `test` (`itm_id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sold`
--
ALTER TABLE `sold`
  MODIFY `s_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sold`
--
ALTER TABLE `sold`
  ADD CONSTRAINT `test` FOREIGN KEY (`itm_id`) REFERENCES `stocks` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
