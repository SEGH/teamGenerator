// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, role, id, email, school) {
        super(name, role, id, email);
        this.school = school;
    }
};

module.exports = Intern;