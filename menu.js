import inquirer from 'inquirer';

const menu = 
[
    {
            type: 'list',
            message: 'Welcome to the Employee Tracker. What would you like to do?',
            name:'whatDo',
            choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','Update an employee role','Quit']
    }
]




const addDepartmentQuestion = [
    {
        type: 'input',
        message: 'Please enter the name of the department you would like to add:',
        name: 'departmentToAdd'

    }
]

const addRoleQuestions = [
    {
        type: 'input',
        message: 'Please enter the name of the role you would like to add:'

    },
    {

        type: 'input',
        message: 'Please enter the salary of the role you would like to add:'
    
        
    },
    {
        type: 'list',
        message: 'Please select the department this role belongs to:'

    }

]

const addEmployeeQuestions = [
    {
        type: 'input',
        message: 'Please enter the first name of the employee to add:'
    },
    {
        type: 'input',
        message: 'Please enter the last name of the employee to add:'
    },
    {
        type: 'input',
        message: 'Please enter the first name of the employee to add:'
    }
    
    

]

const updateEmployeeQuestions = [

]



export { menu, addDepartmentQuestion, addRoleQuestions, addEmployeeQuestions, updateEmployeeQuestions };