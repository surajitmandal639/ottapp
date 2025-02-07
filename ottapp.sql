-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2024 at 11:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ottapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `actors`
--

CREATE TABLE `actors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `actors`
--

INSERT INTO `actors` (`id`, `name`, `bio`, `place_of_birth`, `date_of_birth`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Actor 1', 'Biography of Actor 1', 'Birth place of Actor 1', '1981-01-21', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(2, 'Actor 2', 'Biography of Actor 2', 'Birth place of Actor 2', '1982-02-22', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(3, 'Actor 3', 'Biography of Actor 3', 'Birth place of Actor 3', '1983-03-23', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(4, 'Actor 4', 'Biography of Actor 4', 'Birth place of Actor 4', '1984-04-24', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(5, 'Actor 5', 'Biography of Actor 5', 'Birth place of Actor 5', '1985-05-25', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(6, 'Actor 6', 'Biography of Actor 6', 'Birth place of Actor 6', '1986-06-26', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(7, 'Actor 7', 'Biography of Actor 7', 'Birth place of Actor 7', '1987-07-27', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(8, 'Actor 8', 'Biography of Actor 8', 'Birth place of Actor 8', '1988-08-28', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(9, 'Actor 9', 'Biography of Actor 9', 'Birth place of Actor 9', '1989-09-29', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `alpha_2_code` varchar(2) NOT NULL,
  `alpha_3_code` varchar(3) NOT NULL,
  `numeric_code` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `percent` decimal(5,2) NOT NULL,
  `user_limit` int(11) NOT NULL DEFAULT 0,
  `exp_date` timestamp NULL DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is deleted, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `percent`, `user_limit`, `exp_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'SUMMER2024', 15.00, 100, '2024-12-30 18:30:00', 1, NULL, NULL),
(2, 'WINTER2024', 20.00, 50, '2024-11-29 18:30:00', 1, NULL, NULL),
(3, 'FALL2024', 10.00, 150, '2024-10-30 18:30:00', 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coupon_user`
--

CREATE TABLE `coupon_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `coupon_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupon_user`
--

INSERT INTO `coupon_user` (`id`, `coupon_id`, `user_id`, `used_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 1, 8, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 1, 10, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 2, 6, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 2, 7, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(6, 2, 10, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(7, 2, 11, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(8, 3, 6, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(9, 3, 10, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(10, 3, 11, '2024-10-05 04:16:07', '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `alphabetic_code` varchar(3) NOT NULL,
  `numeric_code` varchar(3) NOT NULL,
  `minor_unit` int(11) NOT NULL,
  `fund` varchar(10) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `name`, `alphabetic_code`, `numeric_code`, `minor_unit`, `fund`, `symbol`, `created_at`, `updated_at`) VALUES
(1, 'Afghani', 'AFN', '971', 2, '', '؋', NULL, NULL),
(2, 'Euro', 'EUR', '978', 2, '', '€', NULL, NULL),
(3, 'Lek', 'ALL', '008', 2, '', 'Lek', NULL, NULL),
(4, 'Algerian Dinar', 'DZD', '012', 2, '', 'د.ج', NULL, NULL),
(5, 'US Dollar', 'USD', '840', 2, '', '$', NULL, NULL),
(6, 'Kwanza', 'AOA', '973', 2, '', 'Kz', NULL, NULL),
(7, 'Armenian Dram', 'AMD', '051', 2, '', '֏', NULL, NULL),
(8, 'Aruban Florin', 'AWG', '533', 2, '', 'ƒ', NULL, NULL),
(9, 'Australian Dollar', 'AUD', '036', 2, '', '$', NULL, NULL),
(10, 'Azerbaijan Manat', 'AZN', '944', 2, '', '₼', NULL, NULL),
(11, 'Bahamian Dollar', 'BSD', '044', 2, '', '$', NULL, NULL),
(12, 'Bahraini Dinar', 'BHD', '048', 3, '', '.د.ب', NULL, NULL),
(13, 'Taka', 'BDT', '050', 2, '', '৳', NULL, NULL),
(14, 'Barbados Dollar', 'BBD', '052', 2, '', '$', NULL, NULL),
(15, 'Belarusian Ruble', 'BYN', '933', 2, '', 'Br', NULL, NULL),
(16, 'Belize Dollar', 'BZD', '084', 2, '', '$', NULL, NULL),
(17, 'CFA Franc BCEAO', 'XOF', '952', 0, '', 'Fr', NULL, NULL),
(18, 'Bermudian Dollar', 'BMD', '060', 2, '', '$', NULL, NULL),
(19, 'Indian Rupee', 'INR', '356', 2, '', '₹', NULL, NULL),
(20, 'Ngultrum', 'BTN', '064', 2, '', 'Nu.', NULL, NULL),
(21, 'Boliviano', 'BOB', '068', 2, '', 'Bs', NULL, NULL),
(22, 'Mvdol', 'BOV', '984', 2, 'TRUE', 'Mvd', NULL, NULL),
(23, 'Convertible Mark', 'BAM', '977', 2, '', 'KM', NULL, NULL),
(24, 'Pula', 'BWP', '072', 2, '', 'P', NULL, NULL),
(25, 'Norwegian Krone', 'NOK', '578', 2, '', 'kr', NULL, NULL),
(26, 'Brazilian Real', 'BRL', '986', 2, '', 'R$', NULL, NULL),
(27, 'Bulgarian Lev', 'BGN', '975', 2, '', 'лв', NULL, NULL),
(28, 'Burundi Franc', 'BIF', '108', 0, '', 'Fr', NULL, NULL),
(29, 'Cabo Verde Escudo', 'CVE', '132', 2, '', '$', NULL, NULL),
(30, 'Riel', 'KHR', '116', 2, '', '៛', NULL, NULL),
(31, 'Canadian Dollar', 'CAD', '124', 2, '', '$', NULL, NULL),
(32, 'Cayman Islands Dollar', 'KYD', '136', 2, '', '$', NULL, NULL),
(33, 'Chilean Peso', 'CLP', '152', 0, '', '$', NULL, NULL),
(34, 'Unidad de Fomento', 'CLF', '990', 4, 'TRUE', 'UF', NULL, NULL),
(35, 'Yuan Renminbi', 'CNY', '156', 2, '', '¥', NULL, NULL),
(36, 'Colombian Peso', 'COP', '170', 2, '', '$', NULL, NULL),
(37, 'Unidad de Valor Real', 'COU', '970', 2, 'TRUE', 'UVR', NULL, NULL),
(38, 'Comorian Franc', 'KMF', '174', 0, '', 'Fr', NULL, NULL),
(39, 'Congolese Franc', 'CDF', '976', 2, '', 'Fr', NULL, NULL),
(40, 'New Zealand Dollar', 'NZD', '554', 2, '', '$', NULL, NULL),
(41, 'Costa Rican Colon', 'CRC', '188', 2, '', '₡', NULL, NULL),
(42, 'Cuban Peso', 'CUP', '192', 2, '', '$', NULL, NULL),
(43, 'CUC Convertible Peso', 'CUC', '931', 2, 'TRUE', '$', NULL, NULL),
(44, 'Czech Koruna', 'CZK', '203', 2, '', 'Kč', NULL, NULL),
(45, 'Danish Krone', 'DKK', '208', 2, '', 'kr', NULL, NULL),
(46, 'Djiboutian Franc', 'DJF', '262', 0, '', 'Fr', NULL, NULL),
(47, 'Dominican Peso', 'DOP', '214', 2, '', '$', NULL, NULL),
(48, 'Egyptian Pound', 'EGP', '818', 2, '', 'ج.م', NULL, NULL),
(49, 'El Salvador Colon', 'SVC', '222', 2, '', '₡', NULL, NULL),
(50, 'Equatorial Guinean Franc', 'XAF', '950', 0, '', 'Fr', NULL, NULL),
(51, 'Eritrean Nakfa', 'ERN', '232', 2, '', 'Nkf', NULL, NULL),
(52, 'Estonian Kroon', 'EEK', '233', 2, 'TRUE', 'kr', NULL, NULL),
(53, 'Ethiopian Birr', 'ETB', '230', 2, '', 'ብር', NULL, NULL),
(54, 'Falkland Islands Pound', 'FKP', '238', 2, '', '£', NULL, NULL),
(55, 'Faroe Islands Króna', 'FOK', '234', 2, '', 'kr', NULL, NULL),
(56, 'Fijian Dollar', 'FJD', '242', 2, '', '$', NULL, NULL),
(57, 'Gabonese Franc', 'XAF', '950', 0, '', 'Fr', NULL, NULL),
(58, 'Gambian Dalasi', 'GMD', '270', 2, '', 'D', NULL, NULL),
(59, 'Georgian Lari', 'GEL', '981', 2, '', '₾', NULL, NULL),
(60, 'German Mark', 'DEM', '276', 2, 'TRUE', 'DM', NULL, NULL),
(61, 'Ghanaian Cedi', 'GHS', '936', 2, '', '₵', NULL, NULL),
(62, 'Gibraltar Pound', 'GIP', '292', 2, '', '£', NULL, NULL),
(63, 'Greek Drachma', 'GRD', '300', 2, 'TRUE', '₯', NULL, NULL),
(64, 'Guatemalan Quetzal', 'GTQ', '320', 2, '', 'Q', NULL, NULL),
(65, 'Guinean Franc', 'GNF', '324', 0, '', 'Fr', NULL, NULL),
(66, 'Guyanaese Dollar', 'GYD', '328', 2, '', '$', NULL, NULL),
(67, 'Haitian Gourde', 'HTG', '332', 2, '', 'G', NULL, NULL),
(68, 'Honduran Lempira', 'HNL', '340', 2, '', 'L', NULL, NULL),
(69, 'Hong Kong Dollar', 'HKD', '344', 2, '', '$', NULL, NULL),
(70, 'Hungarian Forint', 'HUF', '348', 2, '', 'Ft', NULL, NULL),
(71, 'Icelandic Króna', 'ISK', '352', 0, '', 'kr', NULL, NULL),
(72, 'Indian Rupee', 'INR', '356', 2, '', '₹', NULL, NULL),
(73, 'Iranian Rial', 'IRR', '364', 2, '', '﷼', NULL, NULL),
(74, 'Iraqi Dinar', 'IQD', '368', 3, '', 'ع.د', NULL, NULL),
(75, 'Irish Pound', 'IEP', '372', 2, 'TRUE', '£', NULL, NULL),
(76, 'Israeli New Shekel', 'ILS', '376', 2, '', '₪', NULL, NULL),
(77, 'Italian Lira', 'ITL', '380', 2, 'TRUE', '₯', NULL, NULL),
(78, 'Jamaican Dollar', 'JMD', '388', 2, '', '$', NULL, NULL),
(79, 'Japanese Yen', 'JPY', '392', 0, '', '¥', NULL, NULL),
(80, 'Jordanian Dinar', 'JOD', '400', 3, '', 'د.ا', NULL, NULL),
(81, 'Kazakhstani Tenge', 'KZT', '398', 2, '', '₸', NULL, NULL),
(82, 'Kenyan Shilling', 'KES', '404', 2, '', 'KSh', NULL, NULL),
(83, 'Kiribati Dollar', 'KID', '296', 2, '', '$', NULL, NULL),
(84, 'Kuwaiti Dinar', 'KWD', '414', 3, '', 'د.ك', NULL, NULL),
(85, 'Kyrgystani Som', 'KGS', '417', 2, '', 'лв', NULL, NULL),
(86, 'Lao Kip', 'LAK', '418', 2, '', '₭', NULL, NULL),
(87, 'Latvian Lats', 'LVL', '428', 2, '', 'Ls', NULL, NULL),
(88, 'Lebanese Pound', 'LBP', '422', 2, '', 'ل.ل', NULL, NULL),
(89, 'Lesotho Loti', 'LSL', '426', 2, '', 'L', NULL, NULL),
(90, 'Liberian Dollar', 'LRD', '430', 2, '', '$', NULL, NULL),
(91, 'Libyan Dinar', 'LYD', '434', 3, '', 'د.ل', NULL, NULL),
(92, 'Lotus', 'LKR', '144', 2, '', 'Rs', NULL, NULL),
(93, 'Macanese Pataca', 'MOP', '446', 2, '', 'P', NULL, NULL),
(94, 'Malagasy Ariary', 'MGA', '969', 2, '', 'Ar', NULL, NULL),
(95, 'Malawi Kwacha', 'MWK', '454', 2, '', 'MK', NULL, NULL),
(96, 'Malaysian Ringgit', 'MYR', '458', 2, '', 'RM', NULL, NULL),
(97, 'Mauritanian Ouguiya', 'MRU', '478', 2, '', 'UM', NULL, NULL),
(98, 'Mauritian Rupee', 'MUR', '480', 2, '', '₨', NULL, NULL),
(99, 'Mexican Peso', 'MXN', '484', 2, '', '$', NULL, NULL),
(100, 'Mexican Unidad de Inversion', 'MXV', '979', 2, 'TRUE', 'UDI', NULL, NULL),
(101, 'Moldovan Leu', 'MDL', '498', 2, '', 'L', NULL, NULL),
(102, 'Mongolian Tugrik', 'MNT', '496', 2, '', '₮', NULL, NULL),
(103, 'Moroccan Dirham', 'MAD', '504', 2, '', 'د.م.', NULL, NULL),
(104, 'Moldovan Leu', 'MDL', '498', 2, '', 'L', NULL, NULL),
(105, 'Nepalese Rupee', 'NPR', '524', 2, '', 'Rs', NULL, NULL),
(106, 'Netherlands Antillean Guilder', 'ANG', '532', 2, '', 'ƒ', NULL, NULL),
(107, 'New Zealand Dollar', 'NZD', '554', 2, '', '$', NULL, NULL),
(108, 'Nigerian Naira', 'NGN', '566', 2, '', '₦', NULL, NULL),
(109, 'North Korean Won', 'KPW', '408', 2, '', '₩', NULL, NULL),
(110, 'Norwegian Krone', 'NOK', '578', 2, '', 'kr', NULL, NULL),
(111, 'Omani Rial', 'OMR', '512', 3, '', 'ر.ع.', NULL, NULL),
(112, 'Pakistani Rupee', 'PKR', '586', 2, '', '₨', NULL, NULL),
(113, 'Papua New Guinean Kina', 'PGK', '598', 2, '', 'K', NULL, NULL),
(114, 'Paraguayan Guarani', 'PYG', '600', 0, '', '₲', NULL, NULL),
(115, 'Peruvian Nuevo Sol', 'PEN', '604', 2, '', 'S/', NULL, NULL),
(116, 'Philippine Peso', 'PHP', '608', 2, '', '₱', NULL, NULL),
(117, 'Pakistani Rupee', 'PKR', '586', 2, '', '₨', NULL, NULL),
(118, 'Polish Zloty', 'PLN', '985', 2, '', 'zł', NULL, NULL),
(119, 'Qatari Rial', 'QAR', '634', 2, '', 'ر.ق', NULL, NULL),
(120, 'Romanian Leu', 'RON', '946', 2, '', 'lei', NULL, NULL),
(121, 'Russian Ruble', 'RUB', '643', 2, '', '₽', NULL, NULL),
(122, 'Rwandan Franc', 'RWF', '646', 0, '', 'Fr', NULL, NULL),
(123, 'Saint Helena Pound', 'SHP', '654', 2, '', '£', NULL, NULL),
(124, 'Samoan Tala', 'WST', '882', 2, '', 'T', NULL, NULL),
(125, 'San Marinese Lira', 'SML', '674', 2, 'TRUE', '₯', NULL, NULL),
(126, 'Sao Tome and Principe Dobra', 'STN', '678', 2, '', 'Db', NULL, NULL),
(127, 'Saudi Riyal', 'SAR', '682', 2, '', 'ر.س', NULL, NULL),
(128, 'Serbian Dinar', 'RSD', '941', 2, '', 'дин.', NULL, NULL),
(129, 'Seychellois Rupee', 'SCR', '690', 2, '', '₨', NULL, NULL),
(130, 'Sierra Leonean Leone', 'SLL', '694', 2, '', 'Le', NULL, NULL),
(131, 'Singapore Dollar', 'SGD', '702', 2, '', '$', NULL, NULL),
(132, 'Solomon Islands Dollar', 'SBD', '090', 2, '', '$', NULL, NULL),
(133, 'Somali Shilling', 'SOS', '706', 2, '', 'Sh', NULL, NULL),
(134, 'South African Rand', 'ZAR', '710', 2, '', 'R', NULL, NULL),
(135, 'South Korean Won', 'KRW', '410', 0, '', '₩', NULL, NULL),
(136, 'South Sudanese Pound', 'SSP', '728', 2, '', '£', NULL, NULL),
(137, 'Spanish Peseta', 'ESP', '998', 2, 'TRUE', '₧', NULL, NULL),
(138, 'Sri Lankan Rupee', 'LKR', '144', 2, '', 'Rs', NULL, NULL),
(139, 'Sierra Leonean Leone', 'SLL', '694', 2, '', 'Le', NULL, NULL),
(140, 'Sudanese Pound', 'SDG', '938', 2, '', 'ج.س', NULL, NULL),
(141, 'Surinamese Dollar', 'SRD', '968', 2, '', '$', NULL, NULL),
(142, 'Swedish Krona', 'SEK', '752', 2, '', 'kr', NULL, NULL),
(143, 'Swiss Franc', 'CHF', '756', 2, '', 'CHF', NULL, NULL),
(144, 'Syrian Pound', 'SYP', '760', 2, '', 'ل.س', NULL, NULL),
(145, 'Tajikistani Somoni', 'TJS', '972', 2, '', 'ЅМ', NULL, NULL),
(146, 'Tanzanian Shilling', 'TZS', '834', 2, '', 'TSh', NULL, NULL),
(147, 'Thai Baht', 'THB', '764', 2, '', '฿', NULL, NULL),
(148, 'Tonga Paʻanga', 'TOP', '776', 2, '', 'T$', NULL, NULL),
(149, 'Trinidad and Tobago Dollar', 'TTD', '780', 2, '', '$', NULL, NULL),
(150, 'Tunisian Dinar', 'TND', '788', 3, '', 'د.ت', NULL, NULL),
(151, 'Turkish Lira', 'TRY', '949', 2, '', '₺', NULL, NULL),
(152, 'Turkmenistani Manat', 'TMT', '934', 2, '', 'T', NULL, NULL),
(153, 'Ugandan Shilling', 'UGX', '800', 2, '', 'USh', NULL, NULL),
(154, 'Ukrainian Hryvnia', 'UAH', '980', 2, '', '₴', NULL, NULL),
(155, 'United Arab Emirates Dirham', 'AED', '784', 2, '', 'د.إ', NULL, NULL),
(156, 'United States Dollar', 'USD', '840', 2, '', '$', NULL, NULL),
(157, 'Uruguayan Peso', 'UYU', '858', 2, '', '$', NULL, NULL),
(158, 'Uzbekistani Som', 'UZS', '860', 2, '', 'лв', NULL, NULL),
(159, 'Vanuatu Vatu', 'VUV', '548', 0, '', 'Vt', NULL, NULL),
(160, 'Venezuelan Bolívar', 'VES', '928', 2, '', 'Bs', NULL, NULL),
(161, 'Vietnamese Dong', 'VND', '704', 0, '', '₫', NULL, NULL),
(162, 'Yemeni Rial', 'YER', '886', 2, '', '﷼', NULL, NULL),
(163, 'Zambian Kwacha', 'ZMW', '967', 2, '', 'ZK', NULL, NULL),
(164, 'Zaire', 'ZRZ', '180', 2, 'TRUE', 'Z', NULL, NULL),
(165, 'Zimbabwean Dollar', 'ZWL', '932', 2, '', '$', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `directors`
--

CREATE TABLE `directors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `place_of_birth` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `directors`
--

INSERT INTO `directors` (`id`, `name`, `bio`, `place_of_birth`, `date_of_birth`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Director 1', 'Biography of Director 1', 'Birth place of Director 1', '1981-01-21', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Director 2', 'Biography of Director 2', 'Birth place of Director 2', '1982-02-22', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 'Director 3', 'Biography of Director 3', 'Birth place of Director 3', '1983-03-23', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 'Director 4', 'Biography of Director 4', 'Birth place of Director 4', '1984-04-24', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 'Director 5', 'Biography of Director 5', 'Birth place of Director 5', '1985-05-25', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(6, 'Director 6', 'Biography of Director 6', 'Birth place of Director 6', '1986-06-26', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(7, 'Director 7', 'Biography of Director 7', 'Birth place of Director 7', '1987-07-27', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gateways`
--

CREATE TABLE `gateways` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `api_secret` varchar(255) NOT NULL,
  `short_info` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gateways`
--

INSERT INTO `gateways` (`id`, `name`, `api_key`, `api_secret`, `short_info`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Stripe', 'sk_test_4eC39HqLyjWDarjtT1zdp7dc', 'whsec_...', 'Stripe payment gateway', 'stripe.png', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Razorpay', 'rzp_test_...', '...', 'Razorpay payment gateway', 'razorpay.png', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `general_settings`
--

CREATE TABLE `general_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `keywords` text DEFAULT NULL,
  `header_code` text DEFAULT NULL,
  `footer_code` text DEFAULT NULL,
  `copyright_text` varchar(255) DEFAULT NULL,
  `default_timezone` varchar(255) DEFAULT NULL,
  `default_language` varchar(255) DEFAULT NULL,
  `styling` varchar(255) DEFAULT NULL,
  `currency_code` varchar(255) DEFAULT NULL,
  `tmdb_api_token` varchar(255) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `google_play_url` varchar(255) DEFAULT NULL,
  `apple_store_url` varchar(255) DEFAULT NULL,
  `gdpr_cookie_consent` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 is active, 2 is inactive',
  `gdpr_consent_title` varchar(255) DEFAULT NULL,
  `gdpr_consent_text` text DEFAULT NULL,
  `gdpr_privacy_url` varchar(255) DEFAULT NULL,
  `envato_username` varchar(255) DEFAULT NULL,
  `buyer_purchase_code` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `general_settings`
--

INSERT INTO `general_settings` (`id`, `name`, `logo`, `favicon`, `email`, `description`, `keywords`, `header_code`, `footer_code`, `copyright_text`, `default_timezone`, `default_language`, `styling`, `currency_code`, `tmdb_api_token`, `facebook_url`, `twitter_url`, `instagram_url`, `google_play_url`, `apple_store_url`, `gdpr_cookie_consent`, `gdpr_consent_title`, `gdpr_consent_text`, `gdpr_privacy_url`, `envato_username`, `buyer_purchase_code`, `created_at`, `updated_at`) VALUES
(1, 'Viavi Streaming - Watch TV Shows, Movies Online', 'logo.png', 'favicon.png', 'info@viavilab.com', 'Viavi Streaming is Best Script for Streaming Website & Application | Streaming App | Streaming Script | TV Streaming Source Code | TV Clone | Netflix Clone | Amazon Prime Clone | Hotstar Clone | Streaming App', 'Video Streaming, Streaming Website, Streaming App, Live TV, Movies, TV Shows', NULL, NULL, 'Copyright © 2024 www.viaviweb.com All Rights Reserved.', 'Asia/Kolkata', 'en', 'style-six', 'INR', NULL, 'https://www.facebook.com/viaviweb/', 'https://twitter.com/viaviwebtech/', 'https://www.instagram.com/viaviwebtech/', 'https://play.google.com/store/apps/dev?id=7157478532572017100', 'https://apps.apple.com/in/developer/vishal-pamar/id1141291247', 1, 'This website is using cookies', 'We use them to give you the best experience. If you continue using our website, we\'ll assume that you are happy to receive all cookies on this website.', 'https://example.com', 'abc', 'xyz', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete 1 is active 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Genre1', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(2, 'Genre2', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(3, 'Genre3', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(4, 'Genre4', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `imdb`
--

CREATE TABLE `imdb` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `imdb_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `imdb`
--

INSERT INTO `imdb` (`id`, `imdb_id`, `title`, `description`, `poster`, `created_at`, `updated_at`) VALUES
(1, 'tt0111161', 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'https://example.com/poster1.jpg', NULL, NULL),
(2, 'tt0068646', 'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'https://example.com/poster2.jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete 1 is active 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Bengali', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(2, 'Hindi', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(3, 'English', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(4, 'Spanish', 2, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(5, 'French', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_settings`
--

CREATE TABLE `maintenance_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'The Website Under Maintenance!',
  `description` text DEFAULT 'This Website Under Maintenance!',
  `secret` varchar(255) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `maintenance_settings`
--

INSERT INTO `maintenance_settings` (`id`, `title`, `description`, `secret`, `status`, `created_at`, `updated_at`) VALUES
(1, 'The Website Under Maintenance!', 'This Website Under Maintenance!', '123', 1, NULL, '2024-10-09 01:17:46');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_08_09_140603_create_roles_table', 1),
(5, '2024_08_09_140725_create_role_user_table', 1),
(6, '2024_08_12_055038_create_languages_table', 1),
(7, '2024_08_14_112012_create_genres_table', 1),
(8, '2024_08_17_040141_create_actors_table', 1),
(9, '2024_08_17_040142_create_directors_table', 1),
(10, '2024_08_17_040143_create_videos_table', 1),
(11, '2024_08_17_051712_create_upload_images_table', 1),
(12, '2024_08_20_055118_create_video_language_table', 1),
(13, '2024_08_20_055119_create_video_actor_table', 1),
(14, '2024_08_20_055119_create_video_director_table', 1),
(15, '2024_08_20_055120_create_video_genre_table', 1),
(16, '2024_08_20_055122_create_imdb_table', 1),
(17, '2024_08_20_055123_create_slider_table', 1),
(18, '2024_08_26_131239_create_sections_table', 1),
(19, '2024_08_26_131239_create_video_section_table', 1),
(20, '2024_08_27_074659_create_subscription_plans_table', 1),
(21, '2024_08_27_075121_create_coupons_table', 1),
(22, '2024_08_27_075122_create_coupon_user_table', 1),
(23, '2024_09_03_122110_create_gateways_table', 1),
(24, '2024_09_03_122258_create_transactions_table', 1),
(25, '2024_09_06_140802_create_pages_table', 1),
(26, '2024_09_10_090420_create_player_settings_table', 1),
(27, '2024_09_10_090447_create_player_ad_settings_table', 1),
(28, '2024_09_11_123327_create_general_settings_table', 1),
(29, '2024_09_17_072934_create_currencies_table', 1),
(30, '2024_09_17_073055_create_countries_table', 1),
(31, '2024_09_18_051107_create_smtp_email_settings_table', 1),
(32, '2024_09_19_110834_create_social_login_settings_table', 1),
(33, '2024_10_05_074813_create_maintenance_settings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `slug`, `description`, `order`, `status`, `created_at`, `updated_at`) VALUES
(1, 'About Us', 'about-us', NULL, 1, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Terms Of Use', 'terms-of-use', NULL, 2, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 'Privacy Policy', 'privacy-policy', NULL, 3, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 'FAQ', 'faq', NULL, 4, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 'Contact Us', 'contact-us', NULL, 5, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `player_ad_settings`
--

CREATE TABLE `player_ad_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `vast_type` enum('Local','URL') NOT NULL,
  `ad_video_local` varchar(255) DEFAULT NULL,
  `ad_video_url` varchar(255) DEFAULT NULL,
  `custom_ad1_source` varchar(255) DEFAULT NULL,
  `custom_ad1_timestart` varchar(255) DEFAULT NULL,
  `custom_ad1_link` varchar(255) DEFAULT NULL,
  `custom_ad2_source` varchar(255) DEFAULT NULL,
  `custom_ad2_timestart` varchar(255) DEFAULT NULL,
  `custom_ad2_link` varchar(255) DEFAULT NULL,
  `custom_ad3_source` varchar(255) DEFAULT NULL,
  `custom_ad3_timestart` varchar(255) DEFAULT NULL,
  `custom_ad3_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `player_ad_settings`
--

INSERT INTO `player_ad_settings` (`id`, `vast_type`, `ad_video_local`, `ad_video_url`, `custom_ad1_source`, `custom_ad1_timestart`, `custom_ad1_link`, `custom_ad2_source`, `custom_ad2_timestart`, `custom_ad2_link`, `custom_ad3_source`, `custom_ad3_timestart`, `custom_ad3_link`, `created_at`, `updated_at`) VALUES
(1, 'URL', 'demo.mp4', 'http://example.com/demo.mp4', 'http://example.com/ad1.mp4', '00:00:10', 'http://example.com/ad1-link', 'http://example.com/ad2.mp4', '00:00:20', 'http://example.com/ad2-link', 'http://example.com/ad3.mp4', '00:00:30', 'http://example.com/ad3-link', '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `player_settings`
--

CREATE TABLE `player_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `style` varchar(255) NOT NULL DEFAULT 'classic_skin_dark',
  `vector_icons` varchar(255) NOT NULL DEFAULT 'no',
  `autoplay` varchar(255) NOT NULL DEFAULT 'no',
  `rewind_forward` varchar(255) NOT NULL DEFAULT 'yes',
  `watermark` varchar(255) NOT NULL DEFAULT 'yes',
  `logo` varchar(255) DEFAULT NULL,
  `logo_position` varchar(255) NOT NULL DEFAULT 'topRight',
  `url` varchar(255) NOT NULL DEFAULT '#',
  `default_ads` varchar(255) NOT NULL DEFAULT 'Vast',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `player_settings`
--

INSERT INTO `player_settings` (`id`, `style`, `vector_icons`, `autoplay`, `rewind_forward`, `watermark`, `logo`, `logo_position`, `url`, `default_ads`, `created_at`, `updated_at`) VALUES
(1, 'classic_skin_dark', 'no', 'no', 'yes', 'yes', '/images/player_logo.png', 'topRight', 'http://exampleurl.com', 'Vast', '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 1, NULL, NULL),
(2, 'user', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`id`, `role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 2, NULL, NULL),
(3, 2, 11, NULL, NULL),
(4, 2, 3, NULL, NULL),
(5, 2, 4, NULL, NULL),
(6, 2, 5, NULL, NULL),
(7, 2, 6, NULL, NULL),
(8, 2, 7, NULL, NULL),
(9, 2, 8, NULL, NULL),
(10, 2, 9, NULL, NULL),
(11, 2, 10, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Section 1', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Section 2', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 'Section 3', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 'Section 4', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 'Section 5', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('Dfu9zsMvVEzMqrApFzorrgi2GYZrWOK2Mbf7CNnS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYVpzY3hWN1RRZGRCblZLRk85TXlWZ3F4UERmMVVDREVMTVNrb25saCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJuZXciO2E6MDp7fXM6Mzoib2xkIjthOjA6e319fQ==', 1728456488),
('Dzx0TS77fDnp6XeSv7HrhTc24jp9ify8Latd028W', 2, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoialJzVmhiR2xwQVIyVnp0QkM0bU0yV3FXNEppNXZ1YTVLN3Z4WDhaOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==', 1728455506),
('MEmoKmfZCK3bzhv7AcAUDBeCNiH4ghurYHKmjrZ3', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTUpJZlZPNXU3bXZCamdmcUplNFVaR28wcnVlVmpialNaVFR1TU1KNSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo1NToiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FkbWluL2FuZHJvaWQvdmVyaWZ5LXB1cmNoYXNlLWFwcCI7fX0=', 1728464538),
('pMMWzqsHwc2OTEjycn8ZsOmX9DHWmJ3ks7OzKx0j', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZEsyYmdLNEkzeWJNNVZxZlF0SG5xc0tvcDlia2FGSXRzd2VEaFdzZCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1728455879);

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `title`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Slider 1', 'slider_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Slider 2', 'slider_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 'Slider 3', 'slider_3.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 'Slider 4', 'slider_4.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 'Slider 5', 'slider_5.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `smtp_settings`
--

CREATE TABLE `smtp_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `host` varchar(255) NOT NULL,
  `port` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `encryption` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smtp_settings`
--

INSERT INTO `smtp_settings` (`id`, `host`, `port`, `email`, `password`, `encryption`, `created_at`, `updated_at`) VALUES
(1, 'mail.example.com', '465', 'info@example.com', 'secret', 'SSL', '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `social_logins`
--

CREATE TABLE `social_logins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `provider_name` varchar(255) NOT NULL,
  `client_id` varchar(255) DEFAULT NULL,
  `client_secret` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_logins`
--

INSERT INTO `social_logins` (`id`, `provider_name`, `client_id`, `client_secret`, `status`, `created_at`, `updated_at`) VALUES
(1, 'google', 'your-google-client-id', 'your-google-client-secret', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'facebook', 'your-facebook-app-id', 'your-facebook-client-secret', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `subscription_plans`
--

CREATE TABLE `subscription_plans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `duration_type` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `device_limit` int(11) DEFAULT NULL,
  `ads` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 is on , 2 is off',
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription_plans`
--

INSERT INTO `subscription_plans` (`id`, `name`, `duration`, `duration_type`, `price`, `device_limit`, `ads`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Basic Plan', '7', 1, 10.00, 1, 1, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Premium Plan', '1', 30, 29.99, 1, 1, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 'Platinum Plan', '6', 30, 99.00, 2, 1, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 'Diamond Plan', '1', 365, 149.00, 3, 2, 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `gateway_id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `response` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `gateway_id`, `transaction_id`, `amount`, `currency`, `status`, `response`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'txn_2_1_1', 179.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 2, 1, 'txn_2_1_2', 213.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 2, 1, 'txn_2_1_3', 213.00, 'USD', 'completed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 2, 2, 'txn_2_2_1', 296.00, 'USD', 'pending', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 2, 2, 'txn_2_2_2', 299.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(6, 2, 2, 'txn_2_2_3', 347.00, 'USD', 'completed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(7, 3, 1, 'txn_3_1_1', 68.00, 'USD', 'pending', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(8, 3, 1, 'txn_3_1_2', 371.00, 'USD', 'failed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(9, 3, 1, 'txn_3_1_3', 209.00, 'USD', 'completed', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(10, 3, 2, 'txn_3_2_1', 440.00, 'USD', 'pending', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(11, 3, 2, 'txn_3_2_2', 23.00, 'USD', 'completed', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(12, 3, 2, 'txn_3_2_3', 222.00, 'USD', 'failed', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(13, 4, 1, 'txn_4_1_1', 106.00, 'USD', 'failed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(14, 4, 1, 'txn_4_1_2', 207.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(15, 4, 1, 'txn_4_1_3', 56.00, 'USD', 'failed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(16, 4, 2, 'txn_4_2_1', 343.00, 'USD', 'failed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(17, 4, 2, 'txn_4_2_2', 246.00, 'USD', 'failed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(18, 4, 2, 'txn_4_2_3', 241.00, 'USD', 'failed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(19, 5, 1, 'txn_5_1_1', 61.00, 'USD', 'failed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(20, 5, 1, 'txn_5_1_2', 39.00, 'USD', 'failed', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(21, 5, 1, 'txn_5_1_3', 384.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(22, 5, 2, 'txn_5_2_1', 365.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(23, 5, 2, 'txn_5_2_2', 250.00, 'USD', 'completed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(24, 5, 2, 'txn_5_2_3', 292.00, 'USD', 'failed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(25, 6, 1, 'txn_6_1_1', 129.00, 'USD', 'pending', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(26, 6, 1, 'txn_6_1_2', 161.00, 'USD', 'pending', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(27, 6, 1, 'txn_6_1_3', 59.00, 'USD', 'completed', '{\"status\":\"completed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(28, 6, 2, 'txn_6_2_1', 218.00, 'USD', 'pending', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(29, 6, 2, 'txn_6_2_2', 319.00, 'USD', 'completed', '{\"status\":\"failed\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(30, 6, 2, 'txn_6_2_3', 25.00, 'USD', 'failed', '{\"status\":\"pending\"}', '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `upload_images`
--

CREATE TABLE `upload_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `img_for` varchar(30) NOT NULL,
  `parent_table_id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `upload_images`
--

INSERT INTO `upload_images` (`id`, `img_for`, `parent_table_id`, `filename`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 1, 'avatar_admin.jpg', 1, '2024-10-05 04:16:04', '2024-10-05 04:16:04'),
(2, 'user', 2, 'avatar_1.jpg', 1, '2024-10-05 04:16:04', '2024-10-05 04:16:04'),
(3, 'user', 3, 'avatar_2.jpg', 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(4, 'user', 4, 'avatar_3.jpg', 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(5, 'user', 5, 'avatar_4.jpg', 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(6, 'user', 6, 'avatar_5.jpg', 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(7, 'user', 7, 'avatar_6.jpg', 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(8, 'user', 8, 'avatar_7.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(9, 'user', 9, 'avatar_8.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(10, 'user', 10, 'avatar_9.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(11, 'user', 11, 'avatar_10.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(12, 'actor', 1, 'actor1_1.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(13, 'actor', 1, 'actor1_2.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(14, 'actor', 1, 'actor1_3.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(15, 'actor', 2, 'actor2_1.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(16, 'actor', 2, 'actor2_2.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(17, 'actor', 2, 'actor2_3.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(18, 'actor', 3, 'actor3_1.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(19, 'actor', 3, 'actor3_2.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(20, 'actor', 3, 'actor3_3.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(21, 'actor', 4, 'actor4_1.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(22, 'actor', 4, 'actor4_2.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(23, 'actor', 4, 'actor4_3.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(24, 'actor', 5, 'actor5_1.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(25, 'actor', 5, 'actor5_2.jpg', 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(26, 'actor', 5, 'actor5_3.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(27, 'actor', 6, 'actor6_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(28, 'actor', 6, 'actor6_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(29, 'actor', 6, 'actor6_3.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(30, 'actor', 7, 'actor7_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(31, 'actor', 7, 'actor7_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(32, 'actor', 7, 'actor7_3.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(33, 'actor', 8, 'actor8_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(34, 'actor', 8, 'actor8_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(35, 'actor', 8, 'actor8_3.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(36, 'actor', 9, 'actor9_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(37, 'actor', 9, 'actor9_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(38, 'actor', 9, 'actor9_3.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(39, 'director', 1, 'director1_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(40, 'director', 1, 'director1_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(41, 'director', 2, 'director2_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(42, 'director', 2, 'director2_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(43, 'director', 3, 'director3_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(44, 'director', 3, 'director3_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(45, 'director', 4, 'director4_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(46, 'director', 4, 'director4_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(47, 'director', 5, 'director5_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(48, 'director', 5, 'director5_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(49, 'director', 6, 'director6_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(50, 'director', 6, 'director6_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(51, 'director', 7, 'director7_1.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(52, 'director', 7, 'director7_2.jpg', 1, '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `user_expiry_date` timestamp NULL DEFAULT NULL,
  `subscription_plan_id` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `email_verified_at`, `password`, `remember_token`, `user_expiry_date`, `subscription_plan_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, NULL, '$2y$12$XXDu8mvHsPql1nu21HCjIuOFcbG3VEXUhGCTuVj2Tupp07Tvg0Ex2', NULL, NULL, NULL, 1, '2024-10-05 04:16:04', '2024-10-05 04:16:04'),
(2, 'User 1', 'user1@example.com', NULL, NULL, '$2y$12$S3CZOUUcP9ZIx1ah/muTKO8omcCHtYkMo05FSOnWyCiFQuushrMRm', NULL, '2025-10-05 04:16:04', 4, 1, '2024-10-05 04:16:04', '2024-10-05 04:16:04'),
(3, 'User 2', 'user2@example.com', NULL, NULL, '$2y$12$Lxfi0ItAayhcuia2.yvCC.j/KgB5dRI/lP77rxQv6CK/nRpBgAebK', NULL, '2026-10-05 04:16:05', 1, 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(4, 'User 3', 'user3@example.com', NULL, NULL, '$2y$12$Z83IALyZtAIXYaQe.cdsl.3fgmsNZHxzQ3FNfdNifUe.TV5f0rule', NULL, '2026-10-05 04:16:05', 3, 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(5, 'User 4', 'user4@example.com', NULL, NULL, '$2y$12$yA3VlQCE2x33eaX4S.EOme4xMBWVrMU/rn6EIM9aMYFjMTvfppcXS', NULL, '2025-10-05 04:16:05', 1, 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(6, 'User 5', 'user5@example.com', NULL, NULL, '$2y$12$fWZ2rH1XzQl/g9wNpP3OMu2kSwGAYekhNKZfsD1sSFdCuiTXSQt0u', NULL, '2025-10-05 04:16:05', 1, 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(7, 'User 6', 'user6@example.com', NULL, NULL, '$2y$12$GcXPUrL6j3oWZIB9syJkXesXPCa1QyI7Bsy8xZ.GbQNjKzbZdfdZm', NULL, '2025-10-05 04:16:05', 4, 1, '2024-10-05 04:16:05', '2024-10-05 04:16:05'),
(8, 'User 7', 'user7@example.com', NULL, NULL, '$2y$12$sjfRg9N3Wt0AW6IU4QroOeSfRBfz.ikXWREt1FKy5uzvvlYK.NhLS', NULL, '2025-10-05 04:16:06', 1, 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(9, 'User 8', 'user8@example.com', NULL, NULL, '$2y$12$45ajU0YaIS4SuvZKrLR8Ce/Rnfwv8Mmiz0fGEwlTxETJA3ub2YocO', NULL, '2026-10-05 04:16:06', 4, 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(10, 'User 9', 'user9@example.com', NULL, NULL, '$2y$12$uzA4ye6w1RkHdb0wIwhpOew659EQqQuL/1wg9RA/g8hX2e8kwRTkm', NULL, '2025-10-05 04:16:06', 2, 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06'),
(11, 'User 10', 'user10@example.com', NULL, NULL, '$2y$12$NTpFSO5TcqI4ryoOsM46c.fLXBc477cUtNSvk5CrakHxkjxrwrZnW', NULL, '2026-10-05 04:16:06', 2, 1, '2024-10-05 04:16:06', '2024-10-05 04:16:06');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `upcoming` enum('1','2') NOT NULL COMMENT '2 is inactive, 1 is active',
  `access` enum('free','paid') NOT NULL,
  `imdb_id` varchar(255) DEFAULT NULL,
  `imdb_rating` decimal(3,1) DEFAULT NULL,
  `content_rating` varchar(3) NOT NULL,
  `release_date` date DEFAULT NULL,
  `duration` varchar(8) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0 is delete, 1 is active, 2 is inactive',
  `seo_title` varchar(255) DEFAULT NULL,
  `meta_description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `trailer_url` varchar(255) DEFAULT NULL,
  `video_quality` int(11) DEFAULT NULL,
  `video_type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '1 is Local, 2 is URL, 3 is HLS, 4 is Embed',
  `video_local` varchar(255) DEFAULT NULL,
  `video_local_480` varchar(255) DEFAULT NULL,
  `video_local_720` varchar(255) DEFAULT NULL,
  `video_local_1080` varchar(255) DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `video_url_480` varchar(255) DEFAULT NULL,
  `video_url_720` varchar(255) DEFAULT NULL,
  `video_url_1080` varchar(255) DEFAULT NULL,
  `video_hls` varchar(255) DEFAULT NULL,
  `video_embed_code` varchar(255) DEFAULT NULL,
  `download_enable` enum('1','2') DEFAULT NULL COMMENT '2 is disable, 1 is enable',
  `download_url` varchar(255) DEFAULT NULL,
  `subtitle_enable` enum('1','2') DEFAULT NULL COMMENT '2 is disable, 1 is enable',
  `subtitle_language1` varchar(50) DEFAULT NULL,
  `subtitle_url1` varchar(255) DEFAULT NULL,
  `subtitle_language2` varchar(50) DEFAULT NULL,
  `subtitle_url2` varchar(255) DEFAULT NULL,
  `subtitle_language3` varchar(50) DEFAULT NULL,
  `subtitle_url3` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `name`, `description`, `upcoming`, `access`, `imdb_id`, `imdb_rating`, `content_rating`, `release_date`, `duration`, `status`, `seo_title`, `meta_description`, `keywords`, `thumbnail`, `poster`, `trailer_url`, `video_quality`, `video_type`, `video_local`, `video_local_480`, `video_local_720`, `video_local_1080`, `video_url`, `video_url_480`, `video_url_720`, `video_url_1080`, `video_hls`, `video_embed_code`, `download_enable`, `download_url`, `subtitle_enable`, `subtitle_language1`, `subtitle_url1`, `subtitle_language2`, `subtitle_url2`, `subtitle_language3`, `subtitle_url3`, `created_at`, `updated_at`) VALUES
(1, 'Video 1', 'Description of Video 1', '2', 'paid', 'tt0000001', 4.9, '16+', '2024-10-15', '120 min', 1, 'Video 1 Title', 'Meta description for Video 1', 'video, drama', 'thumbnail_1.jpg', 'poster_1.jpg', 'http://example.com/trailer1', 2, 2, 'video_local_1.mp4', 'video_local_480_1.mp4', 'video_local_720_1.mp4', 'video_local_1080_1.mp4', 'http://example.com/video1', 'http://example.com/video480_1', 'http://example.com/video720_1', 'http://example.com/video1080_1', 'http://example.com/video1.m3u8', '<iframe src=\"http://example.com/embed1\" frameborder=\"0\"></iframe>', '1', 'http://example.com/download1', '1', 'English', 'http://example.com/subtitle1_1.srt', 'French', 'http://example.com/subtitle2_1.srt', 'Spanish', 'http://example.com/subtitle3_1.srt', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(2, 'Video 2', 'Description of Video 2', '2', 'free', 'tt0000002', 9.5, '16+', '2024-10-25', '120 min', 1, 'Video 2 Title', 'Meta description for Video 2', 'video, drama', 'thumbnail_2.jpg', 'poster_2.jpg', 'http://example.com/trailer2', 2, 4, 'video_local_2.mp4', 'video_local_480_2.mp4', 'video_local_720_2.mp4', 'video_local_1080_2.mp4', 'http://example.com/video2', 'http://example.com/video480_2', 'http://example.com/video720_2', 'http://example.com/video1080_2', 'http://example.com/video2.m3u8', '<iframe src=\"http://example.com/embed2\" frameborder=\"0\"></iframe>', '1', 'http://example.com/download2', '1', 'English', 'http://example.com/subtitle1_2.srt', 'French', 'http://example.com/subtitle2_2.srt', 'Spanish', 'http://example.com/subtitle3_2.srt', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(3, 'Video 3', 'Description of Video 3', '1', 'free', 'tt0000003', 3.2, '16+', '2024-11-04', '120 min', 1, 'Video 3 Title', 'Meta description for Video 3', 'video, drama', 'thumbnail_3.jpg', 'poster_3.jpg', 'http://example.com/trailer3', 2, 4, 'video_local_3.mp4', 'video_local_480_3.mp4', 'video_local_720_3.mp4', 'video_local_1080_3.mp4', 'http://example.com/video3', 'http://example.com/video480_3', 'http://example.com/video720_3', 'http://example.com/video1080_3', 'http://example.com/video3.m3u8', '<iframe src=\"http://example.com/embed3\" frameborder=\"0\"></iframe>', '2', 'http://example.com/download3', '1', 'English', 'http://example.com/subtitle1_3.srt', 'French', 'http://example.com/subtitle2_3.srt', 'Spanish', 'http://example.com/subtitle3_3.srt', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(4, 'Video 4', 'Description of Video 4', '2', 'free', 'tt0000004', 3.2, '16+', '2024-11-14', '120 min', 1, 'Video 4 Title', 'Meta description for Video 4', 'video, drama', 'thumbnail_4.jpg', 'poster_4.jpg', 'http://example.com/trailer4', 2, 4, 'video_local_4.mp4', 'video_local_480_4.mp4', 'video_local_720_4.mp4', 'video_local_1080_4.mp4', 'http://example.com/video4', 'http://example.com/video480_4', 'http://example.com/video720_4', 'http://example.com/video1080_4', 'http://example.com/video4.m3u8', '<iframe src=\"http://example.com/embed4\" frameborder=\"0\"></iframe>', '2', 'http://example.com/download4', '2', 'English', 'http://example.com/subtitle1_4.srt', 'French', 'http://example.com/subtitle2_4.srt', 'Spanish', 'http://example.com/subtitle3_4.srt', '2024-10-05 04:16:07', '2024-10-05 04:16:07'),
(5, 'Video 5', 'Description of Video 5', '1', 'free', 'tt0000005', 1.1, '16+', '2024-11-24', '120 min', 1, 'Video 5 Title', 'Meta description for Video 5', 'video, drama', 'thumbnail_5.jpg', 'poster_5.jpg', 'http://example.com/trailer5', 2, 4, 'video_local_5.mp4', 'video_local_480_5.mp4', 'video_local_720_5.mp4', 'video_local_1080_5.mp4', 'http://example.com/video5', 'http://example.com/video480_5', 'http://example.com/video720_5', 'http://example.com/video1080_5', 'http://example.com/video5.m3u8', '<iframe src=\"http://example.com/embed5\" frameborder=\"0\"></iframe>', '2', 'http://example.com/download5', '2', 'English', 'http://example.com/subtitle1_5.srt', 'French', 'http://example.com/subtitle2_5.srt', 'Spanish', 'http://example.com/subtitle3_5.srt', '2024-10-05 04:16:07', '2024-10-05 04:16:07');

-- --------------------------------------------------------

--
-- Table structure for table `video_actor`
--

CREATE TABLE `video_actor` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `actor_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_actor`
--

INSERT INTO `video_actor` (`id`, `video_id`, `actor_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, 6, NULL, NULL),
(3, 2, 7, NULL, NULL),
(4, 3, 1, NULL, NULL),
(5, 3, 2, NULL, NULL),
(6, 3, 3, NULL, NULL),
(7, 3, 4, NULL, NULL),
(8, 3, 7, NULL, NULL),
(9, 4, 4, NULL, NULL),
(10, 4, 6, NULL, NULL),
(11, 5, 3, NULL, NULL),
(12, 5, 6, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `video_director`
--

CREATE TABLE `video_director` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `director_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_director`
--

INSERT INTO `video_director` (`id`, `video_id`, `director_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, NULL, NULL),
(2, 1, 7, NULL, NULL),
(3, 2, 2, NULL, NULL),
(4, 3, 3, NULL, NULL),
(5, 3, 4, NULL, NULL),
(6, 4, 5, NULL, NULL),
(7, 5, 6, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `video_genre`
--

CREATE TABLE `video_genre` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `genre_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_genre`
--

INSERT INTO `video_genre` (`id`, `video_id`, `genre_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 2, 4, NULL, NULL),
(5, 3, 1, NULL, NULL),
(6, 3, 3, NULL, NULL),
(7, 3, 4, NULL, NULL),
(8, 4, 2, NULL, NULL),
(9, 4, 4, NULL, NULL),
(10, 5, 1, NULL, NULL),
(11, 5, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `video_language`
--

CREATE TABLE `video_language` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `language_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_language`
--

INSERT INTO `video_language` (`id`, `video_id`, `language_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 3, NULL, NULL),
(3, 1, 5, NULL, NULL),
(4, 2, 1, NULL, NULL),
(5, 2, 3, NULL, NULL),
(6, 2, 5, NULL, NULL),
(7, 3, 5, NULL, NULL),
(8, 4, 5, NULL, NULL),
(9, 5, 2, NULL, NULL),
(10, 5, 4, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `video_section`
--

CREATE TABLE `video_section` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `video_id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `video_section`
--

INSERT INTO `video_section` (`id`, `video_id`, `section_id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, NULL, NULL),
(2, 2, 1, NULL, NULL),
(3, 1, 1, NULL, NULL),
(4, 5, 2, NULL, NULL),
(5, 4, 2, NULL, NULL),
(6, 1, 2, NULL, NULL),
(7, 4, 3, NULL, NULL),
(8, 2, 3, NULL, NULL),
(9, 5, 3, NULL, NULL),
(10, 2, 4, NULL, NULL),
(11, 3, 4, NULL, NULL),
(12, 1, 4, NULL, NULL),
(13, 3, 5, NULL, NULL),
(14, 1, 5, NULL, NULL),
(15, 4, 5, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actors`
--
ALTER TABLE `actors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_alpha_2_code_unique` (`alpha_2_code`),
  ADD UNIQUE KEY `countries_alpha_3_code_unique` (`alpha_3_code`),
  ADD UNIQUE KEY `countries_numeric_code_unique` (`numeric_code`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`);

--
-- Indexes for table `coupon_user`
--
ALTER TABLE `coupon_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coupon_user_coupon_id_foreign` (`coupon_id`),
  ADD KEY `coupon_user_user_id_foreign` (`user_id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `directors`
--
ALTER TABLE `directors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gateways`
--
ALTER TABLE `gateways`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `general_settings`
--
ALTER TABLE `general_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imdb`
--
ALTER TABLE `imdb`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `imdb_imdb_id_unique` (`imdb_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maintenance_settings`
--
ALTER TABLE `maintenance_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_title_unique` (`title`),
  ADD UNIQUE KEY `pages_slug_unique` (`slug`),
  ADD KEY `pages_order_index` (`order`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `player_ad_settings`
--
ALTER TABLE `player_ad_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `player_settings`
--
ALTER TABLE `player_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`),
  ADD KEY `role_user_user_id_foreign` (`user_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sliders_title_unique` (`title`);

--
-- Indexes for table `smtp_settings`
--
ALTER TABLE `smtp_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_logins`
--
ALTER TABLE `social_logins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_transaction_id_unique` (`transaction_id`),
  ADD KEY `transactions_user_id_foreign` (`user_id`),
  ADD KEY `transactions_gateway_id_foreign` (`gateway_id`);

--
-- Indexes for table `upload_images`
--
ALTER TABLE `upload_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `upload_images_img_for_index` (`img_for`),
  ADD KEY `upload_images_parent_table_id_index` (`parent_table_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video_actor`
--
ALTER TABLE `video_actor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_actor_video_id_foreign` (`video_id`),
  ADD KEY `video_actor_actor_id_foreign` (`actor_id`);

--
-- Indexes for table `video_director`
--
ALTER TABLE `video_director`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_director_video_id_foreign` (`video_id`),
  ADD KEY `video_director_director_id_foreign` (`director_id`);

--
-- Indexes for table `video_genre`
--
ALTER TABLE `video_genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_genre_video_id_foreign` (`video_id`),
  ADD KEY `video_genre_genre_id_foreign` (`genre_id`);

--
-- Indexes for table `video_language`
--
ALTER TABLE `video_language`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_language_video_id_foreign` (`video_id`),
  ADD KEY `video_language_language_id_foreign` (`language_id`);

--
-- Indexes for table `video_section`
--
ALTER TABLE `video_section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `video_section_video_id_foreign` (`video_id`),
  ADD KEY `video_section_section_id_foreign` (`section_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actors`
--
ALTER TABLE `actors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `coupon_user`
--
ALTER TABLE `coupon_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT for table `directors`
--
ALTER TABLE `directors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gateways`
--
ALTER TABLE `gateways`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `general_settings`
--
ALTER TABLE `general_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `imdb`
--
ALTER TABLE `imdb`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `maintenance_settings`
--
ALTER TABLE `maintenance_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `player_ad_settings`
--
ALTER TABLE `player_ad_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `player_settings`
--
ALTER TABLE `player_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `smtp_settings`
--
ALTER TABLE `smtp_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `social_logins`
--
ALTER TABLE `social_logins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subscription_plans`
--
ALTER TABLE `subscription_plans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `upload_images`
--
ALTER TABLE `upload_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `video_actor`
--
ALTER TABLE `video_actor`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `video_director`
--
ALTER TABLE `video_director`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `video_genre`
--
ALTER TABLE `video_genre`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `video_language`
--
ALTER TABLE `video_language`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `video_section`
--
ALTER TABLE `video_section`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `coupon_user`
--
ALTER TABLE `coupon_user`
  ADD CONSTRAINT `coupon_user_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coupon_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_gateway_id_foreign` FOREIGN KEY (`gateway_id`) REFERENCES `gateways` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `video_actor`
--
ALTER TABLE `video_actor`
  ADD CONSTRAINT `video_actor_actor_id_foreign` FOREIGN KEY (`actor_id`) REFERENCES `actors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_actor_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `video_director`
--
ALTER TABLE `video_director`
  ADD CONSTRAINT `video_director_director_id_foreign` FOREIGN KEY (`director_id`) REFERENCES `directors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_director_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `video_genre`
--
ALTER TABLE `video_genre`
  ADD CONSTRAINT `video_genre_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_genre_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `video_language`
--
ALTER TABLE `video_language`
  ADD CONSTRAINT `video_language_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_language_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `video_section`
--
ALTER TABLE `video_section`
  ADD CONSTRAINT `video_section_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_section_video_id_foreign` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
