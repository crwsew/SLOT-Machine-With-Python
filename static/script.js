const message = document.querySelector("#message");

const button = document.querySelector("#spin-button");

const betInput = document.querySelector("#bet");

const balanceDisplay =
    document.querySelector("#balance");


const slot1 = document.querySelector("#slot1");
const slot2 = document.querySelector("#slot2");
const slot3 = document.querySelector("#slot3");


const spinsDisplay =
    document.querySelector("#spins");

const winsDisplay =
    document.querySelector("#wins");

const lossesDisplay =
    document.querySelector("#losses");

const totalBetsDisplay =
    document.querySelector("#total-bets");

const totalWinningsDisplay =
    document.querySelector("#total-winnings");

const biggestWinDisplay =
    document.querySelector("#biggest-win");


// Send spin request to Flask
function sendSpin(bet) {

    return fetch("/spin", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            bet: bet
        })

    })
        .then(response => {

            return response.json().then(data => {

                if (!response.ok) {
                    throw new Error(data.error);
                }

                return data;
            });
        });
}


// Update statistics on the page
function updateStatistics(data) {

    spinsDisplay.textContent =
        `Spins: ${data.spins}`;

    winsDisplay.textContent =
        `Wins: ${data.wins}`;

    lossesDisplay.textContent =
        `Losses: ${data.losses}`;

    totalBetsDisplay.textContent =
        `Total Bets: $${data.total_bets}`;

    totalWinningsDisplay.textContent =
        `Total Winnings: $${data.total_winnings}`;

    biggestWinDisplay.textContent =
        `Biggest Win: $${data.biggest_win}`;
}


// Main spin function
function spin() {

    const bet = Number(betInput.value);

    if (bet <= 0) {

        message.textContent =
            "Bet must be greater than 0!";

        return;
    }

    button.disabled = true;

    sendSpin(bet)

        .then(data => {

            // Display symbols
            slot1.textContent =
                data.row[0];

            slot2.textContent =
                data.row[1];

            slot3.textContent =
                data.row[2];


            // Display balance
            balanceDisplay.textContent =
                `Balance: $${data.balance}`;


            // Display message
            message.textContent =
                data.message;


            // Update statistics
            updateStatistics(data);
        })

        .catch(error => {

            message.textContent =
                error.message;

            console.log(error);
        })

        .finally(() => {

            button.disabled = false;
        });
}


button.addEventListener("click", spin);