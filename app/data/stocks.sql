CREATE TABLE if not EXISTS stocks (
    product_id  int not null,
    count int NOT NULL,
    CONSTRAINT fk_product_id FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
