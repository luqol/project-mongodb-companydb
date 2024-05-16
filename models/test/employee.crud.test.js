const { expect } = require('chai');
const Employee = require('../employee.model');
const Department = require('../department.model');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

describe('Employee Crud', () => {

    before(async () => {

        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    }); 

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({ _id: new ObjectId('163dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'One', department: '2443sewrsdf43t'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ _id: new ObjectId('663dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'Two', department: '24fh54324dss3t'});
            await testEmpTwo.save();
        });

        it('should return all the data with find method,', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return proper document by various params with findOne method.', async () => {
            const employee = await Employee.findOne({ _id: ObjectId('163dd2b2ef730aaf7046b79c')});
            const expectedEmployee = {firstName:'Joe', lastName: 'One', department: '2443sewrsdf43t'};
            expect(employee.firstName).to.be.equal(expectedEmployee.firstName);
            expect(employee.lastName).to.be.equal(expectedEmployee.lastName);
            expect(employee.department).to.be.equal(expectedEmployee.department);
        });

        after(async () => {
            await Employee.deleteMany();
          });
    });

    describe('Creating data', () => {

        it('should insert new document with insertOne method.', async () => {
            const employee = new Employee({ _id: new ObjectId('163dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'One', department: '2443sewrsdf43t'});
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
          });
    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ _id: new ObjectId('163dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'One', department: '2443sewrsdf43t'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ _id: new ObjectId('663dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'Two', department: '24fh54324dss3t'});
            await testEmpTwo.save();
        });

        it('should properly update one document with updateOne method,', async () => {
            await Employee.updateOne({ _id: ObjectId('163dd2b2ef730aaf7046b79c')}, { $set: {firstName:'Update', lastName: 'Update'}});
            const updatedEmployee = await Employee.findOne({ _id: ObjectId('163dd2b2ef730aaf7046b79c')});
            expect(updatedEmployee.firstName).to.be.equal('Update');
            expect(updatedEmployee.lastName).to.be.equal('Update');

        });

        it('should properly update one document with save method,', async () => {
            const employee = await Employee.findOne({ _id: ObjectId('163dd2b2ef730aaf7046b79c')});
            employee.firstName = 'Update';
            employee.lastName = 'Update';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ _id: ObjectId('163dd2b2ef730aaf7046b79c')});
            expect(updatedEmployee.firstName).to.be.equal('Update');
            expect(updatedEmployee.lastName).to.be.equal('Update');

        });

        it('should properly update multiple documents with updateMany method.', async () => {
            await Employee.updateMany({}, {$set: {firstName: 'Update'}});
            const employee = await Employee.find();

            expect(employee[0].firstName).to.be.equal('Update');
            expect(employee[1].firstName).to.be.equal('Update');

        });


        afterEach(async () => {
            await Employee.deleteMany();
          });
        
    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmpOne = new Employee({ _id: new ObjectId('163dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'One', department: '2443sewrsdf43t'});
            await testEmpOne.save();

            const testEmpTwo = new Employee({ _id: new ObjectId('663dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'Two', department: '24fh54324dss3t'});
            await testEmpTwo.save();
        });

        it('should properly remove one document with deleteOne method,', async () => {
            await Employee.deleteOne({_id: ObjectId('163dd2b2ef730aaf7046b79c')});
            const removeEmployee = await Employee.findOne({_id: ObjectId('163dd2b2ef730aaf7046b79c')});
            expect(removeEmployee).to.be.null;

        });

        it('should properly remove multiple documents with deleteMany method.', async () => {
            await Employee.deleteMany();
            const employee = await Employee.find();
            expect(employee.length).to.be.equal(0);

        });


        afterEach(async () => {
            await Employee.deleteMany();
          });
        
    });

    describe('Check find().populate()', () =>{
        before(async () => {
            const testEmpOne = new Employee({ _id: new ObjectId('163dd2b2ef730aaf7046b79c'), firstName:'Joe', lastName: 'One', department: '666dd2b2ef730aaf7046b79c'});
            await testEmpOne.save();

            const testDepOne = new Department({ _id: new ObjectId('666dd2b2ef730aaf7046b79c'), name: 'Department #1' });
            await testDepOne.save();
            
        });

        it('Should return propertly department insted of department id', async () => {
            const employee = await Employee.find().populate('department');
            expect(employee[0].department.name).to.be.equal('Department #1');
        });

        after(async () => {
            await Employee.deleteMany();
            await Department.deleteMany();
          });

    });

});