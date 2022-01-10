'use strict';

// Data variables

let registrationData;
let occupations;
let stateOptions;

// Form selectors
const fullNameField = document.getElementById('userFullName');
const emailField = document.getElementById('userEmail');
const passwordField = document.getElementById('userPassword');
const confirmPasswordField = document.getElementById('confirmUserPassword');
const formSubmit = document.getElementById('submitRegistration');
let occupationList = document.getElementById('occupationList');
let statesList = document.getElementById('statesList');

// Form population functions

const populateOccupations = () => {
  for (let i = 0; i < occupations.length; i++) {
    occupationList.options[i] = new Option(`${occupations[i]}`);
  }
};

const populateStates = () => {
  for (let i = 0; i < stateOptions.length; i++) {
    statesList.options[i] = new Option(`${stateOptions[i].name}`);
  }
};

const comparePasswords = () => {
  if (passwordField.value === confirmPasswordField.value) {
    return true;
  } else {
    document.getElementById('passwordErr').classList.remove('hidden');
  }
}

// Event Listeners

window.addEventListener('load', () => {
  fetch('https://frontend-take-home.fetchrewards.com/form')
  .then(response => response.json())
  .then(data => registrationData = data)
  .then(data => occupations = registrationData.occupations)
  .then(data => stateOptions = registrationData.states)
  .then(() => populateOccupations())
  .then(() => populateStates())
  .then(() => console.log(stateOptions))
});

formSubmit.addEventListener('click', () => {
  if (fullNameField.value && emailField.value && passwordField.value && confirmPasswordField.value) {
    if (comparePasswords()) {
      console.log('match');
      fetch('https://frontend-take-home.fetchrewards.com/form', {
        method: 'POST',
        body: JSON.stringify(
          {
            "name": fullNameField.value,
            "email": emailField.value,
            "password": passwordField.value,
            "occupation": occupationList.value,
            "state": statesList.value
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .catch(error => {
        document.getElementById('submissionErr').classList.remove('hidden');
      })
    }
  } else {
    document.getElementById('incompleteForm').classList.remove('hidden');
  }
})
