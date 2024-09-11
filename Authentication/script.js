function sendData(event) {
  event.preventDefault();
  let inputeEmail = document.querySelector(".form__input-email");
  let inputePassword = document.querySelector(".form__input-password");
  data = {
    email: inputeEmail.value,
    password: inputePassword.value,
  };
  let errors = validData(data);
  if (Object.keys(errors) == 0) {
    console.log(data);
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        Authentication: "key",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  } else {
    console.log(errors);
    if (errors.passwordError) {
      inputePassword.classList.add("form__input-password-error");
      inputePassword.placeholder = errors.passwordError;
    }
    if (errors.emailError) {
      inputeEmail.placeholder = errors.emailError;
      inputeEmail.classList.add("form__input-email-error");
    }
  }
}

function validData(data) {
  let errors = {};
  let reEmail = new RegExp(
    "^([-a-z0-9!#$%&'*+=?^_`{|}~]+(.[-a-z0-9!#$%&'*+=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?.)(aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z]))$"
  );
  let isValidEmail = reEmail.test(data.email);
  if (data.email.length == 0) {
    errors.emailError = "Заполните это поле";
  } else if (!isValidEmail) {
    errors.emailError = "Неверный формат E-mail";
  }
  if (data.password.length == 0) {
    errors.passwordError = "Заполните это поле";
  }
  return errors;
}

let form = document.querySelector(".form");
let data = {};
form.addEventListener("submit", sendData);
form.addEventListener("click", () => {
  let inputeEmail = document.querySelector(".form__input-email");
  let inputePassword = document.querySelector(".form__input-password");
  inputePassword.classList.remove("form__input-password-error");
  inputeEmail.classList.remove("form__input-email-error");
  inputePassword.placeholder = "Введите пароль";
  inputeEmail.placeholder = "Введите почту";
});
