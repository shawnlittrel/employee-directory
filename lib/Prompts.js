const inquirer = require('inquirer');
const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');


class Directory{
    constructor(){
        this.directory = []    
        }

    //Adds manager to directory.  We can only have 1
    addManager(){
        inquirer.prompt([
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
            message: `What is the manager's email address?`,
            validate: email => {
                if(email.includes("@")){
                    return true
                } else {
                    console.log('Please enter a valid email address.');
                    return false;
                }
            }
        },
        {
            type: 'text',
            name: 'phone',
            message: `What is the manager's office phone number?`,
            validate: phone => {
                if(phone.includes('-')) {
                    return true
                } else {
                    console.log('Please enter a phone number in XXX-XXX-XXXX format.');
                    return false;
                }
            }
        }
    ])
        .then(choice => {
            this.directory.push(new Manager(choice.name, choice.id, choice.email, choice.phone))
            return this.directory
        }) 
    };
  
//User chooses whether to add an Engineer, an Intern, or finish team building
    promptAddEmployee(object){
        this.directory = object;

        inquirer.prompt([
            {
                type: 'list',
                name: 'addEmployee',
                message: 'What would you like to do next?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team']
            }])
            // .then(({ addEmployee }) => {
            //     if(addEmployee === 'Add an Engineer') {
            //         this.addEngineer();
            //     } 
            //     else if(addEmployee === 'Add an Intern') {
            //         this.addIntern();
            //     } 
            //     else {
            //         console.log("Finished team building! Please check index.html for your directory.");
                    
            //         return this.directory;
            //     }
            // });
            .then(({ addEmployee }) => {
                return addEmployee
            })
    };

    //Adds engineer to directory
    addEngineer(){
        inquirer.prompt([
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
                message: `What is this employee's email address?`,
                validate: email => {
                    if(email.includes("@")){
                        return true
                    } else {
                        console.log('Please enter a valid email address.');
                        return false;
                    }
                }
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
           console.log('eng', this.directory);  
           return this.directory;
        })
    };

//Adds Intern to directory
    addIntern(){
        inquirer.prompt([
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
                message: `What is this employee's email address?`,
                validate: email => {
                    if(email.includes("@")){
                        return true
                    } else {
                        console.log('Please enter a valid email address.');
                        return false;
                    }
                }
            },
            {
                type: 'text',
                name: 'school',
                message: `What is this employee's current school?`
            }
        ])
        .then(choice => {
            this.directory.push(new Intern(choice.name, choice.id, choice.email, choice.school))
            console.log('intern', this.directory);
            return this.directory;
        });
    };

};

let generateDirectory = new Promise(function(){
    new Directory().addManager();
})
.then(result => promptAddEmployee(result))
.then(addEmployee =>{
    if (addEmployee === 'Add an Engineer'){
        addEngineer();
    }
    if (addEmployee === 'Add an Intern'){
        addIntern();
    }
    else if (addEmployee === 'Finish building my team'){
        console.log('DATA!!!', Directory.directory);
    }
})


generateDirectory;



module.exports = Directory