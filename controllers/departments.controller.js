const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Department.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
      const count = await Department.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Department.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
      const dep = await Department.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.add = async (req, res) => {
    try {
      const { name } = req.body;
      const newDepartment = new Department({ name: name });
      await newDepartment.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.update = async (req, res) => {
    try {
      const { name } = req.body;
      const dep = await Department.findById(req.params.id);
      if(dep) {
        await Department.updateOne({ _id: req.params.id }, { $set: { name: name }});
        const updep = await Department.findById(req.params.id);
        res.json( updep );
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.delete = async (req, res) => {
    try{
      const dep = await Department.findById(req.params.id);
      if(dep) {
        await Department.deleteOne({ _id: req.params.id });
        // await dep.remove();
        res.json({ dep });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

