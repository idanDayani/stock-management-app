# stock-management-app

Schemas
1. Portfolio Schema
The Portfolio schema is designed to manage user portfolios. Each portfolio is associated with a unique userId and includes a collection of stock objects.
Fields:
userId: A unique identifier for the user.
stocks: An array of stock objects.
2. Stock Schema
The Stock schema defines the structure for individual stock data. This includes essential details about each stock that is part of a user’s portfolio.
Fields:
symbol: The stock's unique trading symbol.
name: The name of the company or stock.
currency: The currency in which the stock is traded.
exchange: The exchange where the stock is listed.
latestQuote: The latest stock quote.
