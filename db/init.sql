CREATE TABLE users(
    id serial,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL
);

INSERT INTO
    users(firstName, lastName)
VALUES
    ('test user','test'),
    ('test user 1','test 2');