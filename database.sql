CREATE DATABASE library

CREATE TABLE books(
book_id SERIAL,
title VARCHAR(50) NOT NULL,
author VARCHAR(50) NOT NULL,
isbn VARCHAR(40) NOT NULL,
available VARCHAR(40) NOT NULL,
PRIMARY KEY(book_id),
UNIQUE (isbn)
);

SELECT * FROM books;

INSERT INTO books (title, author, isbn, available) VALUES ('Rethinking Productivity in Software Engineering','Caitlin Sadowski and Thomas Zimmermann','9781484242216', 'true');

CREATE TABLE users (
user_id serial,
name VARCHAR(25) NOT NULL,
email VARCHAR(25) NOT NULL,
password VARCHAR(250) NOT NULL,
role VARCHAR(25) NOT NULL, 
PRIMARY KEY (user_id)
);


CREATE TABLE issue(
id SERIAL,
book_id int NOT NULL,
user_id int NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
--psql -U postgres
--\c library
--\dt
--heroku pg:psql