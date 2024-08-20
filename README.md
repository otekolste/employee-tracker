# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description

This application provides an easy and user-friendly interface for creating, viewing, and modifying records for employees, departments, and roles. This was built using JavaScript and PostgreSQL, with the `pg` package (more details below) linking the application and the database. This application allows users to maintain accurate records, update data with ease, and streamline the management of important information!

### Features:
- **Employee, role, and department data:** Creates a database with 3 separate tables. Departments have ids (serialized) and names; roles have ids (serialized), associated departments, titles, and salaries; and employees have ids (serialized), first and last names, associated roles, and a manager, if applicable. The application allows users to view all of this data via the console, which is neatly displayed via tables.

- **Add employees, roles, and departments:** The app allows users to add employees, roles, and departments. Upon selecting any of these options, it walks the user through inputting the required information and updates the database accordingly.

- **Update employee roles:** The app allows users to update employee roles, and updates the database accordingly.

## Installation

To use this application, you must have npm and PostgreSQL installed. 

Once you have installed the files from GitHub, navigate to the appropriate terminal. Run `npm i` to install all of the required packages. 

Then, run `node index` and simply follow the command line prompts!

## Usage

To get started, follow the installation instructions. You can create a pre-populated database by running `\i schema.sql` in an SQL interface!

The app will present a menu upon startup; select any of the options listed. Viewing data will print out a table to the console; adding or updating data will require you to input necessary data, which the program will walk you through.

After you have selected an option, the menu will re-appear, and will continue to do so until you select 'Quit.'

View the walkthrough video [here](https://drive.google.com/file/d/1KiKcRV9G0ov8tKNGXlZ7M2HbP8Y8aw-s/view) to see all of the features in action.


## Credits

[The PG package](https://www.npmjs.com/package/pg) was used for linking the app to the database. The code on the [suggested project structure page](https://node-postgres.com/guides/project-structure) was used in setting up the database connection - see db/index.js.

[The inquirer package](https://www.npmjs.com/package/inquirer) was used for the command-line prompts and interactivity.

## License

This code is covered by the MIT license. For more information, click on the badge at the top of this README.
