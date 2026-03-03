
//task1
/*alert("Welcome! Let's get started"); 

let email=prompt("Please enter your E-mail:");
while (!email.includes("@") && !email.includes(".")) {
    email=prompt("Please enter a valid email address:");
}

const color=prompt("what is your favourite color?");
console.log(email);
console.log(color);
document.getElementById("email").innerHTML=`Hello ${email}! Your favorite color is ${color}`;
const conformed=window.confirm("Would you like to see this again?")
if (!conformed) {
    alert("Goodbye!");
}*
/**task2 **/
 
  function calculation() {
  const number1 = parseInt(prompt("Please enter your number1:"));
  const number2 = parseInt(prompt("Please enter your number2:"));
  const operation = prompt("Please enter your operation:");

  switch (operation) {
    case "+":
      return number1 + number2;
    case "-":
      return number1 - number2;
    case "*":
      return number1 * number2;
    case "/":
      return number1 / number2;
    default:
      console.log("operation not valid");

      break;
  }
}

 
/**task3 */
function humidity(presentage_humidity, wind_speed) {
  if (presentage_humidity < 30 && wind_speed) {
    console.log("Very Dry");
  } else if (presentage_humidity >= 30 && presentage_humidity < 60) {
    console.log("Comfortable");
  } else if (presentage_humidity < 60 && wind_speed < 20) {
    console.log("Pleasant");
  } else if (presentage_humidity > 60 && wind_speed > 20) {
    console.log("Stormy");
  } else {
    console.log("Humid");
  }
}
/**task4 */
function cheack_healthy(AQI_value, PM2_5, ozone_level) {
  /**
     * Prints "Good Air" if both AQI < 50 AND PM2.5 < 35
•
Prints "Moderate" if both are between 50-100 AND 35-75 respectively
•
Prints "Unhealthy" if both are above 100 AND 75
•
Prints "Data Inconsistent" for any other combination
     */
  if (AQI_value < 50 && PM2_5 < 35 && ozone_level < 50) {
    console.log("Good Air");
  } else if (
    AQI_value >= 50 &&
    AQI_value <= 100 &&
    PM2_5 >= 35 &&
    PM2_5 <= 75 &&
    ozone_level >= 50 &&
    ozone_level <= 100
  ) {
    console.log("Moderate");
  } else if (AQI_value > 100 && PM2_5 > 75 && ozone_level > 100) {
    console.log("Unhealthy");
  } else {
    console.log("Data Inconsistent");
  }
}
// task5

/*
const user_name = prompt("Please enter your user_name:");
const Birth_Year = prompt("please enter your Birth Year:");
const Email = prompt("please enter your Email:");
const Phone = prompt("please enter your Phone Number:");
const age = 2026 - parseInt(Birth_Year);
console.log(user_name);
console.log(Birth_Year);
console.log(age);
console.log(Email);
console.log(Phone);
if (user_name.length < 3 || !user_name) {
  prompt("Invalid user_name, please enter a valid user_name:");
}
if (Birth_Year >= 1950 && Birth_Year <= 2010) {
  prompt("please enter Birth_Year, between 1950 and 2010:");
}
if (Phone.length != 11 || isNaN(Phone)) {
  prompt("please enter a valid phone number:");
}
if (!Email.includes("@") && !Email.includes(".")) {
  prompt("please enter a valid email address:with @ and . ");
}

document.getElementById("user_name").innerHTML = `User Name: ${user_name}`;
document.getElementById("Birth_Year").innerHTML = `Birth Year: ${Birth_Year}`;
document.getElementById("age").innerHTML = `Age: ${age}`;
document.getElementById("Phone").innerHTML = `Phone Number: ${Phone}`;
document.getElementById("Email").innerHTML = `Email: ${Email}`;
*/
//task 6
function grades(grade) {
  switch (grade) {
    case "A":
      console.log("Eligible for Advanced Programming Course");
      break;
    case "a":
      console.log("Eligible for Advanced Programming Course");
      break;
    case "B":
      console.log("Show Eligible for Standard Programming Course");
      break;
    case "b":
      console.log("Show Eligible for Standard Programming Course");
      break;
    case "C":
      console.log("Show Eligible for Beginner Programming Course");
      break;
    case "c":
      console.log("Show Eligible for Beginner Programming Course");
      break;
    case "D":
      console.log("Show Must take Prerequisite Course first");
      break;
    case "d":
      console.log("Show Must take Prerequisite Course first");
      break;

    default:
      console.log("Invalid grade");
      break;
  }
}

//task7

function cala() {
    let math_operation=prompt("Please enter mathematical expression ");
    const regex = /^[0-9+\-*/.]+$/; 
    if (regex.test(math_operation)) {
        let result = eval(math_operation);
        console.log("The result is: " + result);
    }
    else {
        console.log("Invalid mathematical expression.");
    }
}

//console.log("calculation done!!!!"+calculation());
//humidity(70,25);
//cheack_healthy(120,80,110);

