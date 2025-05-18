import matplotlib.pyplot as plt
import numpy as np

# Option parameters
strike_price = 50  # Strike price of the option
premium = 5        # Premium paid for the option

# Generate a range of possible stock prices at expiration
stock_prices = np.linspace(30, 80, 500)

# Calculate profit for each stock price
# Profit = max(Stock Price at Expiration - Strike Price, 0) - Premium
# The max(..., 0) part represents the payoff of the call option
# We subtract the premium paid upfront
profit = np.maximum(stock_prices - strike_price, 0) - premium

# Create the plot
plt.figure(figsize=(10, 5))  # Set figure size for better readability

# Plot the profit line
plt.plot(stock_prices, profit, label='Call Option Profit', color='b')

# Add horizontal line at profit = 0 (breakeven line)
plt.axhline(0, color='black', linewidth=0.8)

# Add vertical line at the strike price
plt.axvline(strike_price, color='r', linestyle='--', label='Strike Price')

# Add vertical line at the breakeven point (Strike Price + Premium)
plt.axvline(strike_price + premium, color='g', linestyle='--', label='Breakeven Point')

# Labels and title
plt.title('Profit Graph of a Long Call Option')
plt.xlabel('Stock Price at Expiration')
plt.ylabel('Profit / Loss')
plt.legend()  # Display the legend with labels
plt.grid(True) # Add a grid for better readability

# Set limits for x and y axes for better visualization (optional)
# plt.xlim(30, 80)
# plt.ylim(-premium - 5, max(profit) + 5)

# Show plot
plt.show()