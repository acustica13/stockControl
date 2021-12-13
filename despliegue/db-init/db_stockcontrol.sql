-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 08-12-2021 a las 13:36:51
-- Versión del servidor: 10.6.4-MariaDB-1:10.6.4+maria~focal
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_stockcontrol`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `batch`
--

CREATE TABLE `batch` (
  `id` bigint(20) NOT NULL,
  `expiration_date` date DEFAULT NULL,
  `item_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `batch`
--

INSERT INTO `batch` (`id`, `expiration_date`, `item_id`) VALUES
(1, '2021-12-18', 1),
(2, '2021-12-18', 2),
(3, '2021-12-18', 3),
(4, '2021-12-18', 1),
(5, '2021-12-18', 4),
(6, '2021-12-18', 5),
(7, '2021-12-18', 3),
(8, '2021-12-18', 6),
(9, '2021-12-18', 7),
(10, '2021-12-18', 5),
(11, '2021-12-18', 8),
(12, '2021-12-18', 9),
(13, '2021-12-18', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'categoria1'),
(2, 'categoria2'),
(3, 'categoria3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` bigint(20) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `date_purchase` date DEFAULT NULL,
  `discontinued` bit(1) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price_purchase` double DEFAULT NULL,
  `price_sale` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `supplier_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id`, `brand`, `color`, `date_purchase`, `discontinued`, `discount`, `name`, `price_purchase`, `price_sale`, `stock`, `supplier_id`) VALUES
(1, 'Adidas', 'rojo', '2021-12-08', b'0', 10, 'item1', 15, 25, 10, NULL),
(2, 'Nike', 'azul', '2021-12-08', b'0', 0, 'item2', 10, 20, 5, NULL),
(3, 'Reebok', 'azul', '2021-12-08', b'1', 0, 'item2', 5, 30, 5, NULL),
(4, 'Nike', 'azul', '2021-12-08', b'0', 25, 'item3', 10, 20, 3, NULL),
(5, 'Reebok', 'rojo', '2021-12-08', b'0', 8, 'item3', 20, 40, 7, NULL),
(6, 'Nike', 'verde', '2021-12-08', b'1', 0, 'item3', 15, 50, 5, NULL),
(7, 'Nike', 'verde', '2021-12-08', b'0', 0, 'item3', 10, 20, 8, NULL),
(8, 'Nike', 'azul', '2021-12-08', b'0', 0, 'item4', 10, 20, 10, NULL),
(9, 'Nike', 'azul', '2021-12-08', b'0', 0, 'item2', 10, 20, 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_categories`
--

CREATE TABLE `items_categories` (
  `item_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `items_categories`
--

INSERT INTO `items_categories` (`item_id`, `category_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 1),
(3, 3),
(4, 1),
(4, 3),
(5, 1),
(5, 3),
(6, 1),
(6, 3),
(7, 1),
(7, 3),
(8, 1),
(8, 3),
(9, 1),
(9, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `role_name`) VALUES
(1, 'ADMIN'),
(2, 'USER');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shop`
--

CREATE TABLE `shop` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shop`
--

INSERT INTO `shop` (`id`, `email`, `location`, `name`, `phone`, `postcode`) VALUES
(1, 'tienda1@email.com', 'Chiclana', 'tienda1', 622003355, 11130),
(2, 'tienda2@email.com', 'Cádiz', 'tienda2', 622003322, 11111);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shops_items`
--

CREATE TABLE `shops_items` (
  `shop_id` bigint(20) NOT NULL,
  `item_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shops_items`
--

INSERT INTO `shops_items` (`shop_id`, `item_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(1, 3),
(2, 4),
(1, 5),
(2, 6),
(1, 7),
(2, 8),
(1, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supplier`
--

CREATE TABLE `supplier` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `postcode` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `supplier`
--

INSERT INTO `supplier` (`id`, `email`, `location`, `name`, `phone`, `postcode`) VALUES
(1, 'proveedor1@email.com', 'Jerez', 'Proveedor1', 666001122, 11130),
(2, 'proveedor2@email.com', 'Cádiz', 'Proveedor2', 666001123, 11150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `shop_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `surname`, `token`, `shop_id`) VALUES
(1, 'usuario1@email.com', 'Paula', '$2a$10$EqyGjcr6w4WPBjipf81ML.DcAP8.mFIwnaw1gqWf19F8jv/XV/.re', 'Pavon', NULL, 1),
(2, 'usuario2@email.com', 'Jaime', '$2a$10$ewF7sd0fktZNEOMi9vPPGuo7hTJmPvjOV6hIWfQioa14swHITiaMG', 'Pavon', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_roles`
--

CREATE TABLE `usuarios_roles` (
  `id_usuario` bigint(20) NOT NULL,
  `id_rol` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_roles`
--

INSERT INTO `usuarios_roles` (`id_usuario`, `id_rol`) VALUES
(1, 1),
(2, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `batch`
--
ALTER TABLE `batch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6ps6ia2lh0m6t66r08qailry8` (`item_id`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKcjes46ncuefgrkgt6ib0oo2bb` (`supplier_id`);

--
-- Indices de la tabla `items_categories`
--
ALTER TABLE `items_categories`
  ADD PRIMARY KEY (`item_id`,`category_id`),
  ADD KEY `FKpusi8x87rspq9efoa8p1p1j5n` (`category_id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `shops_items`
--
ALTER TABLE `shops_items`
  ADD PRIMARY KEY (`item_id`,`shop_id`),
  ADD KEY `FKrw75ksna6g3reo30dhrnbf96y` (`shop_id`);

--
-- Indices de la tabla `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD KEY `FKophlo4m4uodyxvpnqf1a6d4vn` (`shop_id`);

--
-- Indices de la tabla `usuarios_roles`
--
ALTER TABLE `usuarios_roles`
  ADD PRIMARY KEY (`id_usuario`,`id_rol`),
  ADD KEY `FK3qqjy9vnue23039vjwmicm33x` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `batch`
--
ALTER TABLE `batch`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `shop`
--
ALTER TABLE `shop`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `batch`
--
ALTER TABLE `batch`
  ADD CONSTRAINT `FK6ps6ia2lh0m6t66r08qailry8` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `FKcjes46ncuefgrkgt6ib0oo2bb` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);

--
-- Filtros para la tabla `items_categories`
--
ALTER TABLE `items_categories`
  ADD CONSTRAINT `FK5cm978bydhi5di2d4b4igocs1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `FKpusi8x87rspq9efoa8p1p1j5n` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Filtros para la tabla `shops_items`
--
ALTER TABLE `shops_items`
  ADD CONSTRAINT `FKirsvshjtffhtc7mxj3hq9rre9` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `FKrw75ksna6g3reo30dhrnbf96y` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKophlo4m4uodyxvpnqf1a6d4vn` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Filtros para la tabla `usuarios_roles`
--
ALTER TABLE `usuarios_roles`
  ADD CONSTRAINT `FK3qqjy9vnue23039vjwmicm33x` FOREIGN KEY (`id_rol`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `FKp913qbxpo7f173glqkax9o0v2` FOREIGN KEY (`id_usuario`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
