//Variables
const nodeURL = "http://localhost:3000";
const results = [0, 0, 0, 0, 0, 0];
const resultTexts = new Array(6);
let dieImage;
let currentImageIndex = 0;
let animation;

//Run at start
document.addEventListener("DOMContentLoaded", setup);
function setup(){
    dieImage = document.getElementById("die");
    for(let i = 0; i < resultTexts.length; i++) {
        resultTexts[i] = document.getElementById("result" + (i + 1));
    }
    document.getElementById("roll").addEventListener("click", rollDie);
    document.getElementById("help").addEventListener("click", helpPopup);

    //Initial roll as required
    rollDie();
}

function playDieAnimation() {
    // Get the current die number from the image source
    let currentDieNumber = parseInt(dieImage.src.match(/dice(\d)\.svg/)[1]);
    let nextDieNumber;

    //Ensure the new die number is different from the current one
    do{
        nextDieNumber = Math.floor(Math.random() * 6) + 1;  //Generate a random number between 1 and 6
    }while(nextDieNumber === currentDieNumber);  //Keep generating until it's different from the current die number

    //Update the die image to the new random number
    dieImage.src = "svgs/dice" + nextDieNumber + ".svg";
}


async function rollDie(){
    if(!animation){
        animation = setInterval(playDieAnimation, 150);
        
        const response = await fetch(nodeURL + "/roll");
        const responseText = await response.text(); // Await response
        const responseValue = parseInt(responseText, 10); // Convert text to number
        
        setTimeout(() => setRollResult(responseValue), 1049); // Use an arrow function
    }
}

function setRollResult(rollResult){
    clearInterval(animation);
    animation = null;
    results[rollResult-1]++;
    dieImage.src = "svgs/dice" + rollResult + ".svg";
    updateResultText(rollResult);
}

function updateResultText(result) {
    resultTexts[result - 1].textContent = results[result - 1];
}

function helpPopup(){
    alert("Click the Roll Me! button to roll the die.\nThe left keeps track of how many times you've rolled each number.");
}