const inquirer = require('inquirer');
const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');
const directory = [];

// class Directory{
//     constructor(){
//         this.directory = [];
//     }

    // //Adds Manager to directory, then builds rest of team
    // initializeDirectory(){
    // //run add a manager, then run add engineer or intern
    //     this.addManager()
    //     .then(promptAddEmployee)
    // };

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
            console.log(directory);
            promptAddEmployee();
        }) 
    };


   
//User chooses whether to add an Engineer, an Intern, or finish team building
   function promptAddEmployee(){
        inquirer
        .prompt([
            {
                type: 'list',
                name: 'addEmployee',
                message: 'What would you like to do next?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team']
            }])
            .then(({ addEmployee }) => {
                if(addEmployee === 'Add an Engineer') {
                    addEngineer();
                } 
                else if(addEmployee === 'Add an Intern') {
                    addIntern();
                } 
                else {
                    console.log("Finished team building! Please check index.html for your directory.")
                    return buildSite();
                }
            });
    };

    //Adds engineer to directory
   function addEngineer(){
        inquirer
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
           directory.push(new Engineer(choice.name, choice.id, choice.email, choice.github))  
           console.log(directory);
           promptAddEmployee();
        })
    };

//Adds Intern to directory
   function addIntern(){
        inquirer
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
            directory.push(new Intern(choice.name, choice.id, choice.email, choice.school))
            console.log(directory);
            promptAddEmployee();
        });
    };

//     buildSite(){
//         console.log(this.directory);
//     }
// };

// new Directory().initializeDirectory();


addManager();
//module.exports = Directory;