const bookingsList = document.getElementById("bookingsList");
const noBookings = document.getElementById("noBookings");

function loadMyBookings() {
    let hasData = false;
    bookingsList.innerHTML = ""; // مسح المحتوى القديم

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        // 2. فحص هل الـ Key يخص حجز ملعب؟ 
        // بنعرف ده لو كان الـ key فيه اسم stadium (تجنباً لـ lastBooking)
        if (key.includes("stadium") && key !== "lastBooking") {
            hasData = true;
            let data = JSON.parse(localStorage.getItem(key));

            const card = document.createElement("div");
            card.classList.add("booking-card");
            card.innerHTML = `
                <div class="card-header">
                    <h3>${data.Staduim}</h3>
                    <span class="status">مؤكد</span>
                </div>
                <div class="card-body">
                    <p><i class="far fa-clock"></i> الموعد: ${data.time_booked}</p>
                    <p><i class="far fa-calendar-alt"></i> التاريخ: ${data.date}</p>
                    <p><i class="fas fa-user"></i> الاسم: ${data.first_name} ${data.last_name}</p>
                </div>
                <button class="btn-delete" onclick="cancelBooking('${key}')">إلغاء الحجز</button>
            `;
            bookingsList.appendChild(card);
        }
    }

    noBookings.style.display = hasData ? "none" : "block";
}

function cancelBooking(key) {
    if (confirm("هل أنت متأكد من إلغاء هذا الحجز؟")) {
        localStorage.removeItem(key);
        loadMyBookings(); 
    }
}
loadMyBookings();