'use strict';

let registrationData;
let occupations;
let stateOptions;
let occupationList = document.getElementById('occupationList');
let statesList = document.getElementById('statesList');

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


//   .then(() => console.log('OPTIONS: ', registrationData))
//   .then(() => console.log('OCCUPATIONS: ', occupations))
//   .then(() => console.log('STATES: ', stateOptions))
