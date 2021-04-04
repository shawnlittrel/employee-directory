const inquirer = require('inquirer');
const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');
const directory = [];

class Directory{
    constructor(){
        //this.directory = [];
    }

    //Adds manager to directory.  We can only have 1
    addManager(){
        //prompts add information
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
        //then create new Class
        .then(choice => {
           var newManager = new Manager(choice.name, choice.id, choice.email, choice.phone);
           return newManager;
        })
        //then create an object to push into the array and prompt for the next employee
        .then(obj => {
            var managerObj = {name: obj.name, id: obj.id, email: obj.email, phone: obj.phone, role: 'Manager'};
            directory.push(managerObj);
            this.promptAddEmployee();
        })
    };
//User chooses whether to add an Engineer, an Intern, or finish team building
    promptAddEmployee(){
        inquirer
        //ask if we need to add another employee or finish up
        .prompt([
            {
                type: 'list',
                name: 'addEmployee',
                message: 'What would you like to do next?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finish building my team']
            }])
            //route based on user choice.  If done, begin deconstructing data and writing HTML
            .then(({ addEmployee }) => {
                if(addEmployee === 'Add an Engineer') {
                    this.addEngineer();
                } 
                else if(addEmployee === 'Add an Intern') {
                    this.addIntern();
                } 
                else {
                    console.log("Finished team building! Please check index.html for your directory.")
                    return this.deconstructData();
                }
            });
    };

    //Adds engineer to directory
    addEngineer(){
        inquirer
        //prompts for engineer information
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
        //create new object based on user data
        .then(choice => {
           var newEngineer = new Engineer(choice.name, choice.id, choice.email, choice.github);
           return newEngineer;
        })
        //push object into array after creation and loop back to add employee prompt
        .then(obj => {
            var engineerObj = {name: obj.name, id: obj.id, email: obj.email, github: obj.github, role: 'Engineer'}; 
            directory.push(engineerObj);
            this.promptAddEmployee();
        });
    };

//Adds Intern to directory
    addIntern(){
        inquirer
        //prompt for user information
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
        //create new object based on user data
        .then(choice => {
            var newIntern = new Intern(choice.name, choice.id, choice.email, choice.school);
            return newIntern;
        })
        //then push information into directory array and loop back to add employee prompt
        .then(obj => {
            var internObj = {name: obj.name, id: obj.id, email: obj.email, school: obj.school, role: 'Intern'};
            directory.push(internObj);
            this.promptAddEmployee();
        })
    };

    //sort all data into different arrays for organized layout
    deconstructData(){
        let managerData = [];
        let engineerData = [];
        let internData = [];

        for (var i = 0; i < directory.length; i++){
            if(directory[i].role == 'Manager'){
                managerData.push(directory[i]);
            }
            else if(directory[i].role == 'Engineer'){
                engineerData.push(directory[i]);
            }
            else if(directory[i].role == 'Intern'){
                internData.push(directory[i]);
            }
        };

        //take separate arrays and generate HTML for each
        generateManager(managerData);
        generateEngineer(engineerData);
        generateIntern(internData);
    }

    generateManager(arr){
        
    };

    generateEngineer(arr){

    };

    generateIntern(arr){

    }
};

 new Directory().addManager();


module.exports = Directory;
