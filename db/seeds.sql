INSERT INTO department(name)
VALUES ('Research'),
       ('Development'),
       ('HR'),
       ('Accounting');

INSERT INTO role(title, salary, department_id)
VALUES ('Head Researcher','1200',1),
       ('Intern Researcher','500',1),
       ('Senior Researcher', '1000',1),
       ('Head Developer', '1200',2),
       ('Senior Developer','1000',2),
       ('Developer','800',2),
       ('Recruitment', '800',3),
       ('Coordinator', '800', 3),
       ('HR Director', '1000',3),
       ('Payroll Manager', '1000',4),
       ('Junior Accountant', '700',4),
       ('Senior Accountant', '900',4);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES ('John','Doe',1,NULL),
       ('Jane','Doe',1,NULL),
       ('Steven','Smith',2,2),
       ('Carla','Crawford',3,1);
