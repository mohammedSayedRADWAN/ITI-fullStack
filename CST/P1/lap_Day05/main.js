const quotes = [
  "Learning programming teaches you how to think and solve problems logically.",
  "Programming is not about memorizing syntax, but understanding how things work.",
  "Every line of code you write makes you a better problem solver.",

  "Every line of code you write makes you a better problem solver.",
  "Learning to program is learning how to break big problems into small ones.",
  "The more you practice programming, the more confident you become.",
  "Mistakes in code are not failures, they are lessons to improve your skills.",
  "Programming skills grow with patience, practice, and persistence.",
  "When you learn programming, you gain the power to build your own ideas.",
  "Debugging your code is one of the best ways to learn programming.",
  "Learning programming opens doors to endless creativity and innovation.",
  "Every programmer starts as a beginner and improves step by step."
];
const favorites_qoutes=[]
    const quote=document.getElementById("quote")
    const charCount=document.getElementById("charCount")
    const wordCount=document.getElementById("wordCount")
    const vowelCount=document.getElementById("vowelCount")
    const listFav=document.getElementById("favList")
    const showDateTimeBtn=document.getElementById("showDateTimeBtn")
    const dateTimeDisplay=document.getElementById("dateTimeOutput")
    const ageCalculatorSection=document.getElementById("ageCalculatorSection")
    const countDownTimerSection=document.getElementById("countDownTimerSection")
function random_qoute() {
    if(quotes.length!==0){
    let random_idx=Math.floor(Math.random()*quotes.length);
    quote.innerHTML=quotes[random_idx];

    charCount.innerHTML=`Character Count: ${quote.textContent.length}`;

    // count words only
    let words=quote.textContent.trim().split(/\s+/)
    let numof_words=words.length
    wordCount.innerHTML=`Word Count: ${numof_words}`
    
//  note split return array and match work  with string
    let numOfVowels = quote.textContent.trim().match(/[aeiou]/gi).length;
    vowelCount.innerHTML=`Vowel Count: ${numOfVowels}`;

    }
    else{
        console.log("qoutes is empty");
        
    }
}

function addfavouriteQoutes() {
    favorites_qoutes.push(quote.textContent);
    console.log(favorites_qoutes);
}

function showfavouriteQoutes() {
    listFav.innerHTML="";    
    for (let i = 0; i < favorites_qoutes.length; i++) {
        let li=document.createElement("li");
        li.textContent=favorites_qoutes[i];
        listFav.appendChild(li);                
    }
}

/*qoustion task1
1-use try and catch to handle error

3-How would you ensure the same quote doesn't appear twice in a row?
you can create index array with 

*/
// task 2

function showDateTime() {
    //Monday, January 11, 2026"
    const today = new Date();

const options = { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};
const timeOption1 = { 
  hour:'numeric',
  minute:'2-digit',
    hour12:true
};
const timeOption2 = { 
  hour:'numeric',
  minute:'2-digit',
  hour12:false
};
//date
const date=today.toLocaleDateString('en-US', options);
const time1=today.toLocaleTimeString('en-US', timeOption1);
const time2=today.toLocaleTimeString('en-US', timeOption2);
const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
const year= today.getFullYear();
const month= today.getMonth();
const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const daysRemaining = lastDayOfMonth - today.getDate();

console.log(date);
console.log(time1);
console.log(time2);
console.log(weekday);
console.log(daysRemaining);
  dateTimeDisplay.innerHTML = `
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>12-Hour Time:</strong> ${time1}</p>
        <p><strong>24-Hour Time:</strong> ${time2}</p>
        <p><strong>Day of Week:</strong> ${weekday}</p>
        <p><strong>Days Remaining in Month:</strong> ${daysRemaining} days</p>
    `;

}

function ageCalculator() {
    const birthYear = prompt("Enter your birth year:");
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    const age_month = age * 12;
    const age_days = age * 365;
ageCalculatorSection.innerHTML=`
    <p><strong>Your age with years is:</strong> ${age} years</p>
    <p><strong>Your age in months is:</strong> ${age_month} months</p>
    <p><strong>Your age in days is:</strong> ${age_days} days</p>
`
}
//ageCalculator()
function countDown(){
    const targetDate = new Date("january  01 , 2027 00:00:00").getTime();
//setInterval applay every miilysecond
    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countDownTimerSection.innerHTML = `
        <p><strong>Days:</strong> ${days}</p>
        <p><strong>Hours:</strong> ${hours}</p>
        <p><strong>Minutes:</strong> ${minutes}</p>
        <p><strong>Seconds:</strong> ${seconds}</p>
    `;
    if (distance < 0) {
        clearInterval(interval);
        countDownTimerSection.innerHTML = "<p><strong>Time's up!</strong></p>";
    }
    }, 1000);
}
countDown()


function email_validation() {
    // Contains exactly one @ symbol
    let count_at_sign=0;
    let count_dot=0;
    const email=prompt("Enter your email:");
    for (const char of email) {
        if (char==='@') {
            count_at_sign++;
        }
    }
     if (count_at_sign===1) {
        console.log("valid number of sign");
    }
    else{
        console.log("email have more than one @ {number of @} is "+count_at_sign);
    }
    //@ is not at the first or last position
    if (email[0]==='@') {
        console.log("email can not start with @");
    }
    if (email[email.length-1]==='@') {
        console.log("email can not end with @");
    }
    //Contains at least one dot (.) after the @ symbol
    let idxOfat=email.indexOf('@');
    let email_at=email.slice(idxOfat+1); 
     for (const dot of email_at) {
        if (dot==='.') {
            count_dot++;
        }
    }

     if (count_dot===1) {
        console.log("valid number of dots");
    }
    if (count_dot>1) {
                console.log(" not valid number of dots");
    }
    if (email_at[0]=='.' ) {
            console.log('postion of dot not valid ');
                        console.log('char before @ is '+email.charAt(email.indexOf('@')-1));
        }
        if (email.charAt(idxOfat-1)=='.') {
            console.log('postion of dot not valid ');
            console.log('char before @ is '+email.charAt(email.indexOf('@')-1));    
        }
        if (idxOfat==0||idxOfat==1) {
            console.log(" There are at least 2 characters before @");

        }
        if (email[idxOfat+3]=='.') {
            
        }
    else{
        console.log("dot have more than one @ {number of dot} is "+count_dot);
    }
    console.log(email.slice(idxOfat+1));
    
    
   
}
//email_validation()
function user_name_validator() {
    
    const spechal_char=['!','@','#','$','%','^','&','*','(',')','_','+','='];
    const randomchar=['a','b','c','d','e']
    const userName = prompt("Enter your username:");
    if (userName.length>=5&&userName.length<=15) {
            console.log("valid length of char");
    }
    if (spechal_char.includes(userName[0])) {
        console.log("user name can not start with special char");
    }
    if (userName.includes(' ')) {
        console.log("user name can not have space");
    }
  let idx=Math.floor(Math.random()*randomchar.length);
  console.log(idx);
  
  let random_char=spechal_char[idx];
  let idx1=Math.floor(Math.random()*randomchar.length);
  let random_char1=randomchar[idx1];
  let idx2=Math.floor(Math.random()*randomchar.length);
let random_char2=randomchar[idx2];
let newUser_name=random_char+random_char1+random_char2+userName
console.log(newUser_name);


}

user_name_validator( )

// task5
let grades = [78, 95, 45, 32, 88, 100, 55, 73, 91, 18, 67, 82];

// 1. Basic Operations
// Sort in descending order (b - a)
const sortedGrades = [...grades].sort((a, b) => b - a);

// Find highest valid grade (<= 100) using find() 
// Note: find() returns the first element that meets the criteria
const highestGrade = sortedGrades.find(g => g <= 100);

// Find the lowest grade
const lowestGrade = Math.min(...grades);

// Calculate Average
const averageGrade = grades.reduce((acc, curr) => acc + curr, 0) / grades.length;

// 2. Filtering Operations
const failingGrades = grades.filter(g => g < 60);
const excellentGrades = grades.filter(g => g >= 90);
const passCount = grades.filter(g => g >= 60).length;

// 3. Grade Categories Function
function analyzeCategories(gradeArray) {
    const categories = { Excellent: 0, VeryGood: 0, Good: 0, Pass: 0, Fail: 0 };
    
    gradeArray.forEach(g => {
        if (g >= 90) categories.Excellent++;
        else if (g >= 80) categories.VeryGood++;
        else if (g >= 70) categories.Good++;
        else if (g >= 60) categories.Pass++;
        else categories.Fail++;
    });
    return categories;
}

// 4. Grade Adjustment (Curve Grades)
function curveGrades(gradeArray) {
    return gradeArray.map(g => {
        if (g < 60) {
            let newGrade = g + 5;
            return newGrade > 100 ? 100 : newGrade; // Ensure no grade > 100
        }
        return g;
    });
}

// --- Display Results ---
console.log("Sorted (Descending):", sortedGrades);
console.log("Highest Valid Grade:", highestGrade);
console.log("Lowest Grade:", lowestGrade);
console.log("Average:", averageGrade.toFixed(2));
console.log("Failing Grades:", failingGrades);
console.log("Passing Students Count:", passCount);
console.log("Categories:", analyzeCategories(grades));

// Example of Curve Grades execution
let curved = curveGrades(grades);
console.log("Updated Grades after Curve:", curved);


// task 6
let students = [
    { name: "Ahmed", degree: 92, major: "CS" },
    { name: "Sarah", degree: 58, major: "IT" },
    { name: "John", degree: 85, major: "CS" }
];

// 1. Search Operations
const topStudent = students.find(s => s.degree >= 90 && s.degree <= 100);
const highCS = students.filter(s => s.major === "CS" && s.degree > 80);

function searchByName(name) {
    return students.find(s => s.name.toLowerCase() === name.toLowerCase());
}

// 2. Display & Sort
const failedNames = students.filter(s => s.degree < 60).map(s => s.name);
const alphaSorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
const degreeSorted = [...students].sort((a, b) => b.degree - a.degree);

// 3. Modification
students.push({ name: "Elena", degree: 77, major: "IS" });
const removed = students.pop();
students.splice(2, 0, { name: "New1", degree: 80, major: "CS" }, { name: "New2", degree: 70, major: "IT" });
students.splice(3, 1); // Remove 4th student

// 5. Statistics
const stats = {};
students.forEach(s => {
    if (!stats[s.major]) stats[s.major] = { total: 0, count: 0 };
    stats[s.major].total += s.degree;
    stats[s.major].count++;
});
Object.keys(stats).forEach(m => stats[m].avg = stats[m].total / stats[m].count);

// task 7
function validateBirthDate(input) {
    if (input.length !== 10) return "Error: Please use DD-MM-YYYY format";
    if (input.charAt(2) !== '-' || input.charAt(5) !== '-') return "Error: Hyphens at 2 and 5";
    
    const [d, m, y] = input.split('-');
    const day = parseInt(d), month = parseInt(m), year = parseInt(y);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return "Error: Digits only";
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2026) return "Invalid values";

    const birthDate = new Date(year, month - 1, day);
    const today = new Date(); // Jan 12, 2026

    if (birthDate > today) return "Error: Date cannot be in the future";

    // Age Calculation
    let age = today.getFullYear() - birthDate.getFullYear();
    const mDiff = today.getMonth() - birthDate.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birthDate.getDate())) age--;

    return {
        fullText: birthDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        age: age,
        dayBorn: birthDate.toLocaleDateString('en-US', { weekday: 'long' })
    };
}
// task 8
function analyzeText(text) {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
    
    const wordFreq = {};
    words.forEach(w => {
        const lowW = w.toLowerCase();
        wordFreq[lowW] = (wordFreq[lowW] || 0) + 1;
    });

    return {
        charsWithSpaces: text.length,
        charsNoSpaces: text.replace(/\s/g, '').length,
        wordCount: words.length,
        sentenceCount: sentences.length,
        longestWord: words.reduce((a, b) => a.length > b.length ? a : b)
    };
}
//task 9
function calculate(num1, num2, op) {
    try {
        if (num1 === "" || num2 === "") throw new Error("Empty input: Both fields are required");
        
        const n1 = Number(num1), n2 = Number(num2);
        if (isNaN(n1) || isNaN(n2)) throw new Error("Invalid input: Please enter numbers only");

        let result;
        switch(op) {
            case '/': 
                if (n2 === 0) throw new Error("Math Error: Cannot divide by zero");
                result = n1 / n2; break;
            case 'sqrt':
                if (n1 < 0) throw new Error("Math Error: Square root of negative number");
                result = Math.sqrt(n1); break;
            default: result = n1 + n2; // simplified
        }

        if (!isFinite(result)) throw new Error("Result is infinity");
        if (result > Number.MAX_SAFE_INTEGER) throw new Error("Result too large");

        return result;
    } catch (error) {
        console.error(`[${new Date().toISOString()}] ${error.message}`);
        return `<span style="color: red;">${error.name}: ${error.message}</span>`;
    } finally {
        console.log("Calculation attempt completed");
    }
}

// task 10
const screen = document.getElementById('game-screen');

// --- GAME 1: GUESS THE NUMBER ---
function startGuessGame() {
    const target = Math.floor(Math.random() * 100) + 1;
    let attempts = 7;
    
    const play = () => {
        const guess = parseInt(prompt(`Guess a number (1-100). Attempts left: ${attempts}`));
        
        if (isNaN(guess)) return;

        const distance = Math.abs(target - guess);
        attempts--;

        if (guess === target) {
            const score = (attempts + 1) * 10;
            screen.innerHTML = `<h3>Winner!</h3><p>Correct! The number was ${target}.<br>Score: ${score} points.</p>`;
        } else if (attempts === 0) {
            screen.innerHTML = `<h3>Game Over</h3><p>The number was ${target}.</p>`;
        } else {
            const hint = guess > target ? "Too High" : "Too Low";
            alert(`${hint}! You are ${distance} away from the target.`);
            play();
        }
    };
    play();
}

// --- GAME 2: DICE ROLLING SIMULATOR ---
function startDiceGame() {
    let stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let totalRolls = 20;

    for (let i = 0; i < totalRolls; i++) {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        stats[die1]++;
        stats[die2]++;
    }

    // Find most frequent number
    let mostFreqNum = Object.keys(stats).reduce((a, b) => stats[a] > stats[b] ? a : b);
    
    // Expected probability per number is (Total Dice Rolled / 6)
    const expected = ((totalRolls * 2) / 6).toFixed(2);

    screen.innerHTML = `
        <h3>Dice Stats (20 Rolls / 40 Dice)</h3>
        <p>Most Frequent Number: <strong>${mostFreqNum}</strong></p>
        <p>Frequency Table: ${JSON.stringify(stats)}</p>
        <hr>
        <p>Actual vs Expected Frequency (of "${mostFreqNum}"): <br>
        Actual: ${stats[mostFreqNum]} | Expected: ${expected}</p>
        <button onclick="startDiceGame()">Roll Again</button>
    `;
}

// --- GAME 3: RANDOM MATH QUIZ ---
async function startMathQuiz() {
    let score = 0;
    const startTime = Date.now();

    // 1. Addition
    const n1 = Math.floor(Math.random() * 100);
    const n2 = Math.floor(Math.random() * 100);
    const ans1 = parseInt(prompt(`What is ${n1} + ${n2}?`));
    if (ans1 === (n1 + n2)) score++;

    // 2. Multiplication
    const m1 = Math.floor(Math.random() * 20);
    const m2 = Math.floor(Math.random() * 20);
    const ans2 = parseInt(prompt(`What is ${m1} * ${m2}?`));
    if (ans2 === (m1 * m2)) score++;

    // 3. Rounding
    const decimal = (Math.random() * 100).toFixed(2);
    const ans3 = parseInt(prompt(`Round ${decimal} to the nearest integer:`));
    if (ans3 === Math.round(decimal)) score++;

    // 4. Max/Min
    const numbers = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
    const maxVal = Math.max(...numbers);
    const ans4 = parseInt(prompt(`What is the maximum number in this list: [${numbers.join(', ')}]?`));
    if (ans4 === maxVal) score++;

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    const percentage = (score / 4) * 100;

    screen.innerHTML = `
        <h3>Quiz Results</h3>
        <p>Score: ${score}/4 (${percentage}%)</p>
        <p>Time Taken: ${timeTaken} seconds</p>
        <button onclick="startMathQuiz()">Restart Quiz</button>
    `;
}












