-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 19, 2022 at 02:30 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bellapartybus`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_info`
--

CREATE TABLE `admin_info` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_info`
--

INSERT INTO `admin_info` (`id`, `email`, `password`, `name`, `role`) VALUES
(2, 'tareqhassan2014@gmail.com', '$2b$10$vFEJf/CvnBgMpgnQZb4xTen7wXSCdoxZHfexBv9wvDL0Jh7uwtqX6', 'Tareq', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `booking_info`
--

CREATE TABLE `booking_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`vehicle`)),
  `occasion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `booking_type` int(11) DEFAULT NULL,
  `duration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coupon_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_date` datetime(3) DEFAULT NULL,
  `pickup_time` datetime(3) DEFAULT NULL,
  `special_request` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `drop_off_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passengers` int(11) DEFAULT 1,
  `first_ride_passengers` int(11) DEFAULT 1,
  `first_ride_pickup_date` datetime(3) DEFAULT NULL,
  `first_ride_pickup_time` datetime(3) DEFAULT NULL,
  `return_ride_passengers` int(11) DEFAULT 1,
  `return_ride_pickup_date` datetime(3) DEFAULT NULL,
  `return_ride_pickup_time` datetime(3) DEFAULT NULL,
  `first_ride_pickup_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_ride_drop_off_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `return_ride_pickup_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `return_ride_drop_off_location` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_info`
--

INSERT INTO `booking_info` (`id`, `user_id`, `email`, `phone`, `vehicle`, `occasion`, `booking_type`, `duration`, `coupon_code`, `first_name`, `last_name`, `pickup_date`, `pickup_time`, `special_request`, `pickup_location`, `drop_off_location`, `passengers`, `first_ride_passengers`, `first_ride_pickup_date`, `first_ride_pickup_time`, `return_ride_passengers`, `return_ride_pickup_date`, `return_ride_pickup_time`, `first_ride_pickup_location`, `first_ride_drop_off_location`, `return_ride_pickup_location`, `return_ride_drop_off_location`, `contact_method`) VALUES
(7, 1, 'tareqhassan2014@gmail.com', '+8801944981668', '[\"Van\",\"Sedan\",\"Stretch Limo\",\"Stretch SUV\"]', 'Anniversary', 0, '', 'adfasd', 'Tareq', 'Hasan', '2022-10-18 16:50:14.813', '2022-10-18 16:50:14.813', 'adfasdgf', 'adsfasdf', 'adsfasdf', 4, 1, '2022-10-18 16:50:14.813', '2022-10-18 16:50:14.813', 1, '2022-10-18 16:50:14.813', NULL, '', '', '', '', 'phone'),
(8, 1, 'tareqhassan2014@gmail.com', '+8801944981668', '[\"Van\",\"Sedan\",\"Stretch Limo\",\"Stretch SUV\"]', 'Airport', 1, '', 'adfds', 'Tareq', 'Hasan', '2022-10-18 16:50:14.813', '2022-10-18 16:50:14.813', 'adfasdgfadf', 'adsfasdf', 'asdf', 1, 1, '2022-10-18 16:50:14.813', '2022-10-18 16:50:14.813', 1, '2022-10-18 16:50:14.813', NULL, '', '', '', '', 'email'),
(9, 1, 'tareqhassan2014@gmail.com', '+8801944981668', '[\"Van\",\"Sedan\",\"Stretch Limo\",\"Stretch SUV\"]', 'Airport', 2, '', 'asdf', 'Tareq', 'Hasan', '2022-10-18 16:50:14.813', '2022-10-18 16:50:14.813', 'adfasdgfadf', '', '', 1, 1, '2022-10-18 16:50:14.813', '2022-10-18 16:50:14.813', 1, '2022-10-18 16:50:14.813', NULL, 'adsfasdf', 'asdf', 'adsf', 'aa', 'email');

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `phone` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_form`
--

INSERT INTO `contact_form` (`id`, `name`, `email`, `message`, `phone`) VALUES
(1, 'tareq', 'tareqhassan2014@gmail.com', 'hello', '01944981668'),
(20, 'Tareq', 'tareqhassan2014@gmail.com', 'hello world', '01759177039'),
(21, 'Tareq', 'tareqhassan2014@gmail.com', 'hello world', '01759177039'),
(22, 'Tareq', 'tareqhassan2014@gmail.com', 'hello world', '01759177039'),
(23, 'Tareq', 'tareqhassan2014@gmail.com', 'hello world', '01759177039'),
(24, 'Tareq Hasan', 'tareqhassan2014@gmail.com', 'my message\n', '+8801944981668'),
(25, 'Tareq Hasan', 'tareqhassan2014@gmail.com', 'my message\n', '+8801944981668'),
(26, 'Tareq Hasan', 'tareqhassan2014@gmail.com', 'my message', '+8801944981668');

-- --------------------------------------------------------

--
-- Table structure for table `payment_info`
--

CREATE TABLE `payment_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `expiration_date` varchar(255) DEFAULT NULL,
  `cvv_code` int(11) DEFAULT NULL,
  `card_name` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_info`
--

CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `phone` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `location` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`location`)),
  `email` varchar(255) NOT NULL,
  `email_lowercased` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email_confirm_token` varchar(255) DEFAULT NULL,
  `email_confirm_token_expired` timestamp NULL DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `password_reset_token_expired` timestamp NULL DEFAULT NULL,
  `active_status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_info`
--

INSERT INTO `user_info` (`id`, `first_name`, `last_name`, `company`, `phone`, `location`, `email`, `email_lowercased`, `password`, `email_confirm_token`, `email_confirm_token_expired`, `password_reset_token`, `password_reset_token_expired`, `active_status`, `created_at`, `updated_at`) VALUES
(10, 'Tareq', 'Hasan', NULL, '+8801944981668', NULL, 'tareqhassan2014@gmail.com', 'tareqhassan2014@gmail.com', '$2b$10$0qmK2Bj1zbC37vHxKwzWs.EUwNZQMJ50LD/8Whx0jXoLSL.APCQTi', '43317049f2c7103a61022f449ddf435e05f605acf117cc1ab481a38fcd4a8266', '0000-00-00 00:00:00', 'Vb38ugmxG4', '2022-10-16 11:34:49', 0, '2022-10-16 16:35:47', '2022-10-16 16:35:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_info`
--
ALTER TABLE `admin_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking_info`
--
ALTER TABLE `booking_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment_info`
--
ALTER TABLE `payment_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_info`
--
ALTER TABLE `user_info`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_info`
--
ALTER TABLE `admin_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `booking_info`
--
ALTER TABLE `booking_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `payment_info`
--
ALTER TABLE `payment_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_info`
--
ALTER TABLE `user_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
