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
const accountCreationForm = document.getElementById('creationForm');
const promptText = document.getElementById('accountCreationText');
const submissionSuccessful = document.getElementById('submissionSuccessful');
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

// Submission confirmation

const showConfirmation = () => {
  setTimeout(() => {
    accountCreationForm.classList.add('hidden');
    promptText.classList.add('hidden');
    submissionSuccessful.classList.remove('hidden');
  }, 500)
}

// Event Listeners & Fetches

window.addEventListener('load', () => {
  fetch('https://frontend-take-home.fetchrewards.com/form')
  .then(response => response.json())
  .then(data => registrationData = data)
  .then(data => occupations = registrationData.occupations)
  .then(data => stateOptions = registrationData.states)
  .then(() => populateOccupations())
  .then(() => populateStates())
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
          console.log('success')
          accountCreationForm.classList.add('vanish');
          promptText.classList.add('vanish');
          showConfirmation();
          return response.json();
        }
      })
      .catch(response => {
        if (!response.ok) {
          document.getElementById('submissionErr').classList.remove('hidden');
        }
      })
    }
  } else {
    document.getElementById('incompleteForm').classList.remove('hidden');
  }
})
