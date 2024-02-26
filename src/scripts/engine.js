const emojis = [
    "🍟",
    "🍟",
    "🌭",
    "🌭",
    "🍕",
    "🍕",
    "😋",
    "😋",
    "🍔",
    "🍔",
    "🍫",
    "🍫",
    "🍣",
    "🍣",
    "🍴",
    "🍴",
];

let openCards = [];
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "square";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  document.querySelector(".panel").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }
  
  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
    
    state.values.result++; 
    state.view.score.textContent = state.values.result;

  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    alert("Você venceu !");
  }
}

const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),  

    },
    values: {
      hitPosition:0,
      gameVelocity: 1000,
      currentTime: 60,
      result:0,
    
    },
    actions: {
      countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      const result = state.values.result;
      const message = "Obrigado por jogar! O seu resultado foi: " + result;
      showAlert(message);
    }
  }
  
function showAlert(message) {
  alert(message);
}


function randomSquare() {
    state.view.squares.forEach((square)=>{
   
    });

    let randomNumber = Math.floor(Math.random() *9);
    let randomSquare = state.view.squares[randomNumber];
    state.values.hitPosition = randomSquare.id;
}


function addEventListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",() => {
           if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
             }
          });
     });
}

function initialize() {

    addEventListenerHitBox();
}

initialize();