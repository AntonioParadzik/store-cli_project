# LV 2 zadatak - JavaScript komandne aplikacije

## Overview

This is a command-line store application implemented in Node.js. It allows users to view available products, search for the products, manage their shopping cart, check their wallet balance, and purchase products.

## General Design

The application is designed to provide a simple and intuitive interface for users to interact with the store. Here are some key design considerations:

* Modularity: The code is organized into functions with specific responsibilities, making it easy to maintain and extend.
* User Feedback: The application provides informative feedback to users for their actions.
* Error Handling: Input validation and error handling are implemented to prevent unexpected behavior and guide users in correct usage.

## Running JavaScript Command Line Application

Node.js installation is required: https://nodejs.dev/en/

After installation, JavaScript files can be executed from the terminal:

```shell
node main.js
```
Use 'help' to get available commands and follow the prompts to interact with application

## Documentation of Commands

* help: Displays a list of available commands along with their descriptions.
* list: Displays all available products along with their prices.
* balance: Displays the user's wallet balance.
* search <searchTerm>: Searches available products (case insensitive) by giving the first letter(s) as the search term. If no items are found or input is invalid, it returns an error message.
* add <quantity> <product_name>: Adds a certain quantity of a product (case insensitive) to the cart. Requires two arguments: the quantity to add and the name of the product. If no items are found or input is invalid, it returns an error message.
* remove <quantity> <product_name>: Removes a certain quantity of a product (case insensitive) from the cart. Requires two arguments: the quantity to remove and the name of the product. If no items are found or input is invalid, it returns an error message.
* cart: Displays the contents of the cart. If the cart is empty, it returns appropriate message.
* buy: Purchases the products currently in the cart, deducting the total cost from the user's wallet balance. If the cart is empty, it returns appropriate message.

