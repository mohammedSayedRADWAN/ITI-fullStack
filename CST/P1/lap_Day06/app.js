const gameArea = document.getElementById("game_area");
const basket = document.getElementById("basket");
const scoreElement = document.getElementById("score"); // غيرنا الاسم عشان نفرق

let currentScore = 0; // متغير رقمي لحساب السكور

gameArea.onmousemove = (event) => {
    let rect = gameArea.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let basketX = mouseX - 40;

    if (basketX < 0) basketX = 0;
    if (basketX > gameArea.offsetWidth - 80) {
        basketX = gameArea.offsetWidth - 80;
    }
    basket.style.left = basketX + "px";
};

function moveBall(ball) {
    let fallInterval = setInterval(() => {
        let currentTop = parseInt(ball.style.top) || 0;
        ball.style.top = (currentTop + 5) + "px";

        let ballrect = ball.getBoundingClientRect();
        let basketrect = basket.getBoundingClientRect();

        // كشف التصادم
        if (ballrect.bottom >= basketrect.top && 
            ballrect.left >= basketrect.left && 
            ballrect.right <= basketrect.right) {
            
            let points = parseInt(ball.dataset.points);
            currentScore += points; // بنزود المتغير الرقمي
            scoreElement.innerText = currentScore; // بنحدث النص في الصفحة
            
            ball.remove();
            clearInterval(fallInterval); // نفس الاسم
        }

        // لو الكورة ضاعت في الأرض
        if (currentTop > gameArea.offsetHeight) {
            ball.remove();
            clearInterval(fallInterval);
        }
    }, 20);
}

function createBall() {
    const prototype = document.getElementById('ballPrototype');
    const newBall = prototype.cloneNode(true); 
    
    let rand = Math.random();
    if (rand > 0.9) {
        newBall.className = "ball-template gold-ball";
        newBall.dataset.points = 5;
    } else if (rand < 0.2) {
        newBall.className = "ball-template red-ball";
        newBall.dataset.points = -1;
    } else {
        newBall.className = "ball-template blue-ball";
        newBall.dataset.points = 1;
    }
    
    // تصحيح: عشان الكورة متخرجش يمين (عرض الملعب - عرض الكورة)
    newBall.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 30)) + "px";
    newBall.style.top = "0px";
    gameArea.appendChild(newBall);

    moveBall(newBall);
}

const startBtn = document.getElementById("startBtn");
let gameStarted = false;

startBtn.onclick = function() {
    if (!gameStarted) {
        gameStarted = true;
        startBtn.style.display = "none";
        setInterval(createBall, 2000);
    }
};