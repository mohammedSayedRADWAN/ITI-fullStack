// spinner
const loader = document.getElementById("loader");

function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}
 
// dynamic buttons
const meals = ["pizza", "beef", "chicken", "pasta"];
const buttonsContainer = document.getElementById("buttons");

meals.forEach(meal => {
    const btn = document.createElement("button");
    btn.innerText = meal;
    btn.classList.add("btn");

    btn.addEventListener("click", () => {
        getMeal(meal);
    });

    buttonsContainer.appendChild(btn);
});


// display meals
function display(list) {
    let container = "";

    for (let i = 0; i < list.length; i++) {
        container += `
        <div class="card">
            <img src="${list[i].image_url}" alt="meal image">
            <div class="card-content">
                <h3>${list[i].title}</h3>
                <p>${list[i].publisher}</p>
            </div>
        </div>
        `;
    }

    document.querySelector(".container").innerHTML = container;
}

// get meals
function getMeal(type) {
    showLoader();
    document.querySelector(".container").innerHTML = "";

    let myReq = new XMLHttpRequest();
    myReq.open(
        "GET",
        `https://forkify-api.herokuapp.com/api/search?q=${type}`
    );
    myReq.send();

    myReq.onload = function () {
        hideLoader();

        if (myReq.status === 200) {
            let data = JSON.parse(myReq.response);
            display(data.recipes);
        }
    };
}

// default load
getMeal("pizza");


