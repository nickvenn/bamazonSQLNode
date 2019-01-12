DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products 
values(1,'fishing pole', 'sports', 50, 20);
INSERT INTO products 
values(2,'bicycle', 'sports', 150, 15);
INSERT INTO products 
values(3,'northface jacket', 'clothing', 250, 10);
INSERT INTO products 
values(4,'hiking boots', 'clothing', 75, 5);
INSERT INTO products 
values(5,'lamp', 'appliances', 25, 40);
INSERT INTO products 
values(6,'television', 'electronics', 750, 15);
INSERT INTO products 
values(7,'xbox one', 'gaming', 200, 100);
INSERT INTO products 
values(8,'coffee maker', 'appliances', 45, 60);
INSERT INTO products 
values(9,'asus laptop', 'electronics', 800, 30);
INSERT INTO products 
values(10,'vodka', 'food', 50, 150);


SELECT * FROM products;