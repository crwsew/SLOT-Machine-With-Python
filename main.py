import random


def spin_row():
    symbols = ['🍌', '🍒', '🍋', '🔔', '⭐️']
    return [random.choice(symbols) for _ in range(3)]


def print_row(row):
    print("-----------------------")
    print(" | ".join(row))
    print("-----------------------")


def get_pay(row, bet):
    # Check if all three symbols are the same
    if row[0] == row[1] == row[2]:
        if row[0] == '🍌':
            return bet * 3
        elif row[0] == '🍒':
            return bet * 4
        elif row[0] == '🍋':
            return bet * 5
        elif row[0] == '🔔':
            return bet * 10
        elif row[0] == '⭐️':
            return bet * 20

    return 0


def main():

    # Starting balance
    balance = 100

    # Statistics
    spins = 0
    wins = 0
    losses = 0
    total_bet = 0
    total_winnings = 0
    biggest_win = 0

    print("-----------------------")
    print("Welcome to Python Slots")
    print("Symbols: 🍌🍒🍋🔔⭐️")
    print("-----------------------")

    while balance > 0:
        print(f"Current balance: ${balance}")

        # Get the player's bet
        bet = input("Set your bet amount: ")

        if not bet.isdigit():
            print("Please enter a valid number")
            continue

        bet = int(bet)

        if bet > balance:
            print("Insufficient funds")
            continue

        if bet <= 0:
            print("Bet must be greater than 0")
            continue

        # Update statistics
        spins += 1
        total_bet += bet

        # Deduct the bet from the player's balance
        balance -= bet

        row = spin_row()

        print("Spinning...\n")
        print_row(row)

        payout = get_pay(row, bet)

        # Update win/loss statistics
        if payout > 0:
            wins += 1
            print(f"You won ${payout}")
        else:
            losses += 1
            print("Sorry you lost this round!")

        # Update winnings statistics
        total_winnings += payout

        if payout > biggest_win:
            biggest_win = payout

        # Add the winnings to the player's balance
        balance += payout

        play_again = input("Do you want to spin again? (Y/N): ").upper()

        if play_again != 'Y':
            break

    # Final result
    print("--------------------------------------------")
    print(f"Game over! Your final balance is ${balance}")
    print("--------------------------------------------")

    # Statistics
    print("Statistics")
    print(f"Total spins: {spins}")
    print(f"Wins: {wins}")
    print(f"Losses: {losses}")
    print(f"Total bets: ${total_bet}")
    print(f"Total winnings: ${total_winnings}")
    print(f"Biggest win: ${biggest_win}")


if __name__ == '__main__':
    main()