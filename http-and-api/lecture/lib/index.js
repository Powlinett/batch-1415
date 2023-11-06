// TODO - Fetch an activity with the Bored API - Let's psuedocode!
const url = "https://the-fork-api.students.lewagon.co/api/v1/restaurants"

// REVISIONS
const button = document.querySelector('.btn-warning');

button.addEventListener('click', (event) => {
  event.currentTarget.disabled = true;
  event.currentTarget.innerText = 'Clicked!'
});

// FETCH - GET request
const list = document.querySelector('#restaurants-list');

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((restaurant) => {
      const name = restaurant.name;

      const item = `<li>${name}</li>`;

      list.insertAdjacentHTML('beforeend', item);
    });
  });

// FETCH - POST request
const form = document.querySelector('#restaurant-form')

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputs = form.querySelectorAll("input[type='text']");
  
  const restaurant = {};

  inputs.forEach((input) => {
    const inputName = input.name;
    const inputValue = input.value;

    restaurant[inputName] = inputValue;
  });

  fetch("https://the-fork-api.students.lewagon.co/api/v1/restaurants", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': "pauline.eustachy@gmail.com",
      'X-User-Token': "vrHZCTp96xC3SroFKCoL"
    },
    body: JSON.stringify({ restaurant: restaurant })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
});
