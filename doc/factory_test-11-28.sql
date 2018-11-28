-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: factory_test
-- ------------------------------------------------------
-- Server version	5.6.24-log

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
-- Table structure for table `employee_info`
--

DROP TABLE IF EXISTS `employee_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `superior_id` int(10) unsigned NOT NULL COMMENT '上级ID',
  `process_type_id` int(10) unsigned NOT NULL,
  `employee_code` varchar(45) NOT NULL COMMENT '工号',
  `employee_name` varchar(45) NOT NULL COMMENT '名称',
  `register_time` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '生成时间',
  `disabled` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '是否禁用：0启用，1禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_code_UNIQUE` (`employee_code`),
  KEY `fk_employee_info_superior_id_idx` (`superior_id`),
  CONSTRAINT `fk_employee_info_superior_id` FOREIGN KEY (`superior_id`) REFERENCES `user_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='员工信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_info`
--

LOCK TABLES `employee_info` WRITE;
/*!40000 ALTER TABLE `employee_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process_type`
--

DROP TABLE IF EXISTS `process_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `process_name` varchar(45) NOT NULL,
  `disabled` int(10) unsigned NOT NULL DEFAULT '0',
  `process_code` float unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='工序类别';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process_type`
--

LOCK TABLES `process_type` WRITE;
/*!40000 ALTER TABLE `process_type` DISABLE KEYS */;
INSERT INTO `process_type` VALUES (6,'冲压',0,1),(7,'拉伸',0,2),(8,'焊接',0,3),(9,'抛光',0,4),(10,'包装',0,5),(11,'成品仓',0,6),(12,'半成品仓',0,7);
/*!40000 ALTER TABLE `process_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_info`
--

DROP TABLE IF EXISTS `role_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  `disabled` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_info`
--

LOCK TABLES `role_info` WRITE;
/*!40000 ALTER TABLE `role_info` DISABLE KEYS */;
INSERT INTO `role_info` VALUES (1,'管理员',0),(2,'主管',0);
/*!40000 ALTER TABLE `role_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(10) unsigned NOT NULL,
  `login_code` varchar(45) NOT NULL,
  `password` varbinary(32) DEFAULT NULL,
  `user_name` varchar(45) NOT NULL DEFAULT '',
  `sex` varchar(5) NOT NULL DEFAULT '',
  `disabled` int(10) unsigned NOT NULL DEFAULT '0',
  `password_src` varchar(45) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `fk_role_info_idx` (`role_id`),
  CONSTRAINT `fk_role_info` FOREIGN KEY (`role_id`) REFERENCES `role_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (26,2,'cjj','��5��zjk�\"�4삾v�x�)(jx','陈家杰','男',0,'123456'),(27,1,'tbr','mC@G��nI��V�j&C8w�%�v;�','锐哥','男',0,'123456');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'factory_test'
--

--
-- Dumping routines for database 'factory_test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-28 16:05:14
