DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
id INT auto_increment not null,
names varchar(30) not null,
primary key(id)
);

CREATE TABLE role(
id INT auto_increment not null,
title varchar(30) not null,
salary decimal not null,
department_id Integer not null,
constraint fk_department_id foreign key (department_id) references department(id),
primary key(id)
);

CREATE TABLE employee(
id INT auto_increment not null,
first_name varchar(30) not null,
last_name varchar(30) not null,
role_id integer not null,
manager_id integer ,
constraint fk_role_id FOREIGN KEY (role_id) REFERENCES role(id),
constraint fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(id),
Primary key(id)
);

-- CREATE TABLE role(
-- id INT auto_increment not null,
-- title varchar(20) not null,
-- salary decimal not null,
-- department_id Integer not null,
-- constraint fk_department_id foreign key (department_id) references department(id),
-- primary key(id)
-- );

-- CREATE TABLE IF NOT EXISTS department (
-- id INT AUTO_INCREMENT,
-- name VARCHAR(30) NOT NULL,
-- PRIMARY KEY(id)
-- ),

-- CREATE TABLE IF NOT EXISTS roles (
-- id INT AUTO_INCREMENT,
-- title VARCHAR(30) NOT NULL,
-- salary DECIMAL NOT NULL,
-- department_id INT NOT NULL,
-- PRIMARY KEY(id),
-- )

-- dropEmployeeTable: 'DROP TABLE IF EXISTS employee',
-- dropRoleTable: 'DROP TABLE IF EXISTS role',
-- dropDepartmentTable: 'DROP TABLE IF EXISTS department',

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

INSERT INTO department (names) 
VALUES 
('Sales'),
('Legal'),
('Fianace'),
('Engineering');

INSERT INTO role (title, salary, department_id) 
VALUES 
('Software Developer', 100000, 1),
('Software Engineer', 80000, 1),
('DB Master', 190000, 2),
('scrum master Team Lead', 250000, 2),
('financial advisor', 125000, 3),
('Software Engineer', 120000, 4),
('Lead Software Engineer', 180000, 4);

INSERT INTO employee (First_name, Last_name, Role_id, Manager_id) 
VALUES ('Naaz', 'Maududi', 4, null),('Ferishta', 'Maududi', 3, 1),
('Kerishma', 'Tarin', 1, null),('Imal', 'Maududi', 2, 3),
('Naweed', 'Maududi', 5, null);