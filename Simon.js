let gameSequence=[];
let userSequence=[];
// bellow btns array will help to choose the random btn using their indexing
let btns=["red","yellow","green","blue"];


// started track game start/end
let started = false;
// level track the level of the game
let level = 0;


// accessing h2 element of the document where level will we updated
let h2 = document.querySelector("h2");


/* now we want to startgame by any key press on the document.but we want to start gane only if game is not started so we apply if condition and also we change the value of "started" to true when game has been started */
document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});


/* now we want that after any key press and game start any random button flash up and also the level is incresed that is shown on the screen as well at the heading section. So for this a function "levelUp is called just after game start" */

function btnFlash(btn){
    btn.classList.add("flash"); // this add class "flash to the btn"
    /* now this will give new styling permanently. To give flash like view we change styling to original one after few intervals. For that we use setTimeout() method and also remove the class provided to button after that timeout */
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}

function levelUp() {
    userSequence=[];
    level++;
    h2.innerText= `Level ${level}`;

    /* now we want to flash button. button will flash in two conditions , first when the random button is choosed and second when user click the button. And bcz this work is required to be done repeatedly, so we make a function "btnFlash" for this. And that function will take the button as an argument. Also we change the color of the button for a very short time to show flash feature , for that new styling will be given to the button for a short time. So we make a new class for that styling*/

    /* Now before flashing the button we have to randomly choose any button. We choose random button by using the "btns" array created above. By Math.random() function we get any random number from 0 to 3 and that is used as random index of btns array. Using index we save the value related to that index and then we use that value to select the class (array elements are same as the class names that have button stylings) */
    let ranIndex = Math.floor(Math.random()*4);
    let ranColor = btns[ranIndex];
    let ranBtn = document.querySelector(`.${ranColor}`);

    // we add the first flashed btn to our game sequence
    gameSequence.push(ranColor);
    // console.log(gameSequence);

    btnFlash(ranBtn);
}


/* Till now only once button is flashed that too on game start. Now game will wait for user response and after that further process like levelup/gameover will be executed */

function checkAns(idx){
    
    if(userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            levelUp();
        }
    }
    else {
        h2.innerHTML=`Game Over with Score ${level}!<br> Press any Key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },500);
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

        // below we are tracking user response
    let userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    // now we checking the response
    /*NOTE:- our cirrent level will represent the size of userSequence and gameSequence */
    checkAns(userSequence.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}


/* Now we will work on both the sequence arrays so that we can decide whether to level up or over the game */



function reset(){
    started = false;
    gameSequence=[];
    userSequence=[];
    level=0;
}