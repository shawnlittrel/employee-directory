const Intern = require('../lib/Intern.js');

test('creates a new Intern object', () => {
    const intern = new Intern('shawn', 1, 'shawnlittrel@gmail.com', 'U of A')

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
})