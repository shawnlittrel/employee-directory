const inquirer = require('inquirer');
const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');


class Directory{
    constructor(){
        this.directory = [];
    }

    //Adds manager to directory.  We can only have 1
    addManager(){
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
            this.directory.push(new Manager(choice.name, choice.id, choice.email, choice.phone))
        }) 
    };


   
//User chooses whether to add an Engineer, an Intern, or finish team building
    promptAddEmployee(){
        return inquirer
        .prompt([
            {
                type: 'list',
                name: 'addEmployee',
                message: 'What would you like to do next?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team']
            }])
    };

    //Adds engineer to directory
    addEngineer(){
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
        .then(choice => {
           this.directory.push(new Engineer(choice.name, choice.id, choice.email, choice.github))  
        })
    };

//Adds Intern to directory
    addIntern(){
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
            this.directory.push(new Intern(choice.name, choice.id, choice.email, choice.school))
        });
    };

//Returns data for promise chaining
    // exportData(){
    //     return this.directory
    // }

};

const employeeDirectory = new Directory();

employeeDirectory.addManager()
.then(employeeDirectory.promptAddEmployee)
.then(choice => {
    if(choice.addEmployee === 'Add an Engineer'){
        console.log('adding engineer');
        employeeDirectory.addEngineer().then(employeeDirectory.promptAddEmployee)
    }
    else if(choice.addEmployee === 'Add an Intern'){
        console.log('adding intern');
        employeeDirectory.addIntern().then(employeeDirectory.promptAddEmployee)
    }
    else {
        console.log('finishing up', choice)
        return
    }
})







// .then(({ addEmployee }) => {
//     if(addEmployee === 'Add an Engineer') {
//         this.addEngineer();
//     } 
//     else if(addEmployee === 'Add an Intern') {
//         this.addIntern();
//     } 
//     else {
//         console.log("Finished team building! Please check index.html for your directory.")
//         this.exportData();
//     }

module.exports = Directory