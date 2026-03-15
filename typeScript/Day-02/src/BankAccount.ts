class BankAccount {
    private balance: number = 0;

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}

const myAcc = new BankAccount();
myAcc.deposit(500);
console.log(myAcc.getBalance()); // 500