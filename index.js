import inquirer from 'inquirer';
import * as fetch from './fetch.js'

// MAIN
 
const main = async () => {
  const response = await inquirer.prompt({
    type: 'list',
    message: 'Welcome to the Employee Tracker. What would you like to do?',
    name:'whatDo',
    choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','Update an employee role','Quit']
});
  try {
    if(response.whatDo == 'Quit') {
      process.exit();
    }
    const result = await handleUserInput(response);
    main();
  }
  catch(e) {
    console.log(`Sorry, an error occurred: ${e}`);
  }

}

async function handleUserInput(response) {
  let rows;
  switch(response.whatDo) {
    case "View all departments":
      rows = await fetch.viewDepartmentData();
      console.table(rows); 
      break;
    case "View all roles":
      rows = await fetch.viewRoleData();
      console.table(rows); 
      break;
    case "View all employees":
      rows = await fetch.viewEmployeeData();
      console.table(rows); 
      break;
    case "Add a department":
      await fetch.addDepartment();
      break;
    case "Add a role":
      await fetch.addRole();
      break;
    case "Add an employee":
      await fetch.addEmployee();
      break;
    case "Update an employee role":
      await fetch.updateEmployee();
      break;
  }

}


main();





  