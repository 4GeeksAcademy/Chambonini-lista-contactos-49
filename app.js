let contacts = [];
let editingIndex = null;

function showForm() {
  document.getElementById('contactForm').style.display = 'block';
  clearForm();
}

function clearForm() {
  document.getElementById('contactId').value = '';
  document.getElementById('name').value = '';
  document.getElementById('address').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('email').value = '';
  editingIndex = null;
}

function saveContact() {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;

  if (!name || !address || !phone || !email) {
    alert('All fields are required');
    return;
  }

  const contact = { name, address, phone, email };

  if (editingIndex !== null) {
    contacts[editingIndex] = contact;
  } else {
    contacts.push(contact);
  }

  clearForm();
  document.getElementById('contactForm').style.display = 'none';
  renderContacts();
}

function renderContacts() {
  const list = document.getElementById('contactsList');
  list.innerHTML = '';

  contacts.forEach((c, index) => {
    list.innerHTML += `
      <div class="card mb-2 p-3 d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <img src="https://randomuser.me/api/portraits/men/${index + 10}.jpg" width="70" class="rounded-circle">
          <div>
            <h5>${c.name}</h5>
            <p class="mb-0"><i class="bi bi-geo-alt"></i> ${c.address}</p>
            <p class="mb-0"><i class="bi bi-telephone"></i> ${c.phone}</p>
            <p class="mb-0"><i class="bi bi-envelope"></i> ${c.email}</p>
          </div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-secondary me-2" onclick="editContact(${index})"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteContact(${index})"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    `;
  });
}

function editContact(index) {
  const contact = contacts[index];
  editingIndex = index;
  document.getElementById('name').value = contact.name;
  document.getElementById('address').value = contact.address;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('email').value = contact.email;
  document.getElementById('contactForm').style.display = 'block';
}

function deleteContact(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    contacts.splice(index, 1);
    renderContacts();
  }
}