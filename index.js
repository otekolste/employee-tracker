import * as db from './db/index.js';
import inquirer from 'inquirer';
import * as fetch from './fetch.js'
import { menu } from './menu.js'


/*
db.query('SELECT * FROM department', function (err, {rows}) {
    console.log(rows);
  });
  */
 
const main = async () => {
  await db.getClient();
  await menu()
  .then(async (response) => {
    response.whatDo == 'Quit' ? process.exit() : await handleUserInput(response);
    ;
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
  }

    main();

}


main();





  