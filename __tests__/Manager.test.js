const Manager = require('../lib/Manager.js')

test('creates a Manager Object', () =>{
    const manager = new Manager('shawn', 1, 'shawnlittrel@gmail.com', '602-517-8098')

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.phone).toEqual(expect.any(String));
})