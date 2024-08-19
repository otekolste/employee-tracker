import * as db from './db/index.js';
import inquirer from 'inquirer';

export async function viewDepartmentData() {
    const { rows } = await db.query('SELECT * FROM department')
    return rows;
}

export async function viewRoleData() {
    const { rows } = await db.query(`
        SELECT role.title, role.id, role.salary, department.name AS department
        FROM role 
        INNER JOIN department ON role.department_id = department.id`) 
    return rows;
}

export async function viewEmployeeData() {
    const { rows } = await db.query(`
        SELECT employee.first_name AS first_name, employee.last_name AS last_name, role.title AS job, role.salary, department.name AS department, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employee
        INNER JOIN role ON role.id = employee.role_id
        INNER JOIN department ON role.id = department.id
        LEFT OUTER JOIN employee as managers ON employee.id = managers.manager_id`) 
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
    await db.query('INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)', [response.roleName, response.roleSalary, dep.id]);
    console.log(`Added ${response.roleName} to database.`);


    
}

export async function addEmployee() {
    const employees = await db.query('SELECT first_name, last_name, id FROM employee');
    const roles = await db.query('SELECT title, id FROM role');

    var employeesArray = employees.rows.map(obj=> {
        return {
            name: obj.first_name.concat(' ', obj.last_name),
            value: obj.id,
        }
    });
        
    employeesArray.push({name:'None',id:'null'});
    var rolesArray = roles.rows.map(obj=> {
        return {
            name: obj.title,
            value: obj.id
        }
    });

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
    await db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [response.employeeFirstName, response.employeeLastName, response.employeeRole, response.employeeManager]);
    console.log(`Added ${response.employeeFirstName} ${response.employeeLastName} to database.`);

}

export async function updateEmployee() {
    const employees = await db.query('SELECT first_name, last_name, id FROM employee');
    const roles = await db.query('SELECT title, id FROM role');

    var employeesArray = employees.rows.map(obj=> {
        return {
            name: obj.first_name.concat(' ', obj.last_name),
            value: obj.id,
        }
    });
    var rolesArray = roles.rows.map(obj=> {
        return {
            name: obj.title,
            value: obj.id
        }
    });

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
    await db.query('UPDATE employee SET role_id=$1 WHERE id=$2', [response.newRole, response.employeeToUpdate]);
    console.log(`Updated database.`);





}

const confirmInputNumber = async(input) => {
    return !isNaN(input);
}


