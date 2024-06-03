// model.js
class ContactModel {
    constructor() {
        this.contacts = [
            { id: 1, firstName: "Clark", lastName: "Kent", number: "+380666581123" },
            { id: 2, firstName: "Peter", lastName: "Parker", number: "+380668581123" },
            { id: 3, firstName: "John", lastName: "Carter", number: "+380666582323" },
            { id: 4, firstName: "Isabella", lastName: "White", number: "+380666581123" },
            { id: 5, firstName: "Sophia", lastName: "Anderson", number: "+380668581123" },
            { id: 6, firstName: "Olivia", lastName: "Martinez", number: "+380666582323" },
            { id: 7, firstName: "James", lastName: "Taylor", number: "+380666581123" },
            { id: 8, firstName: "Alexander", lastName: "Thomas", number: "+380668581123" },
            { id: 9, firstName: "Emily", lastName: "Johnson", number: "+380666582323" },
            { id: 10, firstName: "Sarah", lastName: "Davis", number: "+380666581123" },
            { id: 11, firstName: "William", lastName: "Wilson", number: "+380668581123" }
        ];
    }

    addContact(firstName, lastName, number) {
        const id = this.contacts.length + 1;
        const newContact = { id: id, firstName: firstName, lastName: lastName, number: number };
        this.contacts.push(newContact);
    }

    editContact(id, firstName, lastName, number) {
        const index = this.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            this.contacts[index].firstName = firstName;
            this.contacts[index].lastName = lastName;
            this.contacts[index].number = number;
        }
    }

    deleteContact(id) {
        const index = this.contacts.findIndex(contact => contact.id === id);
        if (index !== -1) {
            this.contacts.splice(index, 1);
        }
    }

    sortContacts() {
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }

    getContacts() {
        return this.contacts;
    }
}

class UserData {
    constructor(name, surname, gender, email, dateOfBirth, password) {
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.password = password;
        this.registered = true;
    }

    saveToLocal() {
        localStorage.setItem('userData', JSON.stringify(this));
    }
}

const LoginModel = {
    getUserData: function() {
        return JSON.parse(localStorage.getItem('userData'));
    }
};
