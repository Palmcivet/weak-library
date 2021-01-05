/*
 Navicat Premium Data Transfer

 Source Server         : ASP
 Source Server Type    : MariaDB
 Source Server Version : 100412
 Source Host           : 10.1.122.74:3307
 Source Schema         : Library

 Target Server Type    : MariaDB
 Target Server Version : 100412
 File Encoding         : 65001

 Date: 01/01/2021 23:01:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book_info
-- ----------------------------
DROP TABLE IF EXISTS `book_info`;
CREATE TABLE `book_info` (
  `bar_code` int(11) NOT NULL AUTO_INCREMENT COMMENT '条形码，图书上架时编号',
  `indexes` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '图书索引号',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '书名',
  `type` int(11) NOT NULL COMMENT '上架类型',
  `author` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '作者',
  `press` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '出版社',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  PRIMARY KEY (`bar_code`),
  KEY `key_for_type` (`type`),
  CONSTRAINT `key_for_type` FOREIGN KEY (`type`) REFERENCES `book_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2430157 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of book_info
-- ----------------------------
BEGIN;
INSERT INTO `book_info` VALUES (2323231, 'TP324DF/DF34', 'old《Vue.js 权威指南》', 312, '梁浩', '机械工业出版社', 211.12);
INSERT INTO `book_info` VALUES (2323233, 'TP324DF/DF34', 'Vue.js 权威指南', 312, '梁浩', '机械工业出版社', 211.12);
INSERT INTO `book_info` VALUES (2342353, 'TP324A0/E3N0', 'CTF特训营', 315, 'FlappyPig战队', '机械工业出版社', 89.00);
INSERT INTO `book_info` VALUES (2342354, 'TP324A0/E3N0', 'CTF特训营', 315, 'FlappyPig战队', '机械工业出版社', 89.00);
INSERT INTO `book_info` VALUES (2342355, 'TP324A0/E3N0', 'CTF特训营', 315, 'FlappyPig战队', '机械工业出版社', 89.00);
INSERT INTO `book_info` VALUES (2430134, 'TP312RK/TU90', 'C Primer Plus', 311, 'Unknown', '机械工业出版社', 128.00);
INSERT INTO `book_info` VALUES (2430135, 'TP312RK/TU90', 'C Primer Plus', 311, 'Unknown', '机械工业出版社', 128.00);
INSERT INTO `book_info` VALUES (2430136, 'TP312RK/TU90', 'C Primer Plus', 311, 'Unknown', '机械工业出版社', 128.00);
INSERT INTO `book_info` VALUES (2430151, 'TP312RU/F090', '深入浅出Rust', 312, '范长春', '机械工业出版社', 89.00);
INSERT INTO `book_info` VALUES (2430152, 'TP312RU/F090', '深入浅出Rust', 312, '范长春', '机械工业出版社', 89.00);
INSERT INTO `book_info` VALUES (2430153, 'TP312RU/F090', '深入浅出Rust', 312, '范长春', '机械工业出版社', 89.00);
INSERT INTO `book_info` VALUES (2430155, 'TP232/ED234', 'CSS 权威指南', 311, 'Eric Veyaer', '中国电力出版社', 120.10);
COMMIT;

-- ----------------------------
-- Table structure for book_type
-- ----------------------------
DROP TABLE IF EXISTS `book_type`;
CREATE TABLE `book_type` (
  `type_id` int(11) NOT NULL,
  `type_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of book_type
-- ----------------------------
BEGIN;
INSERT INTO `book_type` VALUES (311, '程序设计/软件工程');
INSERT INTO `book_type` VALUES (312, '计算机/程序设计');
INSERT INTO `book_type` VALUES (313, '汇编程序');
INSERT INTO `book_type` VALUES (314, '编译程序/解释程序');
INSERT INTO `book_type` VALUES (315, '管理程序/管理系统');
INSERT INTO `book_type` VALUES (316, '操作系统');
COMMIT;

-- ----------------------------
-- Table structure for borrow_record
-- ----------------------------
DROP TABLE IF EXISTS `borrow_record`;
CREATE TABLE `borrow_record` (
  `record_key` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(11) NOT NULL COMMENT '用户 ID',
  `book_id` int(11) NOT NULL COMMENT '图书条形码',
  `borrow_date` date NOT NULL COMMENT '借书日期',
  `borrow_time` int(11) DEFAULT -1 COMMENT '借书时长',
  PRIMARY KEY (`record_key`) USING BTREE,
  KEY `key_for_user` (`user_id`),
  KEY `key_for_book` (`book_id`),
  CONSTRAINT `key_for_book` FOREIGN KEY (`book_id`) REFERENCES `book_info` (`bar_code`),
  CONSTRAINT `key_for_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2420348 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of borrow_record
-- ----------------------------
BEGIN;
INSERT INTO `borrow_record` VALUES (00000000001, 10503681, 2342353, '2020-12-02', 4);
INSERT INTO `borrow_record` VALUES (00000000002, 10708121, 2430153, '2020-10-10', -1);
INSERT INTO `borrow_record` VALUES (00000000003, 10503681, 2430151, '2020-12-02', 34);
INSERT INTO `borrow_record` VALUES (00000000004, 10708121, 2342353, '2020-10-10', -1);
INSERT INTO `borrow_record` VALUES (00000000006, 10706232, 2430151, '2020-12-02', -1);
INSERT INTO `borrow_record` VALUES (00002420347, 10503681, 2430151, '2020-12-22', -1);
COMMIT;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别。0 男；1 女',
  `role` tinyint(1) NOT NULL DEFAULT 1 COMMENT '角色。0 管理员；1 普通用户',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `register_date` datetime NOT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user_info
-- ----------------------------
BEGIN;
INSERT INTO `user_info` VALUES (10101010, 'old_user', 1, 0, '10101010', '2021-01-01 21:53:48', '11232342', '1231@wd.com');
INSERT INTO `user_info` VALUES (10503681, '赵六', 1, 1, '45reer23w', '2020-12-16 19:04:20', '13253456323', 'six@gg.com');
INSERT INTO `user_info` VALUES (10608229, '王五', 0, 0, 'admin', '2020-11-11 19:08:27', '12342354432', 'fire@hotfox.com');
INSERT INTO `user_info` VALUES (10706232, '李四', 1, 1, 'dffd@31f', '2020-10-15 22:04:35', '19985223354', '23412325@eml.com');
INSERT INTO `user_info` VALUES (10708121, '张三', 0, 0, 'Test123', '2019-12-18 14:04:44', '17789230025', 'zhang@san.com');
COMMIT;

-- ----------------------------
-- View structure for borrow_info
-- ----------------------------
DROP VIEW IF EXISTS `borrow_info`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `borrow_info` AS select `Library`.`book_info`.`bar_code` AS `bar_code`,`Library`.`book_info`.`indexes` AS `indexes`,`Library`.`book_info`.`name` AS `name`,`tmp`.`user_id` AS `user_id`,`tmp`.`borrow_date` AS `borrow_date`,`tmp`.`status` AS `status` from (`Library`.`book_info` join (select `Library`.`borrow_record`.`book_id` AS `book_id`,`Library`.`borrow_record`.`user_id` AS `user_id`,`Library`.`borrow_record`.`borrow_date` AS `borrow_date`,if(`Library`.`borrow_record`.`borrow_date` = -1,'借出','在架') AS `status` from `Library`.`borrow_record`) `tmp`) group by `Library`.`book_info`.`bar_code`;

SET FOREIGN_KEY_CHECKS = 1;
