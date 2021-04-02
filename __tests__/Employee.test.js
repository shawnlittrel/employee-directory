const Employee = require('../lib/Employee.js');


test('creates an Employee object', () => {
    const employee = new Employee('shawn', 1, 'shawnlittrel@gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});