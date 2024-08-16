import * as db from './db/index.js';
import inquirer from 'inquirer';


/*
db.query('SELECT * FROM department', function (err, {rows}) {
    console.log(rows);
  });
  */

  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Welcome to the Employee Tracker. What would you like to do?',
        name:'whatDo',
        choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','Update an employee role']
      },
      {
        when: (response) => {
          if(response.whatDo==='View all departments') {
            db.query('SELECT name FROM department', function (err, {rows}) {
              console.log(rows);
            });
            return;
          }
        }
      }

    ])




  