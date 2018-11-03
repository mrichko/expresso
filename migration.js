const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');


db.serialize(() => {
  db.run('DROP TABLE IF EXISTS Employee');
  db.run(`CREATE TABLE Employee (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    position TEXT NOT NULL,
    wage INTEGER NOT NULL,
    is_current_employee INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
  )`,
   (error) => {
    if (error) {
      console.log('There was an error when creating the Employee database')
    } else {
      console.log('You successfully created an Employee database')
    }
});

//Creating timesheet table
  db.run('DROP TABLE IF EXISTS Timesheet');
  db.run(`CREATE TABLE Timesheet (
    id INTEGER NOT NULL,
    hours INTEGER NOT NULL,
    rate INTEGER NOT NULL,
    date INTEGERN NOT NULL,
    employee_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(employee_id) REFERENCES Employee(id)
  )`,
  (error) => {
   if (error) {
     console.log('There was an error when creating the timesheet')
   } else {
     console.log('You successfully created the timesheet')
   }
});

// Creating menu table

    db.run('DROP TABLE IF EXISTS Menu');
    db.run(`CREATE TABLE IF NOT EXISTS Menu (
            id INTEGER NOT NULL,
            title TEXT NOT NULL,
            PRIMARY KEY(id)
        );`);



//Creating menu item table
db.run('DROP TABLE IF EXISTS MenuItem');
db.run(`CREATE TABLE MenuItem (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        inventory INTEGER NOT NULL,
        price INTEGER NOT NULL,
        menu_id INTEGER NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(menu_id) REFERENCES Menu(id)
    )`,
    (error) => {
     if (error) {
       console.log('There was an error when creating the timesheet')
     } else {
       console.log('You successfully created the timesheet')
     }
    });

});
