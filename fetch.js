import * as db from './db/index.js';
import inquirer from 'inquirer';
import * as menu from './menu.js'

export async function viewDepartmentData() {
    await db.query('SELECT * FROM department', function (err, {rows}) {
        console.table(rows);
    });
}

export async function viewRoleData() {
    await db.query('SELECT * FROM role', function (err, {rows}) {
        console.table(rows);
    });
}

export async function viewEmployeeData() {
    await db.query('SELECT * FROM employee', function (err, {rows}) {
        console.table(rows);
    });
}

export async function addDepartment() {
    inquirer.prompt(menu.addDepartmentQuestion)
    .then(async response => {
        await db.query('INSERT INTO department(name) VALUES($1)', [response.departmentToAdd])
        console.log(`Added ${response.departmentToAdd} to the database`);
    })
}

