const $frmRegister = document.querySelector("#frmSignUp")

$frmRegister.addEventListener('submit', ($event) => {
  $event.preventDefault();
  // debugger
  const $name = document.querySelector("#name")
  const $email = document.querySelector("#email");
  const $password = document.querySelector("#pass");
  const $password2 = document.querySelector("#passConfir");
  const $emailExis = document.querySelector("#emailExis")
  const $diffPass = document.querySelector("#diffPass")
  if ($password.value.trim() == $password2.value.trim()) {
    getUserByEmail($name, $password, $email, $emailExis)
    $diffPass.classList.add("d-none")
    $diffPass.classList.remove("d-flex")
  }
  else {
    $diffPass.classList.remove("d-none")
    $diffPass.classList.add("d-flex")
  }
});

async function getUserByEmail(name, password, email, emailExis) {
  // debugger
  try {
    $emailValue = email.value.trim()
    const url = 'http://localhost:8080/api/user/' + $emailValue
    const response = await fetch(url)
    const responseJson = await response.json();
    console.log(responseJson)
    if (responseJson == true) {
      emailExis.classList.remove("d-none")
      emailExis.classList.add("d-flex")

    } else {
      sendDataToBackend(name, password, email)
    }
  } catch (error) {

  }
}

async function sendDataToBackend(name, password, email) {
  try {
    $nameValue = name.value.trim()
    $emailValue = email.value.trim()
    $passwordValue = password.value.trim()
    if ($nameValue == null || $emailValue==null || $passwordValue == null) {

    } else {
      const url = "http://localhost:8080/api/user/new";
      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({
          password: $passwordValue,
          email: $emailValue,
          name: $nameValue

        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(url, fetchOptions);
      const responseConverted = await response.json();
      console.log(`responseConverted`, responseConverted);
      window.location.href = "index.html";
      alert("creado")
    }

  } catch (error) {
    console.log(`error`, error);
  }
}