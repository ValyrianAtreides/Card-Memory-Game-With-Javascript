let cards = document.querySelectorAll(".card");
let timer;
let pairedCards=[];
let firstCard, secondCars;
let firstClick=false;
let clickCount = 0;

pairedCards.forEach(pairedCard=> {
  pairedCardIMG=pairedCard.querySelector('.icon');
  pairedCardIMG.style.visibility='visible'
});

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    var icons = document.querySelectorAll('.icon');
    icons.forEach(function(icon) {
      icon.style.visibility = 'visible';
      setTimeout(function() {
        icon.style.visibility = 'hidden';
      }, 1500);
    });
  }, 2000);
});


function startTimer() {
  let time = 0;
  const timeDisplay = document.getElementById('time');

  timer = setInterval(function() {
    time++;
    timeDisplay.textContent = `Time: ${time}`;
  }, 1000);
}

cards.forEach(card => {
  card.addEventListener("mouseover", event => {
    event.currentTarget.classList.toggle("hover");
  });
  card.addEventListener('click', function() {
    if (!timer) {
      startTimer();
    }
  });
});

function playGame() {
  let firstClick = true; 

  cards.forEach(card => {
    card.addEventListener("click", event => {
      let clickedCard = event.currentTarget;
      let clickedCardName = clickedCard.getAttribute('name');
      let clickedCardImg = clickedCard.querySelector('.icon');
      clickedCardImg.style.visibility = 'visible';

      


      if (firstClick) {
        console.log("First click - Card Name:", clickedCardName);
        firstCard = clickedCard;
        firstClick = false;
      } else {
        console.log("Second click - Card Name:", clickedCardName);
        secondCard = clickedCard;
        clickCount++;
        document.getElementById('clickCount').textContent = `Attemps: ${clickCount}`;
        firstClick = true;
        checkPairs(firstCard, secondCard);
      }
    });
  });
}


function checkPairs(card1, card2) {
  let card1Name = card1.getAttribute('name');
  let card1Img = card1.querySelector('.icon');
  let card2Name = card2.getAttribute('name');
  let card2Img = card2.querySelector('.icon');

  if (card1Name === card2Name) {
    if (card1.id !== card2.id) {
      pairedCards.push(card1, card2);
      if (pairedCards.length==16){
        showEndGameBox() 
        clearInterval(timer); 
      }
    }else{
      setTimeout(() => {
        card1Img.style.visibility = 'hidden';
        card2Img.style.visibility = 'hidden';
      }, 1000);


    }
  }else{
    setTimeout(() => {
      card1Img.style.visibility = 'hidden';
      card2Img.style.visibility = 'hidden';
    }, 1000);


  }
}

function showEndGameBox() {
  clearInterval(timer);
  const endGameBox = document.getElementById('endGameBox');
  const endTime = document.getElementById('endTime');
  const shuffleAgainBtn = document.getElementById('shuffleAgainBtn');

  endGameBox.style.display = 'block';

  const timeDisplay = document.getElementById('time');
  const time = timeDisplay.textContent.split(' ')[1];
  endTime.textContent = `Total Time: ${time}`;

  shuffleAgainBtn.addEventListener('click', function() {
    endGameBox.style.display = 'none';
    resetGame();
  });
}


function shuffleCards() {
  
  const cardsArray = Array.from(cards);
  
  
  const shuffledCards = cardsArray.sort(() => Math.random() - 0.5);
  
  
  const cardList = document.querySelector('.cardList');
  cardList.innerHTML = ''; 
  
  shuffledCards.forEach(card => {
    cardList.appendChild(card);
  });
}

shuffleCards();
playGame();

function resetGame() {
  clearInterval(timer); 
  const endGameBox = document.getElementById('endGameBox');
  endGameBox.style.display = 'none'; 
 
  shuffleCards();

  setTimeout(function() {
    var icons = document.querySelectorAll('.icon');
    icons.forEach(function(icon) {
       icon.style.visibility = 'visible'; 
       setTimeout(function() {
         icon.style.visibility = 'hidden'; 
       }, 1500); 
    });
   }, 500); 
   
 
  startTimer();
 
  pairedCards = [];

  clickCount = 0;
  document.getElementById('clickCount').textContent = `Clicks: ${clickCount}`;
 
  cards.forEach(card => {
     let CardImg = card.querySelector('.icon');
     CardImg.style.visibility = 'hidden'; 
  });
 
}
