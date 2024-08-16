import * as db from './db/index.js';
import inquirer from 'inquirer';

db.query('SELECT * FROM department', function (err, {rows}) {
    console.log(rows);
  });
  