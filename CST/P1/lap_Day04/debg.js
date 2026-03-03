"use strict";
function calculateDiscount(price, discount) {
if (discount > 100) {
alert("Invalid discount");
}
finalPrice = price - (price * discount / 100);
return finalPrice;
}
//problem 1
let userPrice = parseFloat(prompt("Enter price:"))
//problem 2
let userDiscount = parseFloat(prompt("Enter discount percentage:"));
let result = calculateDiscount(userPrice, userDiscount);
console.log("Final Price: $" + result);