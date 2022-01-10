# Fetch Rewards Take-Home Test
In this take-home test, I was tasked with creating a signup page that accepts fields for name, email, password, occupation, and state within the U.S.

Upon submission, a POST request is made to a Fetch Rewards API to submit the credentials for a new user. When this action is completed and the request has been verified, the user is presented with a message confirming their succcessful account creation.

## Setup
Clone this repo and run the following commands:
```
npm install
npm start
```
Open a new browser tab and go to localhost:8888 to view this project.

## Application flow

- Upon loading the application, a fetch call is made to a Fetch Rewards API to populate the drop-down menus for user occupation and state.
- From there, the user is prompted to fill out each of the input fields to create their account.
  - Error handling is implemented to ensure all fields are filled out, and that the 'Password' and 'Confirm password' fields match.
- If all fields are filled correctly, the user clicks 'Create Account' to finish the account creation process.
  - A POST request is then made to the Fetch Rewards API to complete account creation.
- If the POST request is successful, the user is presented a message informing them that they have successfully created an account.
  - If this request fails, the user is presented a message informing them that an error has occurred, and their request is not processed.

## Application Demo

![Recording 2022-01-09 at 23 45 39](https://user-images.githubusercontent.com/82003147/148727264-2be239b6-88c0-401e-87b4-f4a2bc302204.gif)

## Application Status

At this time, the core functionality of this application is complete. To ensure timely submission, a number of planned features have been omitted. These include:
- **HTML accessibility tags (such as Aria labels)**
  - This would be implemented to ensure screen reader accessibility
- **Dyslexic mode**
  - This would be accomplished by creating a button to swap the application's font family to Open Dyslexic
  - The font of this button would be written in Open Dyslexic to ensure visual accessibility
- **Dark mode**
  - If time allowed, a CSS pre-processor (i.e., Sass) would be implemented to easily apply CSS styles upon clicking a Dark Mode button
  - This button would replace the background with a black-to-gray gradient, and would change the hover state of the 'Create Account' button to be a darker orange
- **Password and email requirements**
  - _Password:_ Conditions would be applied to the 'Create Account' button's event listener to ensure that the password contains one capital letter, one lowercase letter, one symbol, one number, and that the password is longer than eight characters
  - _Email:_ Conditions would be applied to the same button's event listener to ensure that the email contains the chracters '@' and '.', and that they appear in that order
- **Mobile views**
  - Utilizing media queries, this application would be resized to fit to mobile screens. It was unclear whether this would be necessary for this test, and so it was omitted for time.

## Technologies
- JavaScript
- Node.js
- Express
- HTML
- CSS

## Contributions
- Joshua Horner
  - 
  - [LinkedIn](https://www.linkedin.com/in/joshuapaulhorner/)
  - [GitHub](https://github.com/jphorner)
