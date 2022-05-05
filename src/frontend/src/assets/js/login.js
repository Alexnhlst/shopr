let username = {
  type: "text",
  section: "username-section",
  icon: "user-astronaut",
  name: "Username",
  id: "username",
  formId: "username-registration",
  formId2: null,
};

let password = {
  type: "password",
  icon: "lock",
  section: "password-section",
  name: "Password",
  confirmName: "Confirm password",
  id: "password",
  confirmId: "password-confirmation",
  formId: "password-registration",
  formId2: "password-confirmation",
};

let email = {
  type: "email",
  section: "email-section",
  icon: "envelope",
  name: "Email",
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

let inputArray = [username, password, email];

let loginContainer = document.querySelector("#login-container");

let createInterface = (state) => {
  if (state == "login") {
    createLoginInterface();
  } else if (state == "register") {
    createRegisterInterface();
  }
};

let createLoginInterface = () => {
  loginContainer.innerHTML = "";
  loginContainer.id = "login-container";
  let elements = [
    createHeader("login"),
    createOauth(),
    createDecoration(),
    createLoginForm(),
  ];
  elements.forEach((element) => loginContainer.appendChild(element));
  let stateLink = document.querySelector("#login");
  console.log(stateLink);
  stateLink.addEventListener("click", createRegisterInterface);
};

let createRegisterInterface = () => {
  loginContainer.innerHTML = "";
  loginContainer.id = "registration-container";
  loginContainer.prepend(createHeader("register"));
  let stateLink = document.querySelector("#register");
  console.log(stateLink);
  stateLink.addEventListener("click", createLoginInterface);
  let formContainer = document.createElement("form");
  formContainer.method = "post";
  formContainer.id = "form-container";
  loginContainer.appendChild(formContainer);
  formContainer.appendChild(createRegistrationForm(username));
  formContainer.appendChild(createRegistrationForm(password));
  formContainer.appendChild(createRegistrationForm(email));
  console.log(inputArray);
  let btn = document.createElement("div");
  btn.id = "confirm-btn";
  btn.innerHTML = `<input type="submit" value="Next" id="btn-next"/>`;
  formContainer.appendChild(btn);
  btn.addEventListener("click", createAdditionalForm);
};

let createAdditionalForm = () => {
  loginContainer.innerHTML = "";
  loginContainer.id = "additional-container";
  loginContainer.prepend(createHeader("additional"));
  let formContainer = document.createElement("form");
  formContainer.method = "post";
  formContainer.id = "form-container";
  loginContainer.appendChild(formContainer);
  let inputContainter = document.createElement("div");
  inputContainter.id = "additional-info";
  inputContainter.innerHTML = `
    <label for="first-name">First name</label>
    <input type="text" name="first-name" id="first-name"/>
    <label for="last-name">Last name</label>
    <input type="text" name="last-name" id="last-name"/>
    <label for="phone-number">Phone number</label>
    <input type="tel" name="phone-number" id="phone-number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"  placeholder="123-45-678"/>
    <label for="birth-date">Birth date</label>
    <input type="date" id="birth-date" name="birth-date"/>
    <label for="street-name">Street name</label>
    <input type="text" name="street-name" id="street-name"/>
    <label for="street-number">Street number</label>
    <input type="number" name="street-number" id="street-number"/>
    <label for="city">City</label>
    <input type="text" name="city" id="city"/>
    <label for="province">Province</label>
    <input type="text" name="province" id="province"/>
    <label for="state">State</label>
    <select class="state-select" id="state">
      <option value="State" disabled selected>State</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Australia">Australia</option>
      <option value="Europe">Europe</option>
    </select>
    <label for="info-question">How do you hear about us? </label>
    <select class="state-select" id="state">
      <option value="State" disabled selected>State</option>
      <option value="Africa">Africa</option>
      <option value="America">America</option>
      <option value="Asia">Asia</option>
      <option value="Australia">Australia</option>
      <option value="Europe">Europe</option>
    </select>
  `;
  formContainer.appendChild(inputContainter);
  let btnPrev = document.createElement("div");
  btnPrev.id = "prev-btn";
  btnPrev.innerHTML = `<input type="submit" value="Back" id="btn-back"/>`;
  let btnNext = document.createElement("div");
  btnNext.id = "next-btn";
  btnNext.innerHTML = `<input type="submit" value="Next" id="btn-next"/>`;
  loginContainer.appendChild(btnPrev);
  loginContainer.appendChild(btnNext);
  btnPrev.addEventListener("click", createRegisterInterface);
  btnNext.addEventListener("click", createBillingInterface);
};

let createBillingInterface = () => {
  loginContainer.innerHTML = "";
  loginContainer.id = "billing-container";
  loginContainer.prepend(createHeader("billing"));
  let btnPrev = document.createElement("div");
  btnPrev.id = "prev-btn";
  btnPrev.innerHTML = `<input type="submit" value="Back" id="btn-back"/>`;
  let btnNext = document.createElement("div");
  btnNext.id = "next-btn";
  btnNext.innerHTML = `<input type="submit" value="Next" id="btn-next"/>`;
  loginContainer.appendChild(btnPrev);
  loginContainer.appendChild(btnNext);
  btnPrev.addEventListener("click", createRegisterInterface);
};

let createHeader = (state) => {
  let header = document.createElement("header");
  header.classList.add("login-header");
  if (state == "login") {
    header.innerHTML = `
    <div id="login-logo"></div>
    <h2 class="login-title">Sign in to your account</h2>
    <p class="login-subtitle">
      Don't have an account? <span id="login">Sign up now</span>
    </p>
  `;
  } else if (state == "register") {
    header.innerHTML = `
    <div id="login-logo"></div>
    <h2 class="login-title">Create an account</h2>
    <p class="login-subtitle">
      Already have an account? <span id="register">Sign in now</span>
    </p>
  `;
  } else if (state == "additional") {
    header.innerHTML = `
    <div id="login-logo"></div>
    <h2 class="login-title">You're almost there</h2>
    <p class="login-subtitle">
      We need some additional info</span>
    </p>
    `;
  } else if (state == "billing") {
    header.innerHTML = `
    <div id="login-logo"></div>
    <h2 class="login-title">Add billing informations</h2>
    <p class="login-subtitle">
      Add a payment method</span>
    </p>
    `;
  }
  return header;
};

let createOauth = () => {
  let section = document.createElement("section");
  section.id = "oauth";
  section.innerHTML = `
    <p class="login-subtitle">Sign in with</p>
    <div class="btns">
      <button class="oauth-btn" id="google">
        <i class="fa fa-google"></i>
      </button>
      <button class="oauth-btn" id="google">
        <i class="fa fa-facebook"></i>
      </button>
      <button class="oauth-btn" id="google">
        <i class="fa fa-google"></i>
      </button>
    </div>
  `;
  return section;
};

let createDecoration = () => {
  let section = document.createElement("section");
  section.id = "login-decoration";
  section.innerHTML = `
    <div id="login-text">
      <div class="decoration left"></div>
      <p class="login-subtitle">Or continue with</p>
      <div class="decoration right"></div>
    </div>
  `;
  return section;
};

let createLoginForm = () => {
  let section = document.createElement("section");
  section.id = "login-form";
  section.innerHTML = `
    <form action="" method="post">
            <label for="email">Email address</label>
            <input type="email" name="email" id="email" />
            <label for="password">Password</label>
            <input type="password" name="password" id="password" />
            <div id="login-settings">
              <div id="remember-me">
                <input type="checkbox" name="remember" id="remember" />
                <label for="remember">Remember me</label>
              </div>
              <a href="" class="login-link">Forgot your password?</a>
            </div>
            <input type="submit" value="Sign in" />
          </form>
  `;
  return section;
};

let createRegistrationForm = (data) => {
  let inputContainter = document.createElement("div");
  inputContainter.id = data.section;
  if (data.type == "text" || data.type == "email") {
    inputContainter.innerHTML = `
      <label for="${data.id}">${data.name}</label>
      <input type="${data.type}" name="${data.id}" id="${data.id}"/>
    `;
  }
  if (data.type == "password") {
    inputContainter.innerHTML = `
      <label for="${data.id}">${data.name}</label>
      <input type="${data.type}" name="${data.id}" id="${data.id}"/>
      <label for="${data.confirmId}">${data.confirmName}</label>
      <input type="${data.type}" name="${data.confirmId}" id="${data.confirmId}"/>
    `;
  }
  return inputContainter;
};

// let createRegistrationForm = (data) => {
//   let formContainer = document.querySelector(data.section);
//   console.log(formContainer);
//   formContainer.innerHTML = `
//       <form method="post" id="${data.id}-form">
//         <div class="input-box" id="${data.id}">
//         <label for="${data.id}">${
//     data.name.charAt(0).toUpperCase() + data.name.slice(1)
//   }
//         </label>
//           <input
//             type=${data.type}
//             name="${data.formId}"
//             id="${data.formId}"
//             placeholder="${
//               data.name.charAt(0).toUpperCase() + data.name.slice(1)
//             }"
//           />
//         </div>
//       </form>
//     `;
// };

createInterface("register");

// let createLoginInterface = (state) => {
//   let loginContainer = document.querySelector("#login-container");
//   if (state == "login") {
//     let elements = [
//       createHeader(state),
//       createOauth(),
//       createDecoration(),
//       createLoginForm(),
//     ];
//     elements.forEach((element) => loginContainer.appendChild(element));
//     let changeState = document.querySelector("#login");
//     console.log(changeState);
//     changeState.addEventListener("click", () => {
//       state = "register";
//       console.log(state);
//     });
//   } else if (state == "register") {
//     loginContainer.id = "registration-container";
//     let header = createHeader(state);
//     loginContainer.innerHTML = `
//       <section id="username-section"></section>
//       <section id="password-section"></section>
//       <section id="email-section"></section>
//       <section id="user-informations"></section>
//     `;
//     loginContainer.prepend(header);
//   }
// };

// let changeState = (state) => {
//   let input;
//   if (state == "login") {
//     input = document.querySelector("#login");
//   } else if (state == "register") {
//     input = document.querySelector("#register");
//   }
//   return input;
// };

// // createLoginInterface("register");
// createLoginInterface("login");
