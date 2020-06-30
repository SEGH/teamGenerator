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

// Write code to use inquirer to gather information about the development team members,

inquirer.prompt(managerQuestions).then(manager => {
    let newManager = new Manager(manager.fullName, "Manager", manager.id, manager.email, manager.office);
    console.log(newManager);
    inquirer.prompt(createEmployee).then(answer => {
        if (answer.role === "None") {
            return console.log("Team complete");
        } else {
            inquirer.prompt(employeeQuestions).then(employee => {
                if (answer.role === "Engineer") {
                    inquirer.prompt(engineerQuestions).then(data => {
                        let newEngineer = new Engineer(employee.fullName, employee.role, employee.id, employee.email, data.username);
                        console.log(newEngineer);
                    });
                } else if (answer.role === "Intern") {
                    inquirer.prompt(internQuestions).then(data => {
                        let newIntern = new Intern(employee.fullName, employee.role, employee.id, employee.email, data.school);
                        console.log(newIntern);
                    });
                }
            });
        }
    });
});
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
