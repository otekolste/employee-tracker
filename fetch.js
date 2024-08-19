import * as db from './db/index.js';
import inquirer from 'inquirer';

// Function that returns the data from a query to view all department data, including id and title
export async function viewDepartmentData() {
    const { rows } = await db.query('SELECT * FROM department')
    return rows;
}

// Function that returns data from a query to view role data, including title, id, salary, and associated department
export async function viewRoleData() {
    const { rows } = await db.query(`
        SELECT role.title, role.id, role.salary, department.name AS department
        FROM role 
        INNER JOIN department ON role.department_id = department.id`) 
    return rows;
}

// Function that returns data from a query to view employee data, including first/last names, job title, salary, associated department, and manager, if applicable
export async function viewEmployeeData() {
    const { rows } = await db.query(`
        SELECT employee.first_name AS first_name, employee.last_name AS last_name, role.title AS job, role.salary, department.name AS department, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employee
        INNER JOIN role ON role.id = employee.role_id
        INNER JOIN department ON role.id = department.id
        LEFT OUTER JOIN employee as managers ON employee.id = managers.manager_id`) 
    return rows;
}

// Function that prompts user to add a department 
export async function addDepartment() {
    const response = await inquirer.prompt({ // Prompts user to provide name of department
        type: 'input',
        message: 'Please enter the name of the department you would like to add:',
        name: 'departmentToAdd'

    });
    await db.query('INSERT INTO department(name) VALUES($1)', [response.departmentToAdd]) // Inserts department into database
    console.log( `Added ${response.departmentToAdd} to the database.`);
}

// Function that prompts user to add a role 
export async function addRole() {
    const { rows } = await db.query('SELECT id, name FROM department'); // Selects id and name data from department table
    var departmentsArray = rows.map((obj)=>obj.name); // Constructs a new array of just the department names, to pass into inquirer prompt
    // Uses inquirer to prompt user to input name, salary, and to select the department for the new role
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the name of the role you would like to add:',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'Please enter the salary of the role you would like to add (must be a numeric value):',
            name: 'roleSalary',
            validate: confirmInputNumber
        },
        {
            type: 'list',
            message: 'Please select which department the new role should belong to:',
            name: 'roleDepartment',
            choices: departmentsArray

        }
    ])
    var dep = rows.find((obj) => obj.name == response.roleDepartment); // Locates the ID of the department corresponding to the selected department
    await db.query('INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)', [response.roleName, response.roleSalary, dep.id]); // Inserts new role into database
    console.log(`Added ${response.roleName} to database.`); // Logs that the role has been added
}

// Function that prompts user to add an employee 
export async function addEmployee() {
    const employees = await db.query('SELECT first_name, last_name, id FROM employee'); // Selects employee first name, last name, and id from employee table
    const roles = await db.query('SELECT title, id FROM role'); // Selects role title and id from role table

    var employeesArray = employees.rows.map(obj=> { // Maps employee data into an array, including an object with the properties of the employee's first and last name and the employee's ID
        return {
            name: obj.first_name.concat(' ', obj.last_name),
            value: obj.id,
        }
    });
        
    employeesArray.push({name:'None',id:'null'}); // Adds a 'none' option to the employee array
    var rolesArray = roles.rows.map(obj=> {  // Maps role data into an array, including an object with the properties of the role's title and the role's ID
        return {
            name: obj.title,
            value: obj.id
        }
    });
    // Uses inquirer to prompt user to enter employee's first and last name, as well as to select a role from the existing roles and a manager from the existing employees
    const response = await inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the first name of the employee:',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'Please enter the last name of the employee:',
            name: 'employeeLastName'
        },
        {
            type: 'list',
            message: 'Please select a role for the employee:',
            name: 'employeeRole',
            choices: rolesArray
        },
        {
            type: 'list',
            message: 'Please select a manager for the employee:',
            name: 'employeeManager',
            choices: employeesArray
        }
    ])
    await db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager]); // Inserts new employee into database
    console.log(`Added ${response.employeeFirstName} ${response.employeeLastName} to database.`); // Logs that the employee was added

}

export async function updateEmployee() {
    const employees = await db.query('SELECT first_name, last_name, id FROM employee'); // Selects employee first name, last name, and id from employee table
    const roles = await db.query('SELECT title, id FROM role'); // Selects role title and id from role table

    var employeesArray = employees.rows.map(obj=> { // Maps employee data into an array, including an object with the properties of the employee's first and last name and the employee's ID
        return {
            name: obj.first_name.concat(' ', obj.last_name),
            value: obj.id,
        }
    });
    var rolesArray = roles.rows.map(obj=> { // Maps role data into an array, including an object with the properties of the role's title and the role's ID
        return {
            name: obj.title,
            value: obj.id
        }
    });
    // Prompts user to select employee from list of existing employees, then select a new role from the list of existing roles
    const response = await inquirer.prompt([
        {
            type: 'list',
            message: 'Please select which employee you would like to update:',
            name: 'employeeToUpdate',
            choices: employeesArray

        },
        {
            type: 'list',
            message: 'Select a new role for the employee:',
            name: 'newRole',
            choices: rolesArray
        }
    ])
    await db.query('UPDATE employee SET role_id=$1 WHERE id=$2', [response.newRole, response.employeeToUpdate]); // Updates the employee in the database
    console.log(`Updated database.`); // Logs that the employee has been updated





}

const confirmInputNumber = async(input) => {
    return !isNaN(input);
}


