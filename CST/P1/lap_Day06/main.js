const inputField=document.getElementById("myInput");
const clockArea=document.getElementById("clockArea");
const startClock=document.getElementById("startClock");
const images=document.querySelectorAll(".gameImg");
let timer;
let counter=0;
inputField.onkeydown=(event)=>{
    alert("Key code is =>> "+event.keyCode);
    // to stop bubbling
    event.stopPropagation();

}

inputField.onmousedown=(event)=>{
    alert("mouse button clicked =>> "+event.button);
    event.stopPropagation();
}

startClock.onclick=(event)=>{
alert("clock started");
//setInterval عشان بتتكرر كل 1000ms
timer=setInterval(()=>{
    const now=new Date();
    clockArea.innerHTML=now.toLocaleTimeString();
},1000);
}
// Task Stop clock when pressing 'w'

window.onkeydown=(event)=>{
    if(event.altKey && event.key=="w" || event.key=="W"){
        clearInterval(timer);
        alert("clock stopped");
    }
}
function showScore() {
    alert("score is"+counter)
}

images.forEach((img)=>{
    console.log(img);

img.onclick=()=>{
    counter++;
}
img.addEventListener("click",showScore);
}
)

setTimeout(()=>{
    images.forEach((img)=>{
        img.removeEventListener("click",showScore);
        img.addEventListener("click",(()=>{
            alert("Game over")
        }));
    })
},10000)





