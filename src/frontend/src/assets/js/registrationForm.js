let createForm = (data) => {
  if (data.type == "password") {
    let formContainer = document.querySelector(`#${data.id}-form`);
    // console.log(formContainer);
    formContainer.innerHTML = `
      <div class="input-box" id="${data.id}">
        <input
            type=${data.type}
            name="${data.formId}"
            id="${data.formId}"
            placeholder="${
              data.name.charAt(0).toUpperCase() + data.name.slice(1)
            }"
          />
          <input
            type=${data.type}
            name="${data.formId2}"
            id="${data.formId2}"
            placeholder="${
              data.name.charAt(0).toUpperCase() + data.name.slice(1)
            }"
          />
      </div>
    `;
  }
  if (data.type == "text" || data.type == "email") {
    let formContainer = document.querySelector(`#${data.id}-form`);
    // console.log(formContainer);
    formContainer.innerHTML = `
      <div class="input-box" id="${data.id}">
        <input
            type=${data.type}
            name="${data.formId}"
            id="${data.formId}"
            placeholder="${
              data.name.charAt(0).toUpperCase() + data.name.slice(1)
            }"
          />
      </div>
    `;
  }
};

let createInputSection = (data) => {
  let section = document.querySelector(data.section);
  // console.log(section);
  if (data.section == "#user-informations") {
    let areaGrid = Array(8)
      .fill()
      .map((v, i) => `c${i + 1}`);
    section.innerHTML = `
      <div class="input-label">
        <i class="fa-solid fa-${data.icon}"></i>
        <h2 class="input-text">${data.name}</h2>
      </div>
    `;
    let userInputs = document.createElement("div");
    userInputs.classList.add("user-details-section");
    areaGrid.forEach((element) => {
      userInputs.innerHTML += `
        <div class=${element}>
          <input
            type="text"/>
        </div>
      `;
      console.log(element);
    });
    section.appendChild(userInputs);
  }
  section.innerHTML = `
      <div class="input-label">
        <i class="fa-solid fa-${data.icon}"></i>
        <h2 class="input-text">${
          data.name.charAt(0).toUpperCase() + data.name.slice(1)
        }</h2>
      </div>
      <form action="" method="post" id="${data.id}-form"></form>
  `;
  createForm(data);
  return section;
};

let username = {
  type: "text",
  section: "#username-section",
  icon: "user-astronaut",
  name: "username",
  id: "username",
  formId: "username-registration",
  formId2: null,
};

let password = {
  type: "password",
  section: "#password-section",
  icon: "lock",
  name: "password",
  id: "password",
  formId: "password-registration",
  formId2: "password-confirmation",
};

let email = {
  type: "email",
  section: "#email-section",
  icon: "envelope",
  name: "email",
  id: "email",
  formId: "email-registration",
  formId2: "email-confirmation",
};

let user = {
  type: "email",
  section: "#user-informations",
  icon: null,
  name: null,
  id: null,
  formId: null,
  formId2: null,
};

let inputArray = [username, password, email, user];

// console.log(username.name.charAt(0).toUpperCase() + username.name.slice(1));
document
  .querySelector("#registration-container")
  .appendChild(inputArray.forEach((element) => createInputSection(element)));
