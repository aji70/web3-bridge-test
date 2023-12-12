const form = document.getElementById("form");
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");

    const firstname_err = document.getElementById("firstname_err");
    const lastname_err = document.getElementById("lastname_err");
    const email_err = document.getElementById("email_err");
    const phone_err = document.getElementById("phone_err");

    const contactListContainer = document.getElementById("list");
    const displaybtn = document.querySelector('.display')

    const elements = [
      { element: firstname, err: firstname_err },
      { element: lastname, err: lastname_err },
      { element: email, err: email_err },
      { element: phone, err: phone_err },
    ];

    const contacts = [];

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm()) {
        addContact();
        // displayContacts();
        resetForm();
      }
    });

    displaybtn.addEventListener('click', displayContacts);

    function validateForm() {
      let isValid = true;
      elements.forEach((content) => {
        const fieldname = content.element.getAttribute("id");
        const value = content.element.value.trim();
        if (value === "") {
          content.err.innerHTML = `${fieldname} is required`;
          isValid = false;
        } else {
          content.err.innerHTML = "";
        }
      });
      return isValid;
    }

    function addContact() {
      const contact = {
        firstname: firstname.value.trim(),
        lastname: lastname.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
      };
      contacts.push(contact);
    }

    function displayContacts() {
      contactListContainer.innerHTML = "<h2>Contact List</h2>";
      contacts.forEach((contact, index) => {
        const contactDiv = document.createElement("div");
        contactDiv.innerHTML = `
          <p><strong>Name:</strong> ${contact.firstname} ${contact.lastname}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone}</p>
          <button onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})">Delete</button>
        `;
        contactListContainer.appendChild(contactDiv);
      });
    }

    function editContact(index) {
      const contact = contacts[index];
      firstname.value = contact.firstname;
      lastname.value = contact.lastname;
      email.value = contact.email;
      phone.value = contact.phone;
      contacts.splice(index, 1); // Remove the contact from the list
      displayContacts();
    }

    function deleteContact(index) {
      contacts.splice(index, 1); // Remove the contact from the list
      displayContacts();
    }

    function resetForm() {
      elements.forEach((content) => {
        content.element.value = "";
        content.err.innerHTML = "";
      });
    }