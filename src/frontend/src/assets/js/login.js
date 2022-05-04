let createLoginInterface = (state) => {
  let loginContainer = document.querySelector("#login-container");
  console.log(loginContainer);
  if (state == "login") {
    let header = createHeader();
    let oauthSection = createOauth();
    let decorationSection = createDecoration();
    let loginForm = createLoginForm();
    loginContainer.appendChild(header);
    loginContainer.appendChild(oauthSection);
    loginContainer.appendChild(decorationSection);
    loginContainer.appendChild(loginForm);
  }
};

let createHeader = () => {
  let header = document.createElement("header");
  header.classList.add("login-header");
  header.innerHTML = `
    <div id="login-logo"></div>
    <h2 class="login-title">Sign in to your account</h2>
    <p class="login-subtitle">
      Don't have an account? <span>Sign up now</span>  
    </p>
  `;
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

createLoginInterface("login");
