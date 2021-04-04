const inquirer = require('inquirer');
const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');
const directory = [];


// class Directory{
//     constructor(){
//         this.directory = [];
//     }

    //Adds manager to directory.  We can only have 1
function addManager(){
    return inquirer
    .prompt([
    {
        type: 'text',
        name: 'name',
        message: `What is the manager's name?`
    },
    {
        type: 'text',
        name: 'id',
        message: `What is the manager's ID number?`
    },
    {
        type: 'text',
        name: 'email',
        message: `What is the manager's email address?`
    },
    {
        type: 'text',
        name: 'phone',
        message: `What is the manager's office phone number?`
    }
])
    .then(choice => {
        directory.push(new Manager(choice.name, choice.id, choice.email, choice.phone))
    })
    .then(promptAddEmployee);
};


   
//User chooses whether to add an Engineer, an Intern, or finish team building
function promptAddEmployee(){
    return inquirer
    .prompt([
        {
            type: 'list',
            name: 'addEmployee',
            message: 'What would you like to do next?',
            choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team']
        }])
    .then(choice => {
        if(choice.addEmployee === 'Add an Engineer'){
            console.log('add eng');
            addEngineer();
        }
        else if(choice.addEmployee === 'Add an Intern'){
            console.log('add int');
            addIntern();
        }
        else {
            console.log('finishing up');
            return
        }
    })
};

//Adds engineer to directory
function addEngineer(){
    return inquirer
    .prompt([
        {
            type: 'text',
            name: 'name',
            message: `What is this employee's name?`
        },
        {
            type: 'text',
            name: 'id',
            message: `What is this employee's ID number?`
        },
        {
            type: 'text',
            name: 'email',
            message: `What is this employee's email address?`
        },
        {
            type: 'text',
            name: 'github',
            message: `What is this employee's GitHub username?`
        }
    ])
    //push to array
    .then(function(choice) {
        console.log('eng push');
        directory.push(new Engineer(choice.name, choice.id, choice.email, choice.github));
        return promptAddEmployee();
    });
};

//Adds Intern to directory
function addIntern(){
    return inquirer
    .prompt([
        {
            type: 'text',
            name: 'name',
            message: `What is this employee's name?`
        },
        {
            type: 'text',
            name: 'id',
            message: `What is this employee's ID number?`
        },
        {
            type: 'text',
            name: 'email',
            message: `What is this employee's email address?`
        },
        {
            type: 'text',
            name: 'school',
            message: `What is this employee's current school?`
        }
    ])
    .then(choice => {
        console.log('int push');
        directory.push(new Intern(choice.name, choice.id, choice.email, choice.school));
        return promptAddEmployee();
    });
};

function callData(){
    console.log('DATA!!!', directory);
}

addManager()