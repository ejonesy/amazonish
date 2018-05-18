DROP DATABASE IF EXISTS amazonish;
CREATE DATABASE amazonish;

USE amazonish;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT default 0,
    stock_quantity INT default 0,
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("socks", "clothing", 20, 500), ("cat tower", "cats", 50, 6), ("the da vinci code", "books", 12, 8000), ("aeropress", "kitchen", 30, 77), ("kitchenaid mixer", "kitchen", 60, 45), ("game of thrones", "books", 12, 43), ("catnip toy", "cats", 4, 500), ("plain white t", "clothing", 30, 456), ("mug", "kitchen", 25, 80), ("potting soil", "garden", 60, 12)