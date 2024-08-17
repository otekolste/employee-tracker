import * as db from './db/index.js';

async function viewDepartmentData() {
    await db.query('SELECT * FROM department', function (err, {rows}) {
        console.table(rows);
    });
}

async function viewRoleData() {
    await db.query('SELECT * FROM role', function (err, {rows}) {
        console.table(rows);
    });
}

export { viewDepartmentData, viewRoleData };