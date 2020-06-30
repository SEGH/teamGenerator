// Employee class
class Employee {
    constructor(name = "Placeholder", id = 0, email = "boss@email.com") {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = "Employee";
        this.getName = function() {
            return this.name;
        }
        this.getId = function() {
            return this.id;
        }
        this.getEmail = function() {
            return this.email;
        }
        this.getRole = function() {
            return this.role;
        }
    }
}

module.exports = Employee;