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
                    return true;
                } else {
                    console.log('  Please enter a valid email address.');
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
                    return true;
                } else {
                    console.log('  Please enter a phone number in XXX-XXX-XXXX format.');
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
                    console.log('==================================================================')
                    console.log("Finished team building! Please check index.html for your directory.")
                    console.log('==================================================================')
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
                        return true;
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
                        return true;
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
            }
            else if(directory[i].role == 'Engineer'){
                engineerData.push(directory[i]);
            }
            else if(directory[i].role == 'Intern'){
                internData.push(directory[i]);
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
        <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            rel="stylesheet"
        />
        <title>Employee Directory</title>
        </head>
        <body>
        <section class="hero has-background-dark is-fullheight">
            <div class="hero-head">
              <div class="container has-text-centered">
                <h1 class="has-text-success is-size-1">
                  <span class="icon has-text-success">
                <i class="fas fa-briefcase"></i>
            </span>
                &nbsp&nbspYour Company's Directory&nbsp&nbsp
            <span class="icon has-text-success">
                <i class="fas fa-briefcase"></i>
            </span>
                </h1>
              </div>
        `
    };

    generateFooter(){
        return `
        </section>
        </body>
        </html>
        `
    }

    generateManager(arr){
        const {name, id, email, phone, role } = arr[0];
        return`
        <div class="container">
        <p class="is-size-2 has-text-light">Manager: </p>
                <div class="columns">
      <div class="column is-3 is-offset-1">
        <div class="card has-background-grey-light">
          <header class="card-header">
            <p class="card-header-title is-centered has-text-dark is-size-4">${name}</p>
          </header>
          <div class="card-content">
            <div class="content has-text-centered has-text-dark is-size-5">ID: ${id}</div>
            <div class="content has-text-centered has-text-dark is-size-5">Email: <a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="content has-text-centered has-text-dark is-size-5">Phone: ${phone}</div>
        </div>
      </div>
    </div>
        ` 
    };

    generateEngineer(arr){
        if(arr){
        return`
        <h2 class="employee-class is-size-2 has-text-light">Engineer(s): </h2>
        <div class="columns is-multiline">
         ${this.writeEngineerLoop(arr)}
         </div>
        `
        } else {
            return ''
        };
    };
    writeEngineerLoop(arr){
        let loopText = ``;
        for(var i = 0 ; i < arr.length; i++){
            let name = arr[i].name;
            let id = arr[i].id;
            let email = arr[i].email;
            let github = arr[i].github;

            loopText +=`
            <div class="column is-4">
            <div class="card has-background-primary">
                <header class="card-header">
                    <p class="card-header-title is-centered has-text-dark is-size-4">${name}</p>
                </header>
                <div class="card-content">
                    <div class="content has-text-centered has-text-dark is-size-5">ID: ${id}</div>
                    <div class="content has-text-centered has-text-dark is-size-5">Email: <a href="mailto:${email}">${email}</a></div>
                    <div class="content has-text-centered has-text-dark is-size-5">Github: <a href="https://www.github.com/${github}" target="_blank" rel="noopener noreferrer">${github}</a></div>
                </div>
            </div>
        </div>
            `
        };
            return loopText; 
    };

    generateIntern(arr){
        if(arr){
        return `
        <h2 class="employee-class is-size-2 has-text-light">Intern(s): </h2>
        <div class="columns is-multiline">
        ${this.writeInternLoop(arr)}
        </div>
        `
        } else {
            return ''
        }
    };
    writeInternLoop(arr){
        let loopText = ``;
        for(var i = 0 ; i < arr.length; i++){
            let name = arr[i].name;
            let id = arr[i].id;
            let email = arr[i].email;
            let school = arr[i].school;

            loopText += `
            <div class="column is-4">
                 <div class="card has-background-danger-dark">
                      <header class="card-header">
                           <p class="card-header-title is-centered has-text-light is-size-4">${name}</p>
                      </header>
                      <div class="card-content">
                           <div class="content has-text-centered has-text-light is-size-5">ID: ${id}</div>
                           <div class="content has-text-centered has-text-light is-size-5">Email: <a href="mailto:${email}">${email}</a></div>
                           <div class="content has-text-centered has-text-light is-size-5">School: ${school}</div>
                       </div>
                 </div>
            </div>
           `
        };
        return loopText;
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

module.exports = Directory;
