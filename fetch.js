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
    const { rows } = await db.query('SELECT ARRAY_AGG(name) deps FROM department');
    const departments = await fetch.viewDepartmentData();
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the first name of the employee:',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'Please enter the last name of the employee:',
            name: 'employeeLastName'
        }
    ])

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


