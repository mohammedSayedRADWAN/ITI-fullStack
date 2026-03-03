function Account(accountNumber,accountName,accountBalance) {
    this.accountNumber = accountNumber;
    this.accountName = accountName;
    this.accountBalance = accountBalance;
}
Account.prototype.deposit = function (amount) {
    this.accountBalance += amount 
}


Account.prototype.withDraw = function (amount) {
    if (this.accountBalance>=amount) {
            this.accountBalance -= amount

    } else {
        console.log("your balance not enough");
        
    }
}


Account.prototype.getBalance = function () {
    return this.accountBalance
}

function savingAccount(accountNumber, accountName, accountBalance,intersetsRate) {
    Account.call(this, accountNumber, accountName, accountBalance); 

    this.intersetsRate = intersetsRate
    
}
Object.setPrototypeOf(savingAccount.prototype, Account.prototype);

savingAccount.prototype.addintersets=function() {
let interestAmount = this.accountBalance * (this.intersetsRate);
    this.deposit(interestAmount);

console.log(`Interests added: ${interestAmount}`);

}
function createAccount(accountNumber, accountName, accountBalance,overDraftLimit){
    Account.call(this,accountNumber,accountName,accountBalance)

    this.overDraftLimit=overDraftLimit
}
Object.setPrototypeOf(createAccount.prototype, Account.prototype);

createAccount.prototype.withDraw=function(amount){
      if (amount <= this.accountBalance + this.overDraftLimit) {
    this.accountBalance -= amount;
    console.log(`Withdrawn: ${amount}. New Balance: ${this.accountBalance}`);
  } else {
    console.log("Rejected! Exceeded Overdraft Limit.");
  }
}
let mySavings = new savingAccount("1001", "Ahmed", 5000, 0.05);
mySavings.deposit(1000)
console.log(mySavings.getBalance());
mySavings.addintersets(); 
console.log(mySavings.getBalance());

let myCurrent = new createAccount("C202", "Mohamed", 2000, 1000); 

myCurrent.withDraw(2500); 
console.log(myCurrent.getBalance()); 
myCurrent.withDraw(600); // شوف هيطبع رسالة الخطأ؟