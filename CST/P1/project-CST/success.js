const rawData = localStorage.getItem("lastBooking");

if (rawData) {
    const data = JSON.parse(rawData);

    document.getElementById("customerName").innerText = `${data.first_name} ${data.last_name}`;
    document.getElementById("stadiumName").innerText = data.Staduim;
    document.getElementById("stadiumTime").innerText = data.time_booked;
    document.getElementById("userPhone").innerText = data.Phone;
    document.getElementById("userEmail").innerText = data.Email;
    
    document.getElementById("fullDate").innerText = data.date;
    document.getElementById("exactMoment").innerText = data.time;
    document.getElementById("currentYear").innerText = data.year;
} else {
    window.location.href = "index.html";
}

/*


Email
: 
"msyd32831@gmail.com"
Phone
: 
"01070264606"
Staduim
: 
"stadium2"
date
: 
"Saturday, January 17, 2026"
first_name
: 
"Mohamed"
last_name
: 
"Radwan"
time
: 
"07:07 AM"
time_booked
: 
"6:00 PM"
year
: 
2026

*/