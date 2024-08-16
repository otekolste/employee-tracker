import * as db from './db/index.js';
import inquirer from 'inquirer';


/*
db.query('SELECT * FROM department', function (err, {rows}) {
    console.log(rows);
  });
  */
 
const main = async () => {
  let quit = false;
  while(!quit) {
    await inquirer
    .prompt(menu)
    .then((response) => {
      if(response.whatDo == 'Quit') {
        quit = true;
      }
      else{
        handleUserInput(response);
      }
    })
  }
  process.exit();
}

const handleUserInput = async (input) => {
  switch(input.whatDo) {
    case 'View all departments':
      await db.query('SELECT * FROM department', function (err, {rows}) {
        console.log(rows);
      });
      break;
    case 'View all roles':
      await db.query('SELECT * FROM role', function (err, {rows}) {
        console.log(rows);
      });
    case 'View all employees':
      await db.query('SELECT * FROM employee', function (err, {rows}) {
        console.log(rows);
      });
  }
}

const menu = 
  {
    type: 'list',
    message: 'Welcome to the Employee Tracker. What would you like to do?',
    name:'whatDo',
    choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','Update an employee role','Quit']
  }

await main();





  