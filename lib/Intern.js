// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, school) {
        super(name, id, email);
        this.role = "Intern";
        this.school = school;
        this.getSchool = function() {
            return this.school;
        }
        this.getRole = function() {
            return this.role;
        }
    }
};

module.exports = Intern;