let buttons = [];
let firstCheck = true;
let cardsSelected = [];

document
    .getElementsByClassName("button-restart")[0]
    .addEventListener("click", restartGame);

document
    .getElementsByClassName("button-start")[0]
    .addEventListener("click", startGame);

function startGame() {
    firstCheck = true;
    document.getElementById("stopwatch").style.opacity = "1";
    document.getElementsByClassName("div-nav")[0].style.opacity = "0";
    setTimeout(function () {
        document.getElementsByClassName("div-nav")[0].style.display = "none";
        document.getElementsByClassName("div-game")[0].style.display = "flex";
    }, 1000);
    setTimeout(function () {
        document.getElementsByClassName("div-game")[0].style.opacity = "1";
    }, 1500);

    let radio = document.getElementsByName("difficulty");
    for (var i = 0, length = radio.length; i < length; i++) {
        if (radio[i].checked) {
            loadGrid(radio[i].value);
        }
    }

    setTimeout(function () {
        startTimer();
    }, 2500);
    buttons = document.getElementsByTagName('button')
    buttons = Array.prototype.slice.call(buttons);
}

function restartGame() {
    document.getElementById("stopwatch").style.opacity = "0";
    document.getElementsByClassName("div-game")[0].style.opacity = "0";
    setTimeout(function () {
        document.getElementsByClassName("div-game")[0].style.display = "none";
        document.getElementsByClassName("div-nav")[0].style.display = "flex";
    }, 1000);
    setTimeout(function () {
        document.getElementsByClassName("div-nav")[0].style.opacity = "1";
    }, 1500);

    setTimeout(function () {
        document.getElementsByClassName("div-grid")[0].textContent = "";
        document.getElementsByClassName("div-win")[0].style.opacity = "0";
        document.getElementsByClassName("div-win")[0].style.display = "none";
        document.getElementsByClassName("div-grid")[0].style.opacity = "1";
        document.getElementsByClassName("div-grid")[0].style.display = "grid";
    }, 1500);

    stopTimer();
    resetTimer();
}

function cardReveal(cardSpan) {
    cardSpan.style.opacity = "1";
    cardsSelected.push(cardSpan);
    checkCards();
}

function cardHide(cardSpan) {
    cardSpan.style.opacity = "0";
}

function checkCards() {
    if (cardsSelected.length == 0) {
        return;
    } else if (cardsSelected.length == 1) {
        return;
    } else if (cardsSelected.length == 2) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        if (cardsSelected[0].textContent == cardsSelected[1].textContent) {
            cardsSelected[0].style.opacity = "1";
            cardsSelected[1].style.opacity = "1";
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].firstChild.textContent === cardsSelected[0].textContent) {
                    buttons.splice(i, 1);
                }
            }
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].firstChild.textContent === cardsSelected[1].textContent) {
                    buttons.splice(i, 1);
                }
            }
            cardsSelected = [];
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
            }
            checkWin();
            return;
        } else {
            let card1 = cardsSelected[0];
            let card2 = cardsSelected[1];
            cardsSelected = [];
            setTimeout(function () {
                cardHide(card1);
                cardHide(card2);
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = false;
                }
            }, 1000);
        }
    }
}

function checkWin() {
    if (buttons.length == 2) {
        stopTimer();
        document.getElementsByClassName("div-grid")[0].style.opacity = "0";
        setTimeout(function () {
            document.getElementsByClassName("div-grid")[0].style.display = "none";
            document.getElementsByClassName("div-win")[0].style.display = "flex";
        }, 1000);
        setTimeout(function () {
            document.getElementsByClassName("div-win")[0].style.opacity = "1";
        }, 1500);
    }
}


function loadGrid(dimension) {
    setTimeout(function () {
        if (dimension == "4") {
            let cards = document.getElementsByClassName("card");
            for (let i = 0; i < cards.length; i++) {
                cards[i].style.fontSize = "3.8vw";
            }
        } else if (dimension == "6") {
            let cards = document.getElementsByClassName("card");
            for (let i = 0; i < cards.length; i++) {
                cards[i].style.fontSize = "2.4vw";
            }
        }
    }, 1000);
    let grid = document.getElementsByClassName("div-grid")[0];
    let gridSize = dimension * dimension;
    let numberArr = [];
    while (numberArr.length < gridSize / 2) {
        let r = Math.floor((Math.random() * gridSize) / 2) + 1;
        if (numberArr.indexOf(r) === -1) numberArr.push(r);
    }
    numberArr = numberArr.flatMap((i) => [i, i]);
    numberArr = numberArr.sort(() => Math.random() - 0.5);
    for (let i = 0; i < gridSize; i++) {
        let card = document.createElement("button");
        card.classList.add("card");
        let symbol = document.createElement("span");
        symbol.classList.add("symbol");
        symbol.textContent = numberArr[i];
        card.appendChild(symbol);
        card.addEventListener("click", function () {
            cardReveal(card.firstChild);
        });
        grid.appendChild(card);
    }
    let dimensionString = "";
    for (let i = 0; i < dimension; i++) {
        dimensionString = dimensionString + "auto ";
    }
    grid.style.gridTemplateColumns = dimensionString;
}

//stopwatch

const timer = document.getElementById("stopwatch");

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }

        if (sec < 10 || sec == 0) {
            sec = "0" + sec;
        }
        if (min < 10 || min == 0) {
            min = "0" + min;
        }

        timer.textContent = min + ":" + sec;

        setTimeout("timerCycle()", 1000);
    }
}

function resetTimer() {
    timer.textContent = "00:00";
    sec = 0;
    min = 0;
}