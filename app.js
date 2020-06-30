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
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email"
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
        name: "id"
    },
    {
        type: "input",
        message: "What is the manager's email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is this manager's office number?",
        name: "office"
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

// Function to start inquirer prompts, beginning with questions about the manager
const buildTeam = function() {
    console.log("Let's build your dev team!")
    inquirer.prompt(managerQuestions).then(manager => {
        let newManager = new Manager(manager.fullName, manager.id, manager.email, manager.office);
        console.log(newManager);
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
            console.log("Team complete!");
        }
    });
}

// Function to ask specific employee questions based on type and re-call employee choice prompt
const askEmployee = function(role) {
    inquirer.prompt(employeeQuestions).then(employee => {
        if (role === "Engineer") {
            inquirer.prompt(engineerQuestions).then(data => {
                let newEngineer = new Engineer(employee.fullName, employee.id, employee.email, data.username);
                console.log(newEngineer);
                chooseEmployee();
            });
        } else {
            inquirer.prompt(internQuestions).then(data => {
                let newIntern = new Intern(employee.fullName, employee.id, employee.email, data.school);
                console.log(newIntern);
                chooseEmployee();
            });
        }
    });
}

buildTeam();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
