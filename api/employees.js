const express = require('express');
const employeesRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
const timesheetsRouter = require('./timesheets');


const validateEmployee = (req, res, next) => {
    req.name = req.body.employee.name;
    req.position = req.body.employee.position;
    req.wage = req.body.employee.wage;
    req.isCurrentEmployee = req.body.employee.isCurrentEmployee === 0 ? 0 : 1;
    if (!req.name || !req.position || !req.wage || !req.isCurrentEmployee) {
        return res.sendStatus(400);
    }
    else {
        next();
    }
};


employeesRouter.param('employeeId', (req, res, next, empId) => {
  db.get('SELECT * FROM Employee WHERE Employee.id = $employeeId', {$employeeId: employeeId},
    (err, data) => {
      if (err) {
        next(err);
      } else if (data) {
        req.employee.id = data;
      } else {
        res.sendStatus(404);
      }
    }
  )
});

employeesRouter.use('/:employeeId/timesheets', timesheetsRouter);

employeesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Employee WHERE is_current_employee = 1',
        (err, data) => {
            if (err) {
                next(err);
            } else {
                res.status(200).send({employees: data});
            }
        });
});


employeesRouter.get('/:employeeId', (req, res, next) => {
    res.status(200).send({employee: data});
});



employeesRouter.post('/', validateEmployee, (req, res, next) => {
  db.run(`INSERT INTO Employee (name, wage, position, is_current_employee)
  VALUES ("${req.name}", "${req.position}", "${req.wage}", "${req.isCurrentEmployee}")`,
    function(err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Employee WHERE id = ${this.lastId}`,
          (err, data) => {
            res.status(201).send({$employee: data});
         })
       }
    })
});

employeesRouter.put('/:employeeId', validateEmployee, (req, res, next) => {
  db.run(`UPDATE Employee SET name = "${req.name}", position = "${req.position}",
                wage = "${req.wage}", is_current_employee = "${req.is_current_employee}"
                WHERE id = ${req.params.employeeId}`,
        function(err) {
          if (err) {
            next(err);
          } else {
            db.get(`SELECT * FROM Employee WHERE id =  ${req.params.employeeId}`,
              (err, data) => {
                res.status(200).send({employee: data})
          })
       }
    })
});



employeesRouter.delete('/:employeeId', (req, res, next) => {
  db.run(`UPDATE Employee SET is_current_employee = 0 WHERE id = ${req.params.employeeId}`,
    function(err) {
      if (err) {
        next(err);
      } else {
        db.get(`SELECT * FROM Employee WHERE id = ${req.params.employeeId}`,
          res.status(200).send({employee:data})
      )};
   })
});

module.exports = employeesRouter;
