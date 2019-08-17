DROP DATABASE bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (
item_id INT NOT NULL,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price INT(10),
stock_quantity INT(10),
primary key(item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES

(01, 'Beats headphones', 'technology', 100, 50),
(02, 'Apple iPad', 'technology', 499, 100),
(03, 'Glad trash bags', 'household essentials', 11, 30),
(04, 'Butterfly chair', 'furniture', 35, 50),
(05, 'end table', 'furniture', 80, 30),
(06, 'Ziploc bags', 'household essentials', 4, 20),
(07, 'Gummy Multivitamins 150ct', 'health', 10, 40),
(08, 'Sketchers sneakers', 'shoes', 40, 50),
(09, 'Papermate Ballpoint pens', 'office supplies', 6, 30),
(10, 'Slide sandals', 'shoes', 23, 30)