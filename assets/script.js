const message = document.querySelector("#message");
const button = document.querySelector("#spin-button");
const betInput = document.querySelector("#bet");
const balanceDisplay = document.querySelector("#balance");

const slot1 = document.querySelector("#slot1");
const slot2 = document.querySelector("#slot2");
const slot3 = document.querySelector("#slot3");

const spinsDisplay = document.querySelector("#spins");
const winsDisplay = document.querySelector("#wins");
const lossesDisplay = document.querySelector("#losses");
const biggestWinDisplay = document.querySelector("#biggest-win");

const symbols = ["🍌", "🍒", "🍋", "🔔", "⭐️"];

let balance = 100;

let spinCount = 0;
let winCount = 0;
let lossCount = 0;
let totalBets = 0;
let totalPayout = 0;
let maxWin = 0;


function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}


function isWinningRow() {
    return (
        slot1.textContent === slot2.textContent &&
        slot2.textContent === slot3.textContent
    );
}


function getPayout(bet, symbol) {
    if (symbol === "🍌") {
        return bet * 3;
    } else if (symbol === "🍒") {
        return bet * 4;
    } else if (symbol === "🍋") {
        return bet * 5;
    } else if (symbol === "🔔") {
        return bet * 10;
    } else if (symbol === "⭐️") {
        return bet * 20;
    }

    return 0;
}


function spin() {
    const bet = Number(betInput.value);

    if (bet > balance) {
        message.textContent = "Insufficient funds!";
        return;
    }

    if (bet <= 0) {
        message.textContent = "Bet must be greater than 0!";
        return;
    }

    spinCount++;
    totalBets += bet;

    balance -= bet;

    slot1.textContent = getRandomSymbol();
    slot2.textContent = getRandomSymbol();
    slot3.textContent = getRandomSymbol();

    let payout = 0;

    if (isWinningRow()) {
        winCount++;

        payout = getPayout(bet, slot1.textContent);

        totalPayout += payout;

        if (payout > maxWin) {
            maxWin = payout;
        }

        balance += payout;

        message.textContent = `🎉 You won $${payout}!`;
    } else {
        lossCount++;

        message.textContent = "Sorry, you lost!";
    }

    balanceDisplay.textContent = `Balance: $${balance}`;
    spinsDisplay.textContent = `Spins: ${spinCount}`;
    winsDisplay.textContent = `Wins: ${winCount}`;
    lossesDisplay.textContent = `Losses: ${lossCount}`;
    biggestWinDisplay.textContent = `Biggest Win: $${maxWin}`;
}


button.addEventListener("click", spin);