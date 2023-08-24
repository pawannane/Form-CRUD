const firstName = document.querySelector(".first-input");
const lastName = document.querySelector(".last-input");
const radios = document.querySelectorAll(".radio-input");
const address = document.querySelector(".address-input");
const terms = document.querySelector(".terms-input");

const table = document.querySelector(".table");
const submitBtn = document.querySelector(".submit-btn");

let gender;

submitBtn.addEventListener("click", e => {
  e.preventDefault();

  const firstNameVal = firstName.value.trim();

  const editHtml = `<input type="button" class="edit-btn" onclick="editBtn('${firstNameVal}')" value="edit">`;
  const deleteHtml = `<input type="button" class="delete-btn" onclick="deleteBtn('${firstNameVal}')" value="delete">`;

  if (validateFields()) {
    const profile = {
      "firstName": firstName.value.trim(),
      "lastName": lastName.value.trim(),
      "gender": gender,
      "address": address.value.trim(),
      "editHtml": editHtml,
      "deleteHtml": deleteHtml
    }

    localStorage.setItem(firstNameVal, JSON.stringify(profile));
    emptyFormFields();
    alert("Thank you!");

    createTable(firstNameVal);
  }
});

function validateFields() {

  radios.forEach(radio => {
    if (radio.checked)
      gender = radio.value;
  });

  if (!checkEmptyFields(firstName))
    alert("First name field is required!");
  else if (!checkEmptyFields(lastName))
    alert("Last name field is required!");
  else if (!checkGender())
    alert("Select your gender!");
  else if (!checkEmptyFields(address))
    alert("Address field is required!");
  else if (!checkCheckbox())
    alert("Select terms and conditions checkbox!")
  else
    return true;
}

function checkEmptyFields(field) {
  const fieldValue = field.value.trim();
  if (fieldValue === "") {
    return false;
  } else {
    return true;
  }
}

function checkGender() {
  if (gender == undefined)
    return false;
  else
    return true;
}

function checkCheckbox() {
  if (terms.checked)
    return true;
  else
    return false;
}

function emptyFormFields() {
  firstName.value = "";
  lastName.value = "";
  address.value = "";
  terms.checked = false;
  gender = "";

  radios.forEach(radio => {
    radio.checked = false;
  });
}

function createTable(key) {
  let { address, deleteHtml, editHtml, firstName, gender, lastName } = JSON.parse(localStorage.getItem(key));

  const tableRow = document.createElement("li");
  const tableCol = document.createElement("ul");

  const firstNameList = document.createElement("li");
  const lastNameList = document.createElement("li");
  const genderList = document.createElement("li");
  const addressList = document.createElement("li");
  const editList = document.createElement("li");
  const deleteList = document.createElement("li");

  firstNameList.innerText = firstName;
  lastNameList.innerText = lastName;
  genderList.innerText = gender;
  addressList.innerText = address;

  editList.innerHTML = editHtml;
  deleteList.innerHTML = deleteHtml;

  tableCol.append(firstNameList, lastNameList, genderList, addressList, editList, deleteList);
  tableCol.classList.add("table-col");

  tableRow.append(tableCol);
  tableRow.classList.add("table-row");

  table.append(tableRow);
  table.style.display = "flex";
}

function editBtn(key) {
  const { firstName, lastName, gender, address } = JSON.parse(localStorage.getItem(key));

  this.firstName.value = firstName;
  this.lastName.value = lastName;
  radios.forEach(radio => {
    if (gender == radio.value)
      radio.checked = true;
  });
  this.address.value = address;
  terms.checked = true;

  this.firstName.focus();
  // removeElement(key);
}

function deleteBtn(key) {
  removeElement(key);
  localStorage.removeItem(key);
}

function removeElement(ele) {
  const lists = Array.from(document.querySelectorAll('li'));

  const matchElement = lists.find(el => {
    return el.textContent.includes(ele);
  });

  matchElement.remove();
}

function initiateTable() {
  for (let i = 0; i < localStorage.length; i++) {
    createTable(localStorage.key(i));
  }
}

window.addEventListener("load", () => localStorage.length != null ? initiateTable() : null);