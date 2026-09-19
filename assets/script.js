const message = document.querySelector("#message");
const button = document.querySelector("#spin-button");
const betInput = document.querySelector("#bet");
const balanceDisplay = document.querySelector("#balance");

const slot1 = document.querySelector("#slot1");
const slot2 = document.querySelector("#slot2");
const slot3 = document.querySelector("#slot3");

const symbols = ["🍌", "🍒", "🍋", "🔔", "⭐️"];

let balance = 100;

function spin() {
    const bet = Number(betInput.value);

    // Check the bet
    if (bet > balance) {
        message.textContent = "Insufficient funds!";
        return;
    }

    if (bet <= 0) {
        message.textContent = "Bet must be greater than 0!";
        return;
    }

    // Deduct the bet
    balance -= bet;

    // Spin the reels
    slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Calculate payout
    let payout = 0;

    if (
        slot1.textContent === slot2.textContent &&
        slot2.textContent === slot3.textContent
    ) {

        if (slot1.textContent === "🍌") {
            payout = bet * 3;
        } else if (slot1.textContent === "🍒") {
            payout = bet * 4;
        } else if (slot1.textContent === "🍋") {
            payout = bet * 5;
        } else if (slot1.textContent === "🔔") {
            payout = bet * 10;
        } else if (slot1.textContent === "⭐️") {
            payout = bet * 20;
        }

        balance += payout;

        message.textContent = `🎉 You won $${payout}!`;

    } else {
        message.textContent = "Sorry, you lost!";
    }

    // Update balance on the page
    balanceDisplay.textContent = `Balance: $${balance}`;
}

button.addEventListener("click", spin);