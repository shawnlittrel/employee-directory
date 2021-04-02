const Engineer = require('../lib/Engineer.js');

test('creates a new Engineer object', () => {
    const engineer = new Engineer('shawn', 1, 'shawnlittrel@gmail.com', 'shawnlittrel')

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.github).toEqual(expect.any(String));
})