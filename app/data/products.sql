CREATE SEQUENCE products_seq
  start 1
  increment 1;

CREATE TABLE if not EXISTS products (
    id int CONSTRAINT products_id_pk PRIMARY KEY,
    title varchar(255) NOT NULL,
    tagline varchar(255),
   price decimal(12,2) NOT NULL,
   budget decimal(12,2),
   revenue decimal(12,2),
   description varchar(255) NOT NULL,
   vote_average decimal(12,2),
   poster_path varchar(255) NOT NULL,
   genres varchar(255) NOT NULL,
   runtime int
);

alter table products
 alter column id set default nextval('products_seq');
