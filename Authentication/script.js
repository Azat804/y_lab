function sendData(event) {
  event.preventDefault();
  let inputeEmail = document.querySelector(".form__input-email");
  let inputePassword = document.querySelector(".form__input-password");
  data = {
    email: inputeEmail.value,
    password: inputePassword.value,
  };
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
}
let form = document.querySelector(".form");
let data = {};
form.addEventListener("submit", sendData);
