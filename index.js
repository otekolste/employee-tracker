import * as db from './db/index.js';
import inquirer from 'inquirer';
import * as fetch from './fetch.js'
import { menu } from './menu.js'


/*
db.query('SELECT * FROM department', function (err, {rows}) {
    console.log(rows);
  });
  */
 
const main = () => {
  inquirer.prompt(menu)
  .then(async (response) => {
    await handleUserInput(response);
    response.whatDo == 'Quit' ? process.exit() : main();
  })
  .catch(err => {
    console.log(err);
  })
}

async function handleUserInput(response) {

  switch(response.whatDo) {
    case "Quit":
      break;
    case "View all departments":
      await fetch.viewDepartmentData();
      break;
    case "View all roles":
      await fetch.viewRoleData();
      break;
    case "View all employees":
      await fetch.viewEmployeeData();
      break;
    case "Add a department":
      await fetch.addDepartment();
      break;
    case "Add a role":
      break;
    case "Add an employee":
      break;
    case "Update an employee":
      break;
  }

}


main();





  