const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Employee.find().populate('department'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const emp = await Employee.findOne().skip(rand);
      if(!emp) res.status(404).json({ message: 'Not found' });
      else res.json(emp);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getById = async (req, res) => {
    try {
      const emp = await Employee.findById(req.params.id);
      if(!emp) res.status(404).json({ message: 'Not found' });
      else res.json(emp);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.add = async (req, res) => {
    try {
      const { firstName, lastName, department, salary } = req.body;
      const newEmp = new Employee({ firstName: firstName, lastName, department: department, salary: salary });
      await newEmp.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.update = async (req, res) => {
    try {
      const { firstName, lastName, department, salary } = req.body;
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName, department: department, salary: salary }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.delete = async (req, res) => {
    try{
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        await Employee.deleteOne({ _id: req.params.id });
        // await emp.remove();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };