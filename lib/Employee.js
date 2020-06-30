// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name = "Placeholder", role = "regular employee", id = 0, email = "segh@fastmail.com") {
        this.name = name;
        this.role = role;
        this.id = id;
        this.email = email;
    }
}

module.exports = Employee;