// controller.js
class ContactController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.addContactButton.addEventListener('click', () => this.view.displayModal());
        this.view.addContactForm.addEventListener('submit', (event) => this.handleAddContact(event));
        this.view.editContactForm.addEventListener('submit', (event) => this.handleEditContact(event));
        this.view.confirmDeleteBtn.addEventListener('click', () => this.handleDeleteContact());
        this.view.sortContactsButton.addEventListener('click', () => this.sortContacts());
    }

    handleAddContact(event) {
        event.preventDefault();
        const firstName = this.view.addContactForm.elements['inputFirstName'].value;
        const lastName = this.view.addContactForm.elements['inputLastName'].value;
        const number = this.view.addContactForm.elements['inputNumber'].value;

        this.model.addContact(firstName, lastName, number);
        this.view.addContactToTable({ id: this.model.contacts.length, firstName, lastName, number });
        this.view.clearAddContactForm();
        this.view.hideModal();
    }

    handleEditContact(event) {
        event.preventDefault();
        const id = parseInt(this.view.editContactForm.elements['editId'].value);
        const firstName = this.view.editContactForm.elements['editFirstName'].value;
        const lastName = this.view.editContactForm.elements['editLastName'].value;
        const number = this.view.editContactForm.elements['editNumber'].value;

        this.model.editContact(id, firstName, lastName, number);
        this.view.updateContactInTable(id, { firstName, lastName, number });
        this.view.hideEditModal();
    }

    handleDeleteContact() {
        const id = parseInt(this.view.deleteIdInput.value);
        if (!isNaN(id)) {
            this.model.deleteContact(id);
            this.view.removeContactFromTable(id);
            this.view.hideDeleteModal();
        } else {
            alert('Please enter a valid contact ID.');
        }
    }

    sortContacts() {
        this.model.sortContacts();
        this.view.clearTable();
        this.model.getContacts().forEach(contact => this.view.addContactToTable(contact));
    }
}

window.addEventListener('load', () => {
    const model = new ContactModel();
    const view = new ContactView();
    const controller = new ContactController(model, view);
});
