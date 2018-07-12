CREATE DATABASE  IF NOT EXISTS `db_displaymanager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `db_displaymanager`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: db_displaymanager
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_building`
--

DROP TABLE IF EXISTS `tb_building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_building` (
  `building_id` varchar(45) NOT NULL,
  `building_name` varchar(100) DEFAULT NULL,
  `building_address` varchar(450) DEFAULT NULL,
  `building_orgId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`building_id`),
  KEY `building_to_org_idx` (`building_orgId`),
  CONSTRAINT `building_to_org` FOREIGN KEY (`building_orgId`) REFERENCES `tb_org` (`org_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_cookies`
--

DROP TABLE IF EXISTS `tb_cookies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cookies` (
  `cookie_id` varchar(45) NOT NULL,
  `cookie_siteId` varchar(45) DEFAULT NULL,
  `cookie_name` varchar(450) DEFAULT NULL,
  `cookie_value` varchar(450) DEFAULT NULL,
  `cookie_url` varchar(450) DEFAULT NULL,
  `cookie_domain` varchar(450) DEFAULT NULL,
  `cookie_path` varchar(450) DEFAULT NULL,
  `cookie_expiration` varchar(450) DEFAULT NULL,
  `cookie_isSecure` tinyint(4) DEFAULT NULL,
  `cookie_isHttpOnly` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`cookie_id`),
  KEY `cookie_to_site_idx` (`cookie_siteId`),
  CONSTRAINT `cookie_to_site` FOREIGN KEY (`cookie_siteId`) REFERENCES `tb_sites` (`site_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_floor`
--

DROP TABLE IF EXISTS `tb_floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_floor` (
  `floor_id` varchar(45) NOT NULL,
  `floor_name` varchar(100) DEFAULT NULL,
  `floor_buildingId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`floor_id`),
  KEY `floor_to_building_idx` (`floor_buildingId`),
  CONSTRAINT `floor_to_building` FOREIGN KEY (`floor_buildingId`) REFERENCES `tb_building` (`building_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_js`
--

DROP TABLE IF EXISTS `tb_js`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_js` (
  `js_id` varchar(45) NOT NULL,
  `js_siteId` varchar(45) DEFAULT NULL,
  `js_command` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`js_id`),
  KEY `js_to_site_idx` (`js_siteId`),
  CONSTRAINT `js_to_site` FOREIGN KEY (`js_siteId`) REFERENCES `tb_sites` (`site_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_new_devices`
--

DROP TABLE IF EXISTS `tb_new_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_new_devices` (
  `new_device_id` varchar(45) NOT NULL,
  `new_device_ip` varchar(45) DEFAULT NULL,
  `new_device_model` varchar(45) DEFAULT NULL,
  `new_device_serial` varchar(45) DEFAULT NULL,
  `new_device_timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`new_device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_org`
--

DROP TABLE IF EXISTS `tb_org`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_org` (
  `org_id` varchar(45) NOT NULL,
  `org_name` varchar(45) DEFAULT NULL,
  `org_image` varchar(45) DEFAULT NULL,
  `org_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_players`
--

DROP TABLE IF EXISTS `tb_players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_players` (
  `player_id` varchar(20) NOT NULL,
  `player_name` varchar(100) DEFAULT NULL,
  `player_description` varchar(450) DEFAULT NULL,
  `player_lastPing` varchar(45) DEFAULT NULL,
  `player_type` varchar(100) DEFAULT NULL,
  `player_location` varchar(100) DEFAULT NULL,
  `player_serialnumber` varchar(100) DEFAULT NULL,
  `player_roomId` varchar(45) DEFAULT NULL,
  `player_OS` varchar(45) DEFAULT NULL,
  `player_OSVersion` varchar(45) DEFAULT NULL,
  `player_freeSpace` varchar(45) DEFAULT NULL,
  `player_CPU` varchar(45) DEFAULT NULL,
  `player_IP` varchar(45) DEFAULT NULL,
  `player_MAC` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`player_id`),
  KEY `player_to_room_idx` (`player_roomId`),
  CONSTRAINT `player_to_room` FOREIGN KEY (`player_roomId`) REFERENCES `tb_room` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_room`
--

DROP TABLE IF EXISTS `tb_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_room` (
  `room_id` varchar(45) NOT NULL,
  `room_name` varchar(100) DEFAULT NULL,
  `room_floorId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `room_to_floor_idx` (`room_floorId`),
  CONSTRAINT `room_to_floor` FOREIGN KEY (`room_floorId`) REFERENCES `tb_floor` (`floor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_screens`
--

DROP TABLE IF EXISTS `tb_screens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_screens` (
  `screen_id` varchar(40) NOT NULL,
  `screen_name` varchar(100) DEFAULT NULL,
  `screen_description` varchar(450) DEFAULT NULL,
  `screen_lastping` varchar(45) DEFAULT NULL,
  `screen_layout` varchar(45) DEFAULT NULL,
  `screen_playerId` varchar(45) DEFAULT NULL,
  `screen_electronScreenId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`screen_id`),
  KEY `screen_to_player_idx` (`screen_playerId`),
  CONSTRAINT `screen_to_player` FOREIGN KEY (`screen_playerId`) REFERENCES `tb_players` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_sites`
--

DROP TABLE IF EXISTS `tb_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_sites` (
  `site_id` varchar(45) NOT NULL,
  `site_url` varchar(1000) DEFAULT NULL,
  `site_description` varchar(450) DEFAULT NULL,
  `site_position` varchar(45) DEFAULT NULL,
  `site_screenId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`site_id`),
  KEY `site_to_screen_idx` (`site_screenId`),
  CONSTRAINT `site_to_screen` FOREIGN KEY (`site_screenId`) REFERENCES `tb_screens` (`screen_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-11  0:18:35
