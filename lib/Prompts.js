const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./Manager.js');
const Engineer = require('./Engineer.js');
const Intern = require('./Intern.js');
const directory = [];

class Directory{

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
        const managerData = [];
        const engineerData = [];
        const internData = [];

        for (var i = 0; i < directory.length; i++){
            if(directory[i].role == 'Manager'){
                managerData.push(directory[i]);
                console.log('manager', managerData);
            }
            else if(directory[i].role == 'Engineer'){
                engineerData.push(directory[i]);
                console.log('eng', engineerData)
            }
            else if(directory[i].role == 'Intern'){
                internData.push(directory[i]);
                console.log('int', internData);
            }
        };

        let pageText = `
        ${this.generateHeader()}
        ${this.generateManager(managerData)}
        ${this.generateEngineer(engineerData)}
        ${this.generateIntern(internData)}
        ${this.generateFooter()}
        `
        return this.writeFile(pageText);
    }
    

    generateHeader(){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css"
            rel="stylesheet"
        />
        <title>Employee Directory</title>
        </head>
        <body>
        <h3>HEADER</h3>
        `
    };

    generateFooter(){
        return `
        <h3>FOOTER</h3>
        </body>
        </html>`
    }

    generateManager(arr){
        console.log(arr);
        const {name, id, email, phone, role } = arr[0];
        console.log('name', name);
        console.log('id', id)
        return`
        <h2 class="employee-class is-size-1">Manager: </h2>
        <div class="columns">
          <div class="column is-2 is-offset-1">
            <div class="card">
              <header class="card-header">
                <p class="card-header-title is-centered">${name}</p>
              </header>
              <div class="card-content">
                <div class="content has-text-centered">ID: ${id}</div>
                <div class="content has-text-centered">Email: ${email}</div>
              </div>
              <div class="content has-text-centered">Phone: ${phone}</div>
            </div>
          </div>
        </div>
        ` 
    };

    generateEngineer(arr){
        console.log(arr);
        if(arr){
        return`
        <h2 class="employee-class is-size-1">Engineer(s): </h2>
        <div class="columns is-multiline">
         ${arr.forEach(element =>{
             const { name, id, email, github, role } = element;
            return `
            <div class="column is-4">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">${name}</p>
                    </header>
                    <div class="card-content has-text-centered">
                        <div class="content">ID: ${id}</div>
                        <div class="content">Email address: ${email}</div>
                        <div class="content">Github: ${github}</div>
                    </div>
                </div>
            </div>

             `
         })}
         </div>
        `
        } else {
            return ''
        };
    };

    generateIntern(arr){
        console.log(arr);
        if(arr){
        return `
        <h2 class="employee-class is-size-1">Intern(s): </h2>
        <div class="columns is-multiline">
        ${arr.forEach(element =>{
            const { name, id, email, school, role } = element;
            return`
         <div class="column is-4">
              <div class="card">
                   <header class="card-header">
                        <p class="card-header-title is-centered">${name}</p>
                   </header>
                   <div class="card-content has-text-centered">
                        <div class="content">ID: ${id}</div>
                        <div class="content">Email: ${email}</div>
                        <div class="content">School: ${school}</div>
                    </div>
              </div>
         </div>
        `
        })}
        </div>
        `
        } else {
            return ''
        }
    };

    writeFile(text){
        return new Promise((resolve, reject) =>{
            fs.writeFile('./index.html', text, err => {
                if(err){
                    reject(err);
                    return;
                }

                resolve({
                    ok: true,
                    message: 'HTML CREATED'
                });
            });
        });
        
    };
};

 new Directory().addManager();


module.exports = Directory;
