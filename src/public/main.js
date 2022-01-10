'use strict';

// DATA VARIABLES

let registrationData;
let occupations;
let stateOptions;

// FORM SELECTORS

const dyslexiaModeBtn = document.getElementById('dyslexiaMode');
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

// FORM POPULATION FUNCTIONS

const populateOccupations = () => {
  // Used to populate drop-down menu after fetching options from API
  for (let i = 0; i < occupations.length; i++) {
    occupationList.options[i] = new Option(`${occupations[i]}`);
  }
};

const populateStates = () => {
  // Used to populate drop-down menu after fetching options from API
  for (let i = 0; i < stateOptions.length; i++) {
    statesList.options[i] = new Option(`${stateOptions[i + 1].name}`);
  }
};

const comparePasswords = () => {
  // Compares both password fields to find a match, and displays an error if they do not
  if (passwordField.value === confirmPasswordField.value) {
    return true;
  } else {
    document.getElementById('passwordErr').classList.remove('hidden');
  }
}

// DYSLEXIC MODE

const textElements = [promptText, accountCreationForm, submissionSuccessful];
  // Used to apply styling using forEach()

const activateDyslexiaMode = () => {
  textElements.forEach( el => el.classList.toggle('dyslexic'));
}

// FORM SUBMISSION CONFIRMATION

const showConfirmation = () => {
  setTimeout(() => {
    // Timeout is applied so that elements are not shown/hidden
    // until the fade animation is complete
    accountCreationForm.classList.add('hidden');
    promptText.classList.add('hidden');
    submissionSuccessful.classList.remove('hidden');
  }, 500)
}

// EVENT LISTENERS/FETCHES

dyslexiaModeBtn.addEventListener('click', activateDyslexiaMode);

window.addEventListener('load', () => {
  // Fetches drop-down options on page load
  fetch('https://frontend-take-home.fetchrewards.com/form')
  .then(response => response.json())
  .then(data => registrationData = data)
  .then(data => occupations = registrationData.occupations)
  // Assigns occupation data to the 'occupation' variable
  .then(data => stateOptions = registrationData.states)
  // Assigns state data to the 'stateOptions' variable
  .then(() => populateOccupations())
  .then(() => populateStates())
  // Used to dynamically populate drop-down menus
});

formSubmit.addEventListener('click', () => {
  let accountCreated;
  // This variable is true only if the POST request is successful; used as a safeguard
  if (fullNameField.value && emailField.value && passwordField.value && confirmPasswordField.value) {
    // Avoids submission of an incomplete form
    if (comparePasswords()) {
      // POST request is only sent if both password fields match
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
          // If the application receives a valid response, the fading animation is triggered
          accountCreationForm.classList.add('vanish');
          promptText.classList.add('vanish');
          accountCreated = true;
          showConfirmation();
          // Displays a message to confirm the account has been made
          return response.json();
        }
      })
      .catch(error => {
        if (!accountCreated) {
          // The catch was displaying an error message regardless of outcome,
          // so the 'accountCreated' variable was added to avoid user confusion
          document.getElementById('submissionErr').classList.remove('hidden');
        }
      })
    }
  } else {
    // Displays incomplete form message if any field is left blank
    document.getElementById('incompleteForm').classList.remove('hidden');
  }
})
