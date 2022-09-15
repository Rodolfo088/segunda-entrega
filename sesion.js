let formulario = document.querySelector("#login");

function login(event) {
  event.preventDefault();
  let valueUsername = formulario.username.value;
  let valuePassword = formulario.password.value;

  const objetoUsuario = {
    username: valueUsername,
    password: valuePassword,
  };

  const token = generateToken(objetoUsuario.username, objetoUsuario.password);
  localStorage.setItem("token", token);
  const isAuth = existToken();
  if (isAuth) {
    const divPrivateContent = document.querySelector("#privateContent");
    divPrivateContent.className = "showContent";
    formulario.className = "hideContent";
    showUsername();
  }
}

function generateToken(username, password) {
  const usuario = {
    username,
    password,
  };
  return JSON.stringify(usuario);
}

function existToken() {
  if (localStorage.getItem("token") !== null) {
    return true;
  } else {
    return false;
  }
}

function showUsername() {
   const strong = document.querySelector("#usernameLogin");
   const token = JSON.parse(localStorage.getItem("token"));
   strong.innerHTML = token.username;
}