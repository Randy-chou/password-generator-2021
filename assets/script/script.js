// Assignment Code
var generateBtn = document.querySelector("#generate");

//Condition Variables for Password Generation
var passlength = 0;
var categoryCount = 0;

//This array is used to determine how many of each type of character ends up in the password. This is to ensure that at least one of each selected character types appears in the final randomized password.
var typedata = [0,0,0,0];
console.log(typedata);

//Arrays
var specialChars = [ "!" , "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "{", "|", "}", "~", "\"", '\`'];
var alphabet = "abcdefghijklmnopqrstuvwxyz"
var numeric = "0123456789"

// Write password to the #password input
function writePassword() {
  window.alert("start!");
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword(){
  getPassLength();
  var returnString = "";
  while(passlength != 0){
    var temp = Math.floor(Math.random() * 4);
    if(typedata[temp] != 0){
      switch (temp) {
        case 0:
          returnString += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
          break;
        case 1:
          returnString += alphabet.charAt(Math.floor(Math.random() * alphabet.length)).toUpperCase();
          break;
        case 2:
          returnString += numeric.charAt(Math.floor(Math.random() * numeric.length));
          break;
        case 3:
          returnString += specialChars[Math.floor(Math.random() * specialChars.length)];
          break;
        default:
        window.alert("Oops?");
      }
      typedata[temp]--;
      passlength--;
    }
  }
  reset();
  return returnString;
}

//Obtain user input to get password length.
function getPassLength(){
  let input = Number(prompt("Enter a password length between 8 to 128 characters."));
  if(isNaN(input)){
    window.alert("Please enter a number.");
  }else if(input > 128){
    window.alert("Password length is too long.");
  }else if(input < 8){
    window.alert("Password length is too short.");
  }else{
    passlength = Number(input);
    console.log(input);
    getBooleans();
  }
}

//Obtain user input to get character types to include in the password, as well as update the table to ensure that every selected character types has at least one character in the final randomized password.
function getBooleans(){
  categorycount = 0;
  if(window.confirm("Include lowercase letters?")){
    typedata[0] = 1;
    categoryCount += 1;
  }
  if(window.confirm("Include uppercase letters?")){
    typedata[1] = 1;
    categoryCount += 1;
  }
  if(window.confirm("Include numerical characters?")){
    typedata[2] = 1;
    categoryCount += 1;
  }
  if(window.confirm("Include special characters?")){
    typedata[3] = 1;
    categoryCount += 1;
  }
  if(categoryCount > 0){
    dividePassword();
  }else{
    window.alert("Please choose at least one character type.");
  }
}

//Divides the rest of characters of the password between the selected types of character to ensure that there is at least one of each selected category in the final password.
function dividePassword(){
  var remainingChars = passlength - categoryCount;
  console.log("remainingChars:" + remainingChars);
  while(remainingChars != 0){
    var temp = Math.floor(Math.random() * 4);
    if(typedata[temp] != 0){
      typedata[temp]++;
      remainingChars--;
    }
  }
  console.log(typedata);
}


function reset() {
  passlength = 0;
  categoryCount = 0;
  var typedata = [0,0,0,0];
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
