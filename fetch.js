import * as db from './db/index.js';
import inquirer from 'inquirer';

export async function viewDepartmentData() {
    const { rows } = await db.query('SELECT * FROM department')
    return rows;
}

export async function viewRoleData() {
    const { rows } = await db.query('SELECT * FROM role') 
    return rows;
}

export async function viewEmployeeData() {
    const { rows } = await db.query('SELECT * FROM employee') 
    return rows;
}

export async function addDepartment() {
    const response = await inquirer.prompt({
        type: 'input',
        message: 'Please enter the name of the department you would like to add:',
        name: 'departmentToAdd'

    });
    await db.query('INSERT INTO department(name) VALUES($1)', [response.departmentToAdd])
    console.log( `Added ${response.departmentToAdd} to the database.`);
}


export async function addRole() {
    const { rows } = await db.query('SELECT id, name FROM department');
    var departmentsArray = rows.map((obj)=>obj.name);

    
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
    
    var dep = rows.find((obj) => obj.name == response.roleDepartment);
    return await db.query('INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)', [response.roleName, response.roleSalary, dep.id]);

    
}

export async function addEmployee() {
    const employees = await db.query('SELECT first_name, last_name, id FROM employee');
    const roles = await db.query('SELECT title, id FROM role');

    var employeesArray = employees.rows.map(obj=>obj.first_name.concat(' ', obj.last_name));
    employeesArray.push('None');
    var rolesArray = roles.rows.map(obj=>obj.title);

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
    console.log(roles);
    var role = roles.rows.find(obj => obj.title == response.employeeRole);
    var manager = null;
    if(response.employeeManager != 'None') {
        manager = employees.rows.find(obj => obj.first_name == response.employeeManager.split(' ')[0] && obj.last_name == response.employeeManager.split(' ')[1]);
    }

    return await db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [response.employeeFirstName, response.employeeLastName, role.id,manager.id]);
    return 'ba';
}

export async function updateEmployee() {
    const departments = await fetch.viewDepartmentData();
    inquirer.prompt([
        {

        }
    ])


}

const confirmInputNumber = async(input) => {
    return !isNaN(input);
}


