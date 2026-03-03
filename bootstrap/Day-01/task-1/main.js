// 1. تحديد العناصر
const stars = document.querySelectorAll('.fa-star');
const myAudio = document.getElementById('myAudio'); // نفس ملف الصوت بتاع الـ Contact

stars.forEach((star) => {
    // التأكد إن الحالة المبدئية موجودة
    if (!star.dataset.clicked) star.dataset.clicked = "false";

    star.addEventListener('click', function() {
        // --- إضافة جزء الصوت هنا ---
        if (myAudio) {
            myAudio.currentTime = 0; // عشان يشتغل فوراً حتى لو ضغطت بسرعة
            myAudio.play().catch(err => console.log("Audio error"));
        }
        // ------------------------

        // تبديل الحالة والشكل
        const isClicked = this.dataset.clicked === "true";
        this.dataset.clicked = !isClicked;

        this.classList.toggle('fa-solid');
        this.classList.toggle('fa-regular');
        
        // تلوين النجمة (أصفر لو مضغوطة، رمادي لو لا)
        this.style.color = (this.dataset.clicked === "true") ? "#f2e154" : "#ccc";
    });

    // تأثير الـ Hover
    star.addEventListener('mouseover', function() {
        if (this.dataset.clicked === "false") {
            this.classList.replace('fa-regular', 'fa-solid');
        }
    });

    star.addEventListener('mouseout', function() {
        if (this.dataset.clicked === "false") {
            this.classList.replace('fa-solid', 'fa-regular');
        }
    });
});