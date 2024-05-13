const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');


mongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err){
    console.log(err);
  }
  else {
    console.log('Successfully connected to the database');

    const db = client.db('companyDB');
    const app = express();
    /*
    db.collection('employees')
      .find({department: 'IT'})
      .toArray()
      .then((data)=> {
        console.log(data);
      })
      .catch((err => {
        console.log(err);
      }));

    db.collection('employees')
      .findOne({ department: 'IT' })
      .then((item) => {
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
   });

   db.collection('departments')
    .insertOne({ name: "Management"})
    .catch((err) => {
      console.log(err);
   });

   db.collection('employees')
    .updateOne({ department: 'IT' }, { $set: { salary: 6000 }})
    .catch((err) => {
      console.log(err);
  });

  db.collection('departments')
    .deleteMany({ name: 'Management' })
    .catch((err) => {
      console.log(err);
  });

  */

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);

    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    })

    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });

  }
});



