import Swal from 'sweetalert2';

const url = "https://reqres.in/api/register"

const form = document.querySelector('#form');
const emailInput = form.querySelector('#email');
const passwordInput = form.querySelector('#password');

// Register user on reqres API
const registerUser = (user) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then((response) => {
    // User SweetAlert2 to notify user
    if (response.status === 200) {
      Swal.fire({title: 'Success', text: 'You are connected', icon: 'success'})
    } else {
      Swal.fire({title: 'Error!', text: 'Oups! Something went wrong', icon: 'error'})
    }
  })
};

// Listen form submit event
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Create user object from inputs value
  const user = {
    email: emailInput.value,
    password: passwordInput.value,
  }

  // Register user on reqres API
  registerUser(user);
});
