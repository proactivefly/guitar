/*结构化查询语言语法*/
/*多行注释*/
#单行注释
#所有的语句都必须以;结尾
#sql语言不区分大小写，习惯上，关键字大写；非关键字小写

#指定后续的sql语句所采用的字符编码，SQL中的UTF不带-
SET NAMES UTF8;

#查看数据库服务器中都有哪些库
SHOW DATABASES;

#试着删除一个数据库
#DROP DATABASE jd;
#试着删除一个数据库（如果存在的话）
DROP DATABASE IF EXISTS jd;

#创建一个数据库
CREATE DATABASE jd CHARSET=UTF8;

#进入一个数据库
USE jd;


#试着删除一个表（如果存在的话）
#DROP TABLE IF EXISTS emp;

#创建一个表，保存员工的信息
CREATE TABLE emp(
	eid INT PRIMARY KEY AUTO_INCREMENT,	#主键列，不允许为null也不允许重复,并且自动增长
	name VARCHAR(16),
	sex VARCHAR(1),
	salary FLOAT(8,2),
	birthday DATE
);

#查看此数据库中有哪些表
SHOW TABLES;


#向员工表中插入记录行,SQL中的字符串/日期必须使用单引号，数字可以使用单引号，也可以不用
INSERT INTO emp VALUES(	101,'Tom','M','8000','1990-10-10');
INSERT INTO emp VALUES(	102,'Maria','F','8500','1980-3-5');
INSERT INTO emp VALUES(	103,'张三','男','20000','1970-3-5');
INSERT INTO emp VALUES(	null,'李四','女','13000','1986-3-5');

#查询所有的记录行
SELECT eid,name,sex,salary,birthday FROM emp;
SELECT * FROM emp;

#删除一行记录
DELETE FROM emp WHERE eid=102;

#继续查询
SELECT eid,name,sex,salary,birthday FROM emp;

#修改一行记录
UPDATE emp SET name='李五',salary='200' WHERE eid=104;

#继续查询
SELECT eid,name,sex,salary,birthday FROM emp;

#查询某一行记录中的指定列
SELECT eid,name,salary FROM emp WHERE eid=104;

#查询某一行记录中的所有列
SELECT * FROM emp WHERE eid=104;

#查询出工资中的最大值——MAX()函数
SELECT MAX(salary) FROM emp;
#查询出工资中的最小值——MIN()函数
SELECT MIN(salary) FROM emp;
#查询出工资中的最平均值——AVG()函数
SELECT AVG(salary) FROM emp;
#查询出工资值的总和——SUM()函数
SELECT SUM(salary) FROM emp;
#查询出工资值的个数——COUNT()函数
SELECT COUNT(salary) FROM emp;



