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

INSERT INTO books (title, author, isbn, available) VALUES ('Eloquent JavaScript Third Edition','Marijn Haverbeke','9781593279509', 'true'),
('Practical Modern JavaScript','Nicolás Bevacqua','9781491943533', 'true'),
('Understanding ECMAScript 6','Nicholas C. Zakas','9781593277574', 'true'),
('Speaking JavaScript','Axel Rauschmayer','9781449365035', 'true'),
('Learning JavaScript Design Patterns','Addy Osmani','9781449331818', 'true'),
('You Dont Know JS Yet','Kyle Simpson','9798602477429', 'true'),
('Pro Git','Scott Chacon and Ben Straub','9781484200766', 'true'),
('Rethinking Productivity in Software Engineering','Caitlin Sadowski and Thomas Zimmermann','9781412384242216', 'true');


CREATE TABLE users (
user_id SERIAL,
name VARCHAR(25) NOT NULL,
email VARCHAR(25) NOT NULL,
password VARCHAR(250) NOT NULL,
role VARCHAR(25) NOT NULL, 
PRIMARY KEY (user_id),
UNIQUE (email)
);


CREATE TABLE issue(
id SERIAL,
book_id int NOT NULL,
user_id int NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

