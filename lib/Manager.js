const Employee = require('../lib/Employee.js');

class Manager extends Employee{
    constructor(name, id, email, phone){
        super(name, id, email);
        this.phone = phone;
        this.role = 'Manager';
    };

    getPhone(){
        return this.phone;
    }
};

module.exports = Manager;