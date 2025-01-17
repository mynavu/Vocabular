import { words } from './wordlist.js';


const accessKey = "URwpAwxTX53WzaSQVKi_VwNKNExJ0Z4Tt5D8J1YqZl4";


let currentLine = 1;
let rowsAndCols = {1 : [], 2 : [], 3 : [], 4 : [], 5 : [], 6 : []};
const keys = document.querySelectorAll("[data-letter]");
const definitionOutput = document.getElementById("definitionOutput");
const partOfSpeechOutput = document.getElementById("partOfSpeechOutput");


const outcome = document.getElementById("outcome");
const exitButton = document.querySelector(".exit-button");
const exitButton2 = document.querySelector(".exit-button2");


const currentAmount = document.getElementById("currentAmount");
let numberOfCoins = 100;


const vocabButton = document.querySelector(".vocabButton");


const winOrLose = document.querySelector(".winOrLose");
const revealAndAdd = document.querySelector(".revealAndAdd");


const imageButton = document.getElementById("imageButton");
const definitionButton = document.getElementById("definitionButton");


const addToDictButton = document.getElementById("addToDict");




const nextWord2 = document.getElementById("nextWord2");
const imageOutput = document.getElementById("imageOutput");
const nextWord = document.getElementById("nextWord");
const characterImage = document.querySelector(".characterImage");


let imageUrlArray = [];


const numberOfImages = document.querySelector(".numberOfImages");
let showingImageNumber = 0;


let definition;


const dictionaryList = document.getElementById("dictionaryList");


let dictionaryObject = {};


const vocabContainer = document.querySelector(".vocabContainer");
const noWords = document.querySelector(".noWords");


const storedCoins = localStorage.getItem("coins_stored");
const storedVocab = localStorage.getItem("vocab_stored");


if (storedCoins) {
   numberOfCoins = Number(storedCoins);
   console.log(numberOfCoins);
}




let keyBoardEnabled = true;


   keys.forEach((key) => {
       let currentSpot;
       key.addEventListener("click", () => {
           if (!keyBoardEnabled) return;


           const letter = key.textContent.toUpperCase();
           if (letter !== "DELETE" && letter !== "ENTER" && rowsAndCols[currentLine].length < 5) {
               rowsAndCols[currentLine].push(letter);
               currentSpot = document.getElementById(`r${currentLine}c${rowsAndCols[currentLine].length}`);
               currentSpot.innerText = letter;
           } else if (letter === "ENTER") {
               if (rowsAndCols[currentLine].length !== 5) {
                   alert("Too short");
               } else {
                   if (chosenWord) {
                       console.log(showResults(chosenWord, rowsAndCols[currentLine]));
                   }
                   currentLine++;
               }
           } else if (letter === "DELETE" && rowsAndCols[currentLine].length > 0) {
               currentSpot = document.getElementById(`r${currentLine}c${rowsAndCols[currentLine].length}`);
               currentSpot.innerText = "";
               rowsAndCols[currentLine].splice(rowsAndCols[currentLine].length - 1, 1);
           }
       });


       document.addEventListener("keydown", (event) => {
           if (!keyBoardEnabled) return;


           if (event.key.toUpperCase() === key.dataset.letter.toUpperCase()) {
               const letter = key.textContent.toUpperCase();
               if (letter !== "DELETE" && letter !== "ENTER" && rowsAndCols[currentLine].length < 5) {
                   rowsAndCols[currentLine].push(letter);
                   currentSpot = document.getElementById(`r${currentLine}c${rowsAndCols[currentLine].length}`);
                   currentSpot.innerText = letter;
               } else if (letter === "ENTER") {
                   if (rowsAndCols[currentLine].length !== 5) {
                       alert("Too short");
                   } else {
                       if (chosenWord) {
                           showResults(chosenWord, rowsAndCols[currentLine]);
                       }
                       currentLine++;
                   }
               } else if (letter === "DELETE" && rowsAndCols[currentLine].length > 0) {
                   currentSpot = document.getElementById(`r${currentLine}c${rowsAndCols[currentLine].length}`);
                   currentSpot.innerText = "";
                   rowsAndCols[currentLine].splice(rowsAndCols[currentLine].length - 1, 1);
               }
           }
       });
   });




exitButton.addEventListener("click", () => {
outcome.close();
outcome.style.display = "none";
})


exitButton2.addEventListener("click", () => {
dictionaryList.close();
dictionaryList.style.display = "none";
})


function updateCoins() {
   currentAmount.innerHTML = numberOfCoins;
   localStorage.setItem("coins_stored", JSON.stringify(numberOfCoins));
};


updateCoins();


let enableDefinition = true;


definitionButton.addEventListener("click", ()=> {
   if (numberOfCoins >= 3 && enableDefinition) {
       numberOfCoins -= 3;
       updateCoins();
       definitionOutput.innerText = definition;
       enableDefinition = false;
   } else if (numberOfCoins < 3) {
       alert("You do not have enough coins");
   } else {
       alert("No more definitions allowed");
   }
});


imageButton.addEventListener("click", ()=> {
   if(numberOfCoins >= 1 && imageUrlArray.length >= 1) {
       const imgElement = document.createElement("img");
       imgElement.src = imageUrlArray[0];
       imgElement.classList.add("imageContainer");
       imageOutput.appendChild(imgElement);
       numberOfCoins -= 1;
       updateCoins();
       showingImageNumber++;
       imageUrlArray.splice(0, 1);
   } else if (numberOfCoins < 1) {
       alert("You do not have enough coins");
   } else if (imageUrlArray.length < 1) {
       alert("There are no more images");
   }
   if (showingImageNumber !== 0) {
       if (showingImageNumber === 1) {
           numberOfImages.innerText = `Showing ${showingImageNumber.toString()} image`;
       } else {
           numberOfImages.innerText = `Showing ${showingImageNumber.toString()} images`;
       }
   }
});


vocabButton.addEventListener("click", () => {
   dictionaryList.style.display = "block";
   if (Object.keys(dictionaryObject).length <= 0) {
       noWords.style.display = "block";
   } else {
       noWords.style.display = "none";
   }
   console.log(dictionaryObject);
   console.log(Object.keys(dictionaryObject).length);


});


if (storedVocab) {
   dictionaryObject = JSON.parse(storedVocab);
   console.log(dictionaryObject);
   Object.keys(dictionaryObject).forEach((word) => {
       const wordCard = document.createElement("div");
       wordCard.className = "vocabCard";
       wordCard.innerHTML = `<span class="bold">${word.toUpperCase()}</span>: ${dictionaryObject[word]}`;
       vocabContainer.appendChild(wordCard);
   })
};


addToDictButton.addEventListener("click", () => {
   if (addToDictButton.innerText !== "Added") {
       dictionaryObject[chosenWord] = definition;
       localStorage.setItem("vocab_stored", JSON.stringify(dictionaryObject));
       addToDictButton.innerText = "Added";
       const wordCard = document.createElement("div");
       wordCard.className = "vocabCard";
       wordCard.innerHTML = `<span class="bold">${chosenWord.toUpperCase()}</span>: ${definition}`;
       vocabContainer.appendChild(wordCard);
       console.log(dictionaryObject);
   }
});




function clearBoard() {
   for (let i = 1; i < 7; i++) {
       let currentRow = i;
       for (let j = 1; j < 6; j++) {
           let currentColumn = j;
           let spot = document.getElementById(`r${currentRow}c${currentColumn}`);
           spot.innerText = "";
           spot.style.background = "black";
           spot.classList.remove("blue");
           spot.classList.remove("purple");
           spot.classList.remove("grey");
       }
   }
};


function showResults(chosenWord, enteredWord) {
   const chosenWordArray = chosenWord.toUpperCase().split("");
   let frequencyOfUsersLetters = {};
   let frequencyOfChosenLetters = {};
   let handleDuplicates = {};
   let correctLetters = {};
   // Check win or lose condition
   winOrLoseDisplay(chosenWord, enteredWord);


   // Frequency calculations
   for (let i = 0; i < 5; i++) {
       frequencyOfUsersLetters[enteredWord[i]] = (frequencyOfUsersLetters[enteredWord[i]] || 0) + 1;
       frequencyOfChosenLetters[chosenWordArray[i]] = (frequencyOfChosenLetters[chosenWordArray[i]] || 0) + 1;
       if (enteredWord[i] === chosenWordArray[i]) {
           correctLetters[enteredWord[i]] = (correctLetters[enteredWord[i]] || 0) + 1;
       }
   }


   enteredWord.forEach((letter, index) => {
       const currentColor = document.getElementById(`r${currentLine}c${index + 1}`);
       const currentKey = document.querySelector(`[data-letter="${letter.toUpperCase()}"]`);
       const differenceOfFrequency = frequencyOfUsersLetters[letter] - frequencyOfChosenLetters[letter];


       // Handle exact match (purple)
       if (letter === chosenWordArray[index]) {
           currentColor.classList.add("purple");
           currentKey.style.background = "rgb(203, 108, 230)"; // Purple
           if (handleDuplicates[letter]) {
               handleDuplicates[letter] -= 1;
           }
       }
       // Handle partial match (blue)
       else if (
           chosenWordArray.includes(letter) &&
           frequencyOfUsersLetters[letter] <= frequencyOfChosenLetters[letter] &&
           correctLetters[letter] !== frequencyOfChosenLetters[letter]
       ) {
           if (currentKey.style.background !== "rgb(203, 108, 230)") {
               currentKey.style.background = "rgb(156, 227, 254)"; // Blue
           }
           currentColor.classList.add("blue");
       }
       // Handle duplicate letters (blue or grey)
       else if (
           chosenWordArray.includes(letter) &&
           frequencyOfUsersLetters[letter] > frequencyOfChosenLetters[letter] &&
           correctLetters[letter] !== frequencyOfChosenLetters[letter]
       ) {
           if (!handleDuplicates[letter] || handleDuplicates[letter] < frequencyOfChosenLetters[letter]) {
               handleDuplicates[letter] = (handleDuplicates[letter] || 0) + 1;
               currentColor.classList.add("blue");
               if (currentKey.style.background !== "rgb(203, 108, 230)") {
                   currentKey.style.background = "rgb(156, 227, 254)"; // Blue
               }
           } else {
               currentColor.classList.add("grey");
               if (
                   currentKey.style.background !== "rgb(156, 227, 254)" &&
                   currentKey.style.background !== "rgb(203, 108, 230)"
               ) {
                   currentKey.style.background = "grey";
               }
           }
       }
       // Handle non-matching letters (grey)
       else {
           currentColor.classList.add("grey");
           if (
               currentKey.style.background !== "rgb(156, 227, 254)" &&
               currentKey.style.background !== "rgb(203, 108, 230)"
           ) {
               currentKey.style.background = "grey";
           }
       }
   });
}


function winOrLoseDisplay(chosenWord, enteredWord) {
   if (chosenWord.toUpperCase() === enteredWord.join("")) {
       setTimeout(() => {
           winOrLose.innerText = "That's Vocabular!";
           nextWord2.style.display = "block";
           keyBoardEnabled = false;
           characterImage.src = "character1.png";
           revealAndAdd.innerHTML = `Add <span class="yellow">${chosenWord.toUpperCase()}</span> to dictionary?`;
           outcome.showModal();
           outcome.style.display = "block";
           numberOfCoins += 8 - currentLine;
           updateCoins();
       }, 1000);
       return;
   } else if (currentLine === 6) {
       setTimeout(() => {
           winOrLose.innerText = "Better Luck Next Time...";
           nextWord2.style.display = "block";
           keyBoardEnabled = false;
           characterImage.src = "character2.png";
           revealAndAdd.innerText = `The word was ${chosenWord.toUpperCase()}`;
           outcome.showModal();
           outcome.style.display = "block";
       }, 1000);
       return;
   }
}


let chosenWord;


function clearLevel() {
   clearBoard();
   nextWord2.style.display = "none";
   while (imageOutput.firstChild) {
       imageOutput.removeChild(imageOutput.firstChild);
   }
   keyBoardEnabled = true;
   imageUrlArray.splice(0, imageUrlArray.length);
   definition = "";
   definitionOutput.innerText = "UNLOCKED";
   showingImageNumber = 0;
   numberOfImages.innerText = "UNLOCKED";
   currentLine = 1;
   rowsAndCols = {1 : [], 2 : [], 3 : [], 4 : [], 5 : [], 6 : []};
   keys.forEach((key) => key.style.background = "white");
   enableDefinition = true;
   addToDictButton.innerText = "Add to Dictionary";
};


function generateWord() {
   clearLevel();
   let index = Math.round(Math.random()*words.length);
   chosenWord = words[index];
   if (chosenWord) {
       const chosenWordApi = `https://dictionaryapi.com/api/v3/references/learners/json/${chosenWord}?key=b7722104-056c-4374-bc5a-b5b771b9ea34`;
       fetch(chosenWordApi)
       .then(response => response.json())
       .then(data => {
       console.log("WORD:", chosenWord);
       getImage(chosenWord);
       for (let i = 0; i < data.length; i++) {
           if  (data[i].shortdef.length > 0) {
               definition = data[i].shortdef[0];
               const partOfSpeech = data[i].fl;
               partOfSpeechOutput. innerText = partOfSpeech.toUpperCase();
               break;
       };
       }
       })
       .catch(error => console.log("error"));
   }
}


generateWord();


nextWord2.addEventListener("click", ()=> {
   generateWord();
});


nextWord.addEventListener("click", ()=> {
   outcome.close();
   outcome.style.display = "none";
   generateWord();
});




function preload(url) {
   return new Promise((resolve, reject) => {
       const img = new Image();
       img.src = url;
       img.onload = () => resolve(url);
       img.onerror = reject;
   });
}


function getImage(chosenWord) {
   const url = `https://api.unsplash.com/search/photos?page=1&query=${chosenWord}`;
   fetch(url, {
     headers: {
       Authorization: `Client-ID ${accessKey}`,
     },
   })
     .then((response) => response.json())
     .then((data) => {
       imageUrlArray = data.results.slice(0,3).map((result) => result.urls.small);
       console.log(imageUrlArray);
       const preloadPromises = imageUrlArray.map((imageUrl) => preload(imageUrl));
       return Promise.all(preloadPromises);
     })
     .catch((error) => {
       console.error("Error:", error);
     });
};


