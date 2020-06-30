const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Prompt question arrays
const createEmployee = [
    {
        type: "list",
        message: "Select employee role to create new employee, or None if team is complete:",
        name: "role",
        choices: ["Engineer", "Intern", "None"]
    }
];

const employeeQuestions = [
    {
        type: "input",
        message: "Enter the employee's name:",
        name: "fullName"
    },
    {
        type: "input",
        message: "What is the employee's id number?",
        name: "id",
        validate: function(input) {
            let letters = /[a-z]/gi;
            if (input.match(letters) !== null) {
                return "Must be a number";
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email",
        validate: function(input) {
            let address = /([a-z1-9])+@([a-z1-9])+\.com/i;
            if (input.match(address) === null) {
                return "Invalid email address";
            }
            return true;
        }
    }
];

const managerQuestions = [
    {
        type: "input",
        message: "Enter the manager's name:",
        name: "fullName"
    },
    {
        type: "input",
        message: "What is the manager's id number?",
        name: "id",
        validate: function(input) {
            let letters = /[a-z]/gi;
            if (input.match(letters) !== null) {
                return "Must be a number";
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is the manager's email address?",
        name: "email",
        validate: function(input) {
            let address = /([a-z1-9])+@([a-z1-9])+\.com/i;
            if (input.match(address) === null) {
                return "Invalid email address";
            }
            return true;
        }
    },
    {
        type: "input",
        message: "What is this manager's office number?",
        name: "office",
        validate: function(input) {
            let letters = /[a-z]/gi;
            if (input.match(letters) !== null) {
                return "Must be a number";
            }
            return true;
        }
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "What is this engineer's GitHub username?",
        name: "username"
    }
];

const internQuestions = [
    {
        type: "input",
        message: "Where does this intern attend school?",
        name: "school"
    }
];

// Validation Functions
// const catchLetters = input => {
//     let letters = /[a-z]/gi;
//     if (input.match(letters) !== null) {
//         return "Must be a number";
//     }
//     return true;
// }

// Employee Array
const employees = [];

// Function to start inquirer prompts, beginning with questions about the manager
const buildTeam = function() {
    console.log("Let's build your dev team!")
    inquirer.prompt(managerQuestions).then(manager => {
        let newManager = new Manager(manager.fullName, manager.id, manager.email, manager.office);
        employees.push(newManager);
        console.log("Manager Saved");
        chooseEmployee();
    });
}

// Function to run prompt question determining employee type, asking general employee questions, and exiting if selected
const chooseEmployee = function() {
    inquirer.prompt(createEmployee).then(type => {
        if (type.role === "Engineer") {
            console.log("Let's hire an engineer!");
            askEmployee(type.role);
        } else if (type.role === "Intern") {
            console.log("Let's hire an intern!");
            askEmployee(type.role);
        } else if (type.role === "None") {
            let renderedCode = render(employees);
            fs.writeFile(outputPath, renderedCode, err => {
                if (err) {
                    console.log("Error in writing file");
                } else {
                    console.log("Team complete! Your profiles have been created at " + outputPath);
                }
            });
        }
    });
}

// Function to ask specific employee questions based on type and re-call employee choice prompt
const askEmployee = function(role) {
    inquirer.prompt(employeeQuestions).then(employee => {
        if (role === "Engineer") {
            inquirer.prompt(engineerQuestions).then(data => {
                let newEngineer = new Engineer(employee.fullName, employee.id, employee.email, data.username);
                employees.push(newEngineer);
                console.log("Engineer Saved");
                chooseEmployee();
            });
        } else {
            inquirer.prompt(internQuestions).then(data => {
                let newIntern = new Intern(employee.fullName, employee.id, employee.email, data.school);
                employees.push(newIntern);
                console.log("Intern Saved");
                chooseEmployee();
            });
        }
    });
}

buildTeam();