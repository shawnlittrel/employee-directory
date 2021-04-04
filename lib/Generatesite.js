const Directory = require('./Prompts.js');

const newDirectory = new Directory();

function deconstructData(data){
     console.log('employeeDirectory', data);
}


newDirectory.addManager()
.then(deconstructData(employeeDirectory));