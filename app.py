from flask import Flask, render_template, jsonify, request
from main import spin_row, get_pay

app = Flask(__name__)

# Game state
balance = 100

# Statistics
spin_count = 0
win_count = 0
loss_count = 0
total_bets = 0
total_winnings = 0
biggest_win = 0


@app.route("/")
def home():
    message = "Welcome to Python Slots!"
    return render_template("index.html", message=message)


@app.route("/spin", methods=["POST"])
def spin():
    global balance
    global spin_count
    global win_count
    global loss_count
    global total_bets
    global total_winnings
    global biggest_win

    data = request.get_json()

    bet = data["bet"]

    # Validate bet
    if bet > balance:
        return jsonify({"error": "Insufficient funds!"}), 400

    if bet <= 0:
        return jsonify({"error": "Bet must be greater than 0!"}), 400

    # Update statistics
    spin_count += 1
    total_bets += bet

    # Deduct bet
    balance -= bet

    # Spin
    row = spin_row()

    # Calculate payout
    payout = get_pay(row, bet)

    # Update win/loss
    if payout > 0:
        win_count += 1
        message = f"🎉 You won ${payout}!"
    else:
        loss_count += 1
        message = "Sorry, you lost!"

    # Update winnings
    total_winnings += payout

    if payout > biggest_win:
        biggest_win = payout

    # Add payout
    balance += payout

    return jsonify(
        {
            "row": row,
            "payout": payout,
            "balance": balance,
            "spins": spin_count,
            "wins": win_count,
            "losses": loss_count,
            "total_bets": total_bets,
            "total_winnings": total_winnings,
            "biggest_win": biggest_win,
            "message": message,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
