

const form = document.getElementById("loginForm");
const message = document.getElementById("message");

window.onload = function () {
  if (localStorage.getItem("remember") === "true") {
    document.getElementById("username").value =
      localStorage.getItem("username");
    document.getElementById("password").value =
      localStorage.getItem("password");
    document.getElementById("remember").checked = true;
  }

  loadUsers(); 
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;

  // Validation
  if (username === "" || password === "") {
    showMessage("All fields are required", "error");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters", "error");
    return;
  }

  // Login success
  showMessage("Login Successful", "success");

  if (remember) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("remember", "true");
  } else {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("remember");
  }
});

function showMessage(text, type) {
  message.textContent = text;
  message.className = type;
}



const students = [
  {
    id: 1,
    name: "Ali",
    age: 21,
    address: "Giza",
    skills: ["HTML", "CSS"],
    isLeader: false
  },
  {
    id: 2,
    name: "Sara",
    age: 23,
    address: null,
    skills: ["JavaScript", "React"],
    isLeader: true
  },
  {
    id: 3,
    name: "Omar",
    age: 22,
    address: "Alex",
    skills: ["NodeJS", "MongoDB"],
    isLeader: false
  }
];

const studentsDiv = document.getElementById("students");

students.forEach(s => {
  studentsDiv.innerHTML += `<p>${s.name} → ${s.skills.join(", ")}</p>`;
});



let usersData = [];

function loadUsers() {
  fetch("users.json")
    .then(response => response.json())
    .then(data => {
      usersData = data.users;
      fillUsersDropdown();
    })
    .catch(() => {
      console.error("Error loading users.json");
    });
}



function fillUsersDropdown() {
  const list = document.getElementById("usersList");
  list.innerHTML = `<option value="">Select User</option>`;

  usersData.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.first_name;
    list.appendChild(option);
  });
}



function getUser() {
  const id = document.getElementById("userId").value;
  const result = document.getElementById("singleUser");

  if (id === "") {
    result.textContent = "Please enter user ID";
    return;
  }

  const user = usersData.find(u => u.id == id);

  if (!user) {
    result.textContent = "User not found";
    return;
  }

  result.innerHTML = `
    <p>${user.first_name} ${user.last_name}</p>
    <img src="${user.avatar}">
  `;
}



document.getElementById("usersList").addEventListener("change", function () {
  const user = usersData.find(u => u.id == this.value);
  const output = document.getElementById("userData");

  if (!user) {
    output.innerHTML = "";
    return;
  }

  output.innerHTML = `
    <p>${user.first_name} ${user.last_name}</p>
    <img src="${user.avatar}">
  `;
});
