const { expect } = require('chai');
const Employee = require('../employee.model');
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if no arg', () => {
        const emp = new Employee({})

        const error = emp.validateSync();
        expect(error).to.exist;
    });
    
    it('should not throw an error if data is okay', () => {
        const emp = new Employee({firstName: 'dsds', lastName: 'dsds ', department: 'dsds'})

        const error = emp.validateSync();
        expect(error).to.not.exist;
    });

    it('should throw an error if firstName are not a string', () => {

        const cases = [
            {firstName: [], lastName: 'Dose', department: 'idsa34s'},
            {firstName: {}, lastName: 'kek', department: 'id34343'},
        ];
        for(let nameEmp of cases) {

            const emp = new Employee(nameEmp);

            const error = emp.validateSync();
            expect(error).to.exist;

        }
      });

      it('should throw an error if lastName are not a string', () => {

        const cases = [
            {firstName: 'Joe', lastName: [], department: 'idsa34s'},
            {firstName: 'Jeos', lastName: {}, department: 'id34343'},
        ];
        for(let nameEmp of cases) {

            const emp = new Employee(nameEmp);

            const error = emp.validateSync();
            expect(error).to.exist;

        }
      });

      it('should throw an error if department are not a string', () => {

        const cases = [
            {firstName: 'Joe', lastName: 'Doe', department: []},
            {firstName: 'Jeo', lastName: 'kek', department: {}},
        ];
        for(let nameEmp of cases) {

            const emp = new Employee(nameEmp);

            const error = emp.validateSync();
            expect(error).to.exist;

        }
      });

    
});
