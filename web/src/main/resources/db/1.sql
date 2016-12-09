/*
SQLyog Ultimate v11.13 (64 bit)
MySQL - 5.7.16 : Database - podsite
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`podsite` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `podsite`;


/*Table structure for table `tb_resource` */

DROP TABLE IF EXISTS `tb_resource`;

CREATE TABLE `tb_resource` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资源id',
  `s_parent_id` int(11) DEFAULT NULL COMMENT '资源父id',
  `s_name` varchar(100) NOT NULL COMMENT '资源名称',
  `s_source_key` varchar(100) NOT NULL COMMENT '资源唯一标识',
  `s_type` int(11) NOT NULL COMMENT '资源类型,0:目录;1:菜单;2:按钮',
  `s_source_url` varchar(500) DEFAULT NULL COMMENT '资源url',
  `s_level` int(11) DEFAULT NULL COMMENT '层级',
  `s_icon` varchar(100) DEFAULT '' COMMENT '图标',
  `s_is_hide` int(11) DEFAULT '0' COMMENT '是否隐藏',
  `s_description` varchar(100) DEFAULT NULL COMMENT '描述',
  `s_create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `s_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COMMENT='资源表';

/*Data for the table `tb_resource` */

insert  into `tb_resource`(`s_id`,`s_parent_id`,`s_name`,`s_source_key`,`s_type`,`s_source_url`,`s_level`,`s_icon`,`s_is_hide`,`s_description`,`s_create_time`,`s_update_time`) values (1,NULL,'控制台','desktop',0,'/welcome.jsp',1,'fa fa-tachometer',0,'控制台','2016-01-12 17:08:55','2016-02-25 14:07:48'),(2,NULL,'系统基础管理','system',0,'',1,'fa fa-list',0,'系统基础管理','2016-01-05 12:11:12','2016-02-25 14:07:48'),(3,2,'用户管理','system:user',0,'/user/listUI.html',2,'',0,'用户管理','2016-01-08 12:37:10','2016-06-30 20:53:36'),(4,2,'角色管理','system:role',0,'/role/listUI.html',2,'',0,'角色管理','2016-01-11 22:51:07','2016-06-30 20:53:38'),(5,2,'资源管理','system:resource',0,'/resource/listUI.html',2,'',0,'资源管理','2016-01-11 22:51:55','2016-06-30 20:53:40'),(6,NULL,'系统监控管理','monitor',0,'',1,'fa fa-pencil-square-o',0,'系统监控管理','2016-01-05 12:11:12','2016-02-25 14:07:48'),(7,6,'Sirona监控','monitor:sirona',0,'/sirona',2,'',0,'Sirona监控','2016-01-05 12:11:12','2016-06-30 20:53:41'),(8,6,'Druid监控','monitor:druid',0,'/druid',2,'',0,'Druid监控','2016-01-11 22:45:27','2016-06-30 20:53:44'),(9,NULL,'日志信息管理','logininfo',0,'',1,'fa fa-tag',0,'日志信息管理','2016-01-11 22:46:39','2016-02-25 14:07:48'),(10,9,'用户登录信息','logininfo:userLogin',0,'/loginInfo/listUI.html',2,'',0,'用户登录信息','2016-01-11 22:47:41','2016-02-25 14:07:48'),(11,3,'添加','user:add',1,'/user/add.html',3,NULL,0,'添加用户','2016-01-22 00:18:40','2016-11-03 17:18:50'),(12,3,'编辑','user:edit',1,'/user/edit.html',3,NULL,0,'编辑用户','2016-01-22 00:18:40','2016-10-27 11:35:27'),(13,3,'删除','user:deleteBatch',1,'/user/deleteBatch.html',NULL,NULL,0,'删除用户','2016-02-05 15:26:32','2016-06-30 20:54:44'),(14,3,'重置密码','user:resetPassword',1,'/user/resetPassword.html',NULL,NULL,0,'重置密码','2016-02-27 23:55:13','2016-06-30 20:54:45'),(15,4,'添加','role:add',1,'/role/add.html',NULL,NULL,0,'添加','2016-02-27 23:56:52','2016-06-30 20:54:46'),(16,4,'编辑','role:edit',1,'/role/edit.html',NULL,NULL,0,'编辑','2016-02-27 23:57:35','2016-06-30 20:54:47'),(17,4,'删除','role:deleteBatch',1,'/role/deleteBatch.html ',NULL,NULL,0,'删除','2016-02-27 23:58:02','2016-06-30 20:54:48'),(18,4,'分配权限','role:permission',1,'/role/permission.html',NULL,NULL,0,'分配权限','2016-02-27 23:59:20','2016-06-30 20:54:48'),(19,5,'添加','resource:add',1,'/resource/add.html',NULL,NULL,0,'添加','2016-02-28 00:01:15','2016-06-30 20:54:49'),(20,5,'编辑','resource:edit',1,'/resource/edit.html',NULL,NULL,0,'编辑','2016-02-28 00:02:01','2016-06-30 20:54:50'),(21,5,'删除','resource:deleteBatch',1,'/resource/deleteBatch.html',NULL,NULL,0,'删除','2016-02-28 00:03:03','2016-06-30 20:54:51'),(22,9,'用户操作信息','loginfo:userOperation',0,'/logInfo/listUI.html',NULL,'fa  fa-sticky-note-o',0,'用户操作信息','2016-03-08 22:00:36','2016-07-01 16:14:54'),(24,NULL,'一级菜单','menu',0,'',NULL,'fa  fa-asterisk',0,'一级菜单','2016-06-30 19:51:57','2016-06-30 19:51:57'),(25,24,'二级菜单','menu:menu1',0,'',NULL,'',0,'二级菜单','2016-06-30 19:54:01','2016-06-30 21:03:49'),(26,25,'三级菜单','menu:menu1:menu2',0,'',NULL,'fa  fa-cloud-download',0,'三级菜单','2016-06-30 19:54:29','2016-07-01 10:26:48'),(27,26,'四级菜单','menu:menu1:menu2:menu3',0,'/logInfo/listUI.html',NULL,'fa  fa-line-chart',0,'四级菜单','2016-06-30 19:55:53','2016-07-01 11:17:38'),(28,25,'三级菜单1','menu:menu1:menu21',0,'/logInfo/listUI.html',NULL,'fa  fa-balance-scale',0,'三级菜单1','2016-06-30 20:16:44','2016-07-01 16:37:53'),(29,24,'二级菜单1','menu:menu11',0,'/logInfo/listUI.html',NULL,'fa  fa-comment',0,'二级菜单1','2016-07-01 15:41:44','2016-07-01 15:42:05'),(30,1,'11','11',0,'111',NULL,'fa  fa-bug',0,'','2016-11-01 11:56:16','2016-11-01 11:56:16'),(31,NULL,'22','22',0,'22',NULL,'fa  fa-camera-retro',0,'','2016-11-01 11:56:35','2016-11-01 11:56:35'),(32,1,'da','ASSA',0,'sAs',NULL,'fa  fa-ban',0,'tty','2016-11-03 15:41:40','2016-11-04 12:00:02'),(33,NULL,'1qqw','ww',1,'ww',NULL,'fa  fa-battery-0',0,'','2016-11-04 14:48:23','2016-11-04 14:48:22');

/*Table structure for table `tb_resources_role` */

DROP TABLE IF EXISTS `tb_resources_role`;

CREATE TABLE `tb_resources_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s_id` int(11) DEFAULT NULL COMMENT '资源id',
  `r_id` int(11) DEFAULT NULL COMMENT '角色id',
  `t_create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_r_resource_role` (`s_id`),
  KEY `FK_r_role_resource` (`r_id`),
  CONSTRAINT `FK_r_resource_role` FOREIGN KEY (`s_id`) REFERENCES `tb_resource` (`s_id`),
  CONSTRAINT `FK_r_role_resource` FOREIGN KEY (`r_id`) REFERENCES `tb_role` (`r_id`)
) ENGINE=InnoDB AUTO_INCREMENT=449 DEFAULT CHARSET=utf8 COMMENT='角色权限映射表';

/*Data for the table `tb_resources_role` */

insert  into `tb_resources_role`(`id`,`s_id`,`r_id`,`t_create_time`) values(443,2,2,'2016-11-03 13:12:55'),(444,5,2,'2016-11-03 13:12:55'),(445,1,2,'2016-11-03 13:12:55'),(446,19,2,'2016-11-03 13:12:55'),(447,20,2,'2016-11-03 13:12:55'),(448,21,2,'2016-11-03 13:12:55');

/*Table structure for table `tb_role` */

DROP TABLE IF EXISTS `tb_role`;

CREATE TABLE `tb_role` (
  `r_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `r_name` varchar(50) NOT NULL COMMENT '角色名称',
  `r_key` varchar(50) NOT NULL COMMENT '角色key',
  `r_status` int(11) DEFAULT '0' COMMENT '角色状态,0：正常；1：删除',
  `r_description` varchar(100) DEFAULT NULL COMMENT '角色描述',
  `r_create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `r_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='角色表';

/*Data for the table `tb_role` */

insert  into `tb_role`(`r_id`,`r_name`,`r_key`,`r_status`,`r_description`,`r_create_time`,`r_update_time`) values (2,'管理员','admin',0,'管理员','2016-01-05 12:07:42','2016-02-27 22:30:22');

/*Table structure for table `tb_role_user` */

DROP TABLE IF EXISTS `tb_role_user`;

CREATE TABLE `tb_role_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `r_id` int(11) DEFAULT NULL COMMENT '角色id',
  `u_id` int(11) DEFAULT NULL COMMENT '用户id',
  `t_create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `FK_r_role_user` (`r_id`),
  KEY `FK_r_user_role` (`u_id`),
  CONSTRAINT `FK_r_role_user` FOREIGN KEY (`r_id`) REFERENCES `tb_role` (`r_id`),
  CONSTRAINT `FK_r_user_role` FOREIGN KEY (`u_id`) REFERENCES `tb_user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='用户角色映射表';

/*Data for the table `tb_role_user` */

insert  into `tb_role_user`(`id`,`r_id`,`u_id`,`t_create_time`) values (17,2,21,'2016-07-05 18:57:53');


/*Table structure for table `tb_user` */

DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `u_name` varchar(100) NOT NULL COMMENT '真实姓名',
  `u_account_name` varchar(100) NOT NULL COMMENT '账户名称',
  `u_password` varchar(100) NOT NULL COMMENT '用户密码',
  `u_delete_status` int(11) DEFAULT '0' COMMENT '逻辑删除状态',
  `u_locked` int(11) DEFAULT '0' COMMENT '是否锁定',
  `u_description` varchar(200) DEFAULT NULL COMMENT '用户描述',
  `u_credentials_salt` varchar(500) NOT NULL COMMENT '加密盐',
  `u_creator_name` varchar(100) NOT NULL COMMENT '创建者',
  `u_create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `u_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_account_name_unique` (`u_account_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='用户账户表';

/*Data for the table `tb_user` */

insert  into `tb_user`(`u_id`,`u_name`,`u_account_name`,`u_password`,`u_delete_status`,`u_locked`,`u_description`,`u_credentials_salt`,`u_creator_name`,`u_create_time`,`u_update_time`) values (21,'admin','admin@qq.com','VaNoSnm8zZFL6eIckR9nkQ==',0,0,'admin','6b8c008bd7d242f1b60d713f8e3b7422','admin@podsite.com','2016-07-05 18:57:53','2016-11-03 13:15:06');






/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
