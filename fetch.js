import * as db from './db/index.js';
import inquirer from 'inquirer';
import * as menu from './menu.js'

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


export async function addRolePrompt() {
    const departments = await fetch.viewDepartmentData();
    inquirer.prompt([
        {}
    ])


}

