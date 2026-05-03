
const urlParams = new URLSearchParams(window.location.search);

const staduimId = urlParams.get("stadium");
const staduimNames=['ملعب العالمى','fun city club','ملعب الهاشمى']
document.getElementById("stadiumNameDisplay").innerHTML = staduimNames.at(staduimId-1);

const slots_container = document.getElementById("slotsContainer");
const formRegestration = document.getElementById("formRegestration");
const bookConform = document.getElementById("bookConfirm");


for (let i = 9; i <= 24; i++) {
    let amOrPm = i >= 12 ? "PM" : "AM";
    let displayHour = i > 12 ? i - 12 : i;
    let hour = displayHour + ":00 " + amOrPm;

    const slot = document.createElement("div");
    slot.classList.add("slot");


    let bookingKey = staduimId + "-" + hour.trim();
    let savedData = localStorage.getItem(bookingKey);

    if (savedData) {
        let booking = JSON.parse(savedData);
        slot.classList.add("busy"); 
        slot.innerHTML = hour + "<br><small>حجز: " + booking.first_name + "</small>";
        slot.style.pointerEvents = "none"; // قفل الساعة
    } else {
        slot.classList.add("free"); 
        slot.innerHTML = hour;
        
        slot.addEventListener("click", function () {
            bookConform.style.display = "block";
            document.getElementById("selectedTimeText").innerHTML = hour;
            currentSlot = slot; 
        });
    }
    slots_container.appendChild(slot);
}

let namePattern = /^[a-zA-Z]{3,20}$/;
let phonePattern = /^01[0125][0-9]{8}$/;
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
let currentSlot = null;

//   تأكيد الحجز 
const submitBtn = document.getElementById("confirm");
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (namePattern.test(fname) && namePattern.test(lname) && 
        emailPattern.test(email) && phonePattern.test(phone)) {
        
        let now = new Date();
        let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let optionsTime = { hour: '2-digit', minute: '2-digit' };

        // تنظيف الساعة من أي كلمات زيادة (زي كلمة حجز)
        let cleanTime = currentSlot.innerText.split('\n')[0].trim();
const staduimNames=['ملعب العالمى','fun city club','ملعب الهاشمى']

        let bookingData = {
            first_name: fname,
            last_name: lname,
            Email: email,
            Phone: phone,
            Staduim: staduimNames.at(staduimId-1),
            time_booked: cleanTime,
            date: now.toLocaleDateString('en', optionsDate),
            time: now.toLocaleTimeString('en', optionsTime),
            year: now.getFullYear()
        };

        let bookingKey = staduimId + "-" + cleanTime;
        
        // التخزين النهائي
        localStorage.setItem(bookingKey, JSON.stringify(bookingData));
        localStorage.setItem("lastBooking", JSON.stringify(bookingData));

        formRegestration.submit();
    } else {
        alert("Please enter valid data");
    }
});

// دالة إغلاق المودال
function closeModal() {
    bookConform.style.display = "none";
    formRegestration.reset();
}
   window.onclick = function(event) {
 if (bookConform.style.display === "block" && 
        !bookConform.contains(event.target) && 
        !event.target.classList.contains('slot')) {
        
        closeModal();
    }
}



