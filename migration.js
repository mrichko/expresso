const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Employee');
    db.run(`CREATE TABLE Employee (
          id INTEGER  REQUIRED,
          name TEXT REQUIRED,
          position TEXT REQUIRED,
          wage INTEGER REQUIRED,
          is_current_employee INTEGER DEFAULT 1,
          PRIMARY KEY (id)
    );`, if err => {
      console.log('There was a issue in creating the Employee database')
    } else {
      console.log('The Employee database was created succesfully!')
    }

});

db.run('DROP TABLE IF EXISTS Timesheet');
db.run(`CREATE TABLE Timesheet (
      id INTEGER REQUIRED,
      hours INTEGER REQUIRED,
      rate INTEGER REQUIRED,
      date INTEGER REQUIRED,
      PRIMARY KEY (id),
      FOREIGN KEY(employee_id) REFERENCES Employee(id)
);`);

db.run('DROP TABLE IF EXISTS Menu');
db.run(`CREATE TABLE Menu (
      id INTEGER REQUIRED,
      title TEXT REQUIRED,
      PRIMARY KEY (id)
);`);

db.run('DROP TABLE IF EXISTS MenuItem');
db.run(`CREATE TABLE IF NOT EXISTS MenuItem (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        inventory INTEGER NOT NULL,
        price INTEGER NOT NULL,
        menu_id INTEGER NOT NULL,
        PRIMARY KEY(id),
        FOREIGN KEY(menu_id) REFERENCES Menu(id)
    );`);
});
