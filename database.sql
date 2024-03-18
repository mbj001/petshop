CREATE DATABASE  IF NOT EXISTS `petshop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `petshop`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: petshop
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basket` (
  `basket_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) NOT NULL,
  `menu_id` int NOT NULL,
  `count` int NOT NULL DEFAULT '1',
  `total_price` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`basket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `user_id` varchar(40) NOT NULL,
  `user_pw` varchar(100) NOT NULL,
  `user_pw_confirm_number` int NOT NULL,
  `user_pw_confirm_answer` varchar(200) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_address` varchar(200) NOT NULL,
  `user_phone` varchar(30) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_gender` varchar(10) DEFAULT NULL,
  `user_birth` datetime DEFAULT NULL,
  `user_pet_info` varchar(200) DEFAULT NULL,
  `accumulate_point` int NOT NULL DEFAULT '0',
  `used_point` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('root','$2b$08$d1jI1Bk4qdg.VpzvdD3gZuhhrLY7Y8lkdUrqxCS/5vL52We/yxukK',5,'얼굴','민병준','','12341234','root@naver.com','male','1996-09-11 00:00:00','초롱이 19살',0,0);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `menu_id` int NOT NULL AUTO_INCREMENT,
  `division` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `total_sale` int NOT NULL DEFAULT '0',
  `image` varchar(100) DEFAULT NULL,
  `likey` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'gum','오리목뼈 150g',6000,1,'menu01.jpg',10),(2,'gum','오리갈비껌 8p',9500,3,'menu02.jpg',14),(3,'gum','오독오독 닭발 껌 100g',5500,1,'menu03.jpg',0),(4,'gum','돼지귀 오리말이 80g',7500,14,'menu04.jpg',0),(5,'gum','소아킬레스 껌 80g (소힘줄)',12000,0,'menu05.jpg',0),(6,'cookie','소고기 빼빼로 4p',5900,16,'menu06.jpg',0),(7,'cookie','단호박 소간칩쿠키 70g',5500,0,'menu07.gif',52),(8,'cookie','롤리팝 쿠키 50g',4800,29,'menu08.jpg',0),(9,'cookie','닭고기 뼈다귀쿠키 70g',4900,2,'menu09.jpg',0),(10,'cookie','고구마 치즈스틱 70g',5500,0,'menu10.gif',0),(11,'feed','고구마 야채 연어사료 200g',4800,3,'menu11.jpg',0),(12,'feed','고구마 야채 연어사료 1kg/2kg/5kg',22000,113,'menu12.jpg',15),(13,'feed','필드게인 닭고기 200g',4000,0,'menu13.jpg',0),(14,'feed','필드게인 닭고기사료 1kg/3kg/5kg',18000,0,'menu14.jpg',0),(15,'feed','필드게인 오리고기 200g',4000,0,'menu15.jpg',0),(16,'snack','연어고구마 아채쳐키 100g',6900,0,'menu16.jpg',0),(17,'snack','북어채(황태) 50g',6800,0,'menu17.jpg',0),(18,'snack','콜라겐 무뼈닭발 50g',6500,11,'menu18.jpg',0),(19,'snack','제주 말고기육포 50g',6500,0,'menu19.jpg',0),(20,'snack','오리가슴살 쳐키 100g',9500,0,'menu20.jpg',0),(21,'softfood','닭고기 테린 3p',4500,0,'menu21.jpg',0),(22,'softfood','삼색 닭고기 테린 3p',4900,0,'menu22.jpg',0),(23,'softfood','오리고기 테린 3p',5900,0,'menu23.jpg',0),(24,'softfood','연어북어 테린 3p',5900,0,'menu24.jpg',34),(25,'softfood','소고기 테린 3p',5900,0,'menu25.jpg',0),(26,'bakery','강아지 생일 케이크 상차림 패키지',29900,0,'menu26.jpg',0),(27,'bakery','강아지 생일 보틀 케이크 (화이트)',13500,0,'menu27.jpg',0),(28,'bakery','강아지 생일 보틀 케이크 (옐로우)',13500,1,'menu28.jpg',0),(29,'bakery','강아지 생일 보틀케이크 (핑크)',13500,1,'menu29.jpg',0),(31,'bakery','오리구이 연어 치즈케이크 미니',12000,0,'menu30.jpg',0),(32,'feed','필드게인 오리고기사료 1kg/3kg/5kg',18000,0,'menu31.jpg',0),(33,'feed','필드게인 양고기 200g',4000,0,'menu32.jpg',0),(34,'feed','필드게인 양고기사료 1kg/3kg/5kg',18000,0,'menu33.jpg',0),(35,'feed','필드게인 소고기 200g',4000,0,'menu34.jpg',0),(36,'feed','필드게인 소고기사료 1kg/3kg/5kg',18000,0,'menu35.jpg',0),(37,'feed','필드게인 라이트 200g',4000,0,'menu36.jpg',0),(38,'feed','필드게인 라이트사료 1kg/3kg/5kg',18000,0,'menu37.jpg',0),(39,'feed','고구마 야채 연어사료 200g(스틱형)',4800,0,'menu38.jpg',0),(40,'feed','필드게인 야채 연어사료 1kg/3kg/5kg (스틱형)',22000,0,'menu39.jpg',11),(41,'feed','필드게인 닭고기 200g (스틱형)',4000,0,'menu40.jpg',0),(42,'feed','필드게인 닭고기사료 1kg/3kg/5kg (스틱형)',18000,0,'menu41.jpg',0),(43,'feed','필드게인 오리고기 200g (스틱형)',4000,0,'menu42.jpg',0),(44,'feed','필드게인 오리고기사료 1kg/3kg/5kg (스틱형)',18000,0,'menu43.jpg',0),(45,'feed','필드게인 양고기사료 200g (스틱형)',4500,0,'menu44.jpg',0),(46,'feed','필드게인 양고기사료 1kg/3kg/5kg (스틱형)',18000,0,'menu45.jpg',0),(47,'feed','필드게인 소고기 200g (스틱형)',4000,0,'menu46.jpg',53),(48,'feed','필드게인 소고기사료 1kg/3kg/5kg (스틱형)',18000,0,'menu47.jpg',0),(49,'feed','필드게인 라이트 200g (스틱형)',4000,0,'menu48.jpg',0),(50,'feed','필드게인 라이트사료 1kg/3kg/5kg (스틱형)',18000,0,'menu49.jpg',0),(51,'snack','사사미 쳐키 100g/200g',6500,74,'menu50.jpg',0),(52,'snack','닭모래집(근위) 쳐키 80g',6500,0,'menu51.jpg',0),(53,'snack','소식도근 육포 50g',7500,0,'menu52.jpg',0),(54,'snack','오리 고구마치즈칩 50g',6900,0,'menu53.jpg',0),(55,'snack','소고기 고구마치즈칩 50g',7900,0,'menu54.jpg',0),(56,'snack','고구마 닭가슴살말이 100g',5900,0,'menu55.jpg',0),(57,'snack','고구마 오리말이 100g',6900,0,'menu56.jpg',65),(58,'snack','고구마 냠냠 100g',5500,0,'menu57.jpg',0),(59,'snack','단호박 닭가슴살 말이 100g',6900,0,'menu58.jpg',0),(60,'snack','쫄깃 닭가슴살 100g',6500,0,'menu59.jpg',0),(61,'snack','쫄깃 오리가슴살 100g',8500,0,'menu60.jpg',0),(62,'snack','말랑 포크쳐키 100g',5900,0,'menu61.jpg',0),(63,'snack','콜라겐 무뼈닭발 50g',6500,0,'menu62.jpg',0),(64,'gum','닭갈비 껌 10p',9500,0,'menu63.gif',0),(65,'gum','오리연골 50g',5500,0,'menu64.jpg',0),(66,'gum','닭고기 오돌뼈(연골) 40g',4900,0,'menu65.jpg',0),(67,'gum','돼지귀 슬라이스 80g',5900,0,'menu66.jpg',0),(68,'gum','왕 돼지 껌 2p / 5p',4000,0,'menu67.jpg',0),(69,'gum','오리날개 6p',5000,0,'menu68.jpg',0),(70,'gum','송아지목뼈 100g',6900,0,'menu69.jpg',0),(71,'gum','캥거루꼬리 100g',7500,0,'menu70.jpg',0),(72,'gum','우족 2p / 미니우족 4p',5500,0,'menu71.jpg',0),(74,'gum','소떡심 껌 80g',6800,0,'menu73.jpg',0),(75,'gum','삼각 돼지귀 80g',4900,12,'menu74.jpg',0),(76,'snack','한우우피 봉봉(소) 50g( 4p )',5900,0,'menu75.jpg',0),(77,'softfood','부드러운 닭가슴살구이 100g',4900,0,'menu76.gif',0),(78,'softfoof','오리가슴살 구이 100g',6900,0,'menu77.jpg',13),(79,'softfood','닭모래집 구이 100g',5900,0,'menu78.jpg',0),(80,'softfood','소고기 육포 50g',7500,0,'menu79.jpg',0),(81,'softfood','소염통 구이 100g',6500,0,'menu80.jpg',0),(82,'softfood','쫀득 연어큐브 50g',6000,0,'menu81.jpg',0),(83,'softfood','북어고구마 야채스틱 50g',7500,0,'menu82.jpg',0),(84,'softfood','동결건조 닭가슴살 50g',6900,0,'menu83.jpg',0),(85,'softfood','동결건조 오리가슴살 50g',9500,0,'menu84.jpg',0),(86,'cookie','연어 당근 쿠키 50g',4800,0,'menu85.jpg',0),(87,'cookie','칼슘듬뿍 멸치쿠키 50g',4800,0,'menu86.jpg',0),(88,'cookie','소간 미니 쿠키 50g',4800,0,'menu87.jpg',0),(89,'cookie','산양유 오트밀쿠키 50g',4800,0,'menu88.jpg',0),(90,'cookie','캐롭 코코넛쿠키 50g',4800,0,'menu89.jpg',0),(91,'bakery','오리구이 연어 치즈케이크 1호',15900,332,'menu90.jpg',0),(92,'bakery','닭고기 단호박케이크',13500,0,'menu91.jpg',0),(93,'bakery','오리야채 고구마크림 케이크',25900,0,'menu92.jpg',0),(94,'bakery','강아지 멜팅 도넛 2p',6900,0,'menu93.jpg',0),(95,'bakery','연어 소세지빵 3p',5900,0,'menu94.jpg',0),(96,'bakery','소고기 댕버거',5900,0,'menu95.jpg',0),(97,'bakery','강아지 치킨',6500,0,'menu96.jpg',44),(98,'bakery','강아지 치즈붕어빵 3p',5500,0,'menu97.jpg',0),(99,'deco','숫자양초(0~9)',800,0,'menu98.jpg',0),(100,'deco','빨간하트초',800,0,'menu99.jpg',0),(101,'deco','핑크하트초 1p',800,0,'menu100.jpg',0),(102,'deco','미니 핑크하트초 1p (색상랜덤)',600,0,'menu101.jpg',0),(103,'deco','데이지초 1p',800,0,'menu102.jpg',0),(104,'deco','미니 스마일초 1p (색상랜덤)',600,0,'menu103.jpg',0),(105,'deco','스마일초 1p',800,0,'menu104.jpg',0),(106,'deco','강아지 생일파티 미니 고깔모지 1p',6000,0,'menu105.jpg',0),(107,'deco','별 고깔모자(핑크/블루)',1800,0,'menu106.jpg',0),(108,'deco','데이지 가랜드',3000,0,'menu107.jpg',0),(109,'deco','캘리그래피 가랜드',4000,0,'menu108.jpg',0),(110,'powder','닭고기 파우더 50g',4500,0,'menu109.jpg',0),(111,'powder','오리고기 파우더 50g',6500,0,'menu110.jpg',0),(112,'powder','북어 파우더 50g',7500,0,'menu111.jpg',0),(113,'powder','칼숨멸치 파우더 50g',5500,0,'menu112.jpg',0),(114,'powder','소간 파우더 100g',5500,0,'menu113.jpg',0),(115,'powder','동결건조 닭가슴살 파우더 50g',6500,0,'menu114.jpg',0),(116,'powder','동결건조 오리가슴살 파우더 50g',8500,0,'menu115.jpg',0),(117,'powder','연어파우더 50g',6500,0,'menu116.jpg',0),(118,'powder','소지라(철분) 파우더 50g',4000,0,'menu117.jpg',0),(119,'premium','[강아지유산균]이너펫 프로바이오틱스 30포',25900,0,'menu118.jpg',0);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_payment`
--

DROP TABLE IF EXISTS `order_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_payment` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) NOT NULL,
  `menu_id` int NOT NULL,
  `count` int NOT NULL,
  `amount_price` int NOT NULL,
  `delivery_complete` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_payment`
--

LOCK TABLES `order_payment` WRITE;
/*!40000 ALTER TABLE `order_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('I2plMg6Lg_aK6Oxkb5nDJVK46r6QVXvT',1710773258,'{\"cookie\":{\"originalMaxAge\":7200000,\"expires\":\"2024-03-18T14:47:37.531Z\",\"secure\":false,\"httpOnly\":false,\"path\":\"/\"},\"passport\":{\"user\":\"root\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-18 23:34:04
