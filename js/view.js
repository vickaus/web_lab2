// view.js
class ContactView {
    constructor() {
        this.modal = document.getElementById('addContactModal');
        this.addContactForm = document.getElementById('addContactForm');
        this.addContactButton = document.querySelector('.btn-add button');
        this.tableBody = document.querySelector('.table tbody');

        this.editContactModal = document.getElementById('editContactModal');
        this.editContactForm = document.getElementById('editContactForm');

        this.deleteContactModal = document.getElementById('deleteContactModal');
        this.deleteContactForm = document.getElementById('deleteContactForm');
        this.deleteIdInput = document.getElementById('deleteId');
        this.confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

        this.sortContactsButton = document.getElementById('sortContactsButton');
    }

    displayModal() {
        this.modal.classList.add('show');
    }

    hideModal() {
        this.modal.classList.remove('show');
    }

    clearAddContactForm() {
        this.addContactForm.reset();
    }

    addContactToTable(contact) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${contact.id}</td>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.number}</td>
        `;
        this.tableBody.appendChild(newRow);
    }

    updateContactInTable(id, updatedContact) {
        const rows = this.tableBody.querySelectorAll('tr');
        const rowToUpdate = Array.from(rows).find(row => row.querySelector('td:first-child').textContent == id);

        if (rowToUpdate) {
            rowToUpdate.children[1].textContent = updatedContact.firstName;
            rowToUpdate.children[2].textContent = updatedContact.lastName;
            rowToUpdate.children[3].textContent = updatedContact.number;
        }
    }

    clearTable() {
        this.tableBody.innerHTML = "";
    }

    showDeleteModal() {
        this.deleteContactModal.classList.add('show');
    }

    hideDeleteModal() {
        this.deleteContactModal.classList.remove('show');
    }

    removeContactFromTable(id) {
        const rows = this.tableBody.querySelectorAll('tr');
        const rowToDelete = Array.from(rows).find(row => row.querySelector('td:first-child').textContent == id);
        if (rowToDelete) {
            rowToDelete.remove();
        } else {
            alert('Row not found.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileTable = document.querySelector('.table-bordered');

    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        const nameCell = profileTable.querySelector('tr:nth-child(1) td:nth-child(3)');
        const surnameCell = profileTable.querySelector('tr:nth-child(2) td:nth-child(3)');
        const emailCell = profileTable.querySelector('tr:nth-child(3) td:nth-child(3)');
        const genderCell = profileTable.querySelector('tr:nth-child(4) td:nth-child(3)');
        const dateOfBirthCell = profileTable.querySelector('tr:nth-child(5) td:nth-child(3)');

        nameCell.textContent = userData.name;
        surnameCell.textContent = userData.surname;
        emailCell.textContent = userData.email;
        genderCell.textContent = userData.gender === 'male' ? 'Male' : 'Female';
        dateOfBirthCell.textContent = userData.dateOfBirth;
    } else {
        console.log('User data not found. Please log in or sign up first.');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.needs-validation');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (registerForm.checkValidity()) {
                const inputName = document.getElementById('inputName').value;
                const inputSurname = document.getElementById('inputSurname').value;
                const inputEmail = document.getElementById('inputEmail').value;
                const inputPassword = document.getElementById('inputPassword').value;
                const gender = document.querySelector('input[name="gender"]:checked');
                const inputDay = document.querySelectorAll('select.form-select')[0].value;
                const inputMonth = document.querySelectorAll('select.form-select')[1].value;
                const inputYear = document.querySelectorAll('select.form-select')[2].value;

                if (!gender) {
                    alert('Виберіть стать');
                    return;
                }

                const dateOfBirth = `${inputYear}-${inputMonth}-${inputDay}`;

                const userData = new UserData(inputName, inputSurname, gender.id, inputEmail, dateOfBirth, inputPassword);
                userData.saveToLocal();

                alert('Акаунт успішно створено!');

                window.location.href = 'contact.html';
            }

            registerForm.classList.add('was-validated');
        });
    }

     const loginForm = document.querySelector('.login-form');
     if (loginForm) {
         loginForm.addEventListener('submit', (event) => {
             event.preventDefault();
 
             const inputEmail = document.getElementById('inputEmail').value;
             const inputPassword = document.getElementById('inputPassword').value;
 
             const storedUserData = localStorage.getItem('userData');
 
             if (storedUserData) {
                 const userData = JSON.parse(storedUserData);
 
                 if (userData.registered && inputEmail === userData.email && inputPassword === userData.password) {
                     alert('Вхід в акаунт успішний!');
                     window.location.href = 'contact.html';
                 } else {
                     alert('Неправильний логін чи пароль. Спробуйте ще раз.');
                 }
             } else {
                 alert('Користувач не знайдений, зареєструйтесь.');
             }
 
             loginForm.classList.add('was-validated');
         });
     }
 });