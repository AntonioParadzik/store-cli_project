"use strict";

const readline = require("readline");
const process = require("process");

let walletBalance = 40;
let cart = [];

const products = [
  {
    name: "Apple",
    price: 1.99,
  },
  {
    name: "Banana",
    price: 10,
  },
  {
    name: "Orange",
    price: 0.75,
  },
  {
    name: "Grapes",
    price: 3.5,
  },
  {
    name: "Lemon",
    price: 2.99,
  },
  {
    name: "Peach",
    price: 5.99,
  },
  {
    name: "Pear",
    price: 2.49,
  },
  {
    name: "Cherry",
    price: 1.79,
  },
];

function displayProducts() {
  console.log("Available products:\n");
  console.log("Product\t\tPrice\n");

  products.forEach((product) => {
    console.log(`${product.name}\t\t${product.price}€`);
  });
}

function displayUserBalance() {
  console.log(`User balance: ${walletBalance.toFixed(2)}€.`);
}

function addToCart(quantity, productName) {
  const productIndex = products.findIndex(
    (product) => product.name.toLowerCase() === productName.toLowerCase()
  );
  if (productIndex !== -1) {
    const product = products[productIndex];
    const totalPrice = product.price * quantity;
    if (totalPrice > walletBalance) {
      console.log(
        `Insufficient balance to buy ${quantity} ${product.name}(s).`
      );
    } else {
      let i = 0;
      while (i < quantity) {
        cart.push(product);
        i++;
      }
      console.log(`${quantity} ${product.name}(s) added to the cart.`);
    }
  } else {
    console.log("Product is not found.");
  }
}

function removeFromCart(quantity, productName) {
  const lowercaseName = productName.toLowerCase();
  let removedCount = 0;

  for (let i = cart.length - 1; i >= 0 && removedCount < quantity; i--) {
    const item = cart[i];
    if (item.name.toLowerCase() === lowercaseName) {
      cart.splice(i, 1);
      removedCount++;
    }
  }

  console.log(`${removedCount} ${productName}(s) removed from the cart.`);
}

function displayCart() {
  if (cart.length === 0) {
    console.log("There's nothing placed in the cart.");
    return;
  }

  const cartItemCounts = new Map();
  for (const item of cart) {
    const count = cartItemCounts.get(item.name) || 0; // default is 0 to avoid undefined
    cartItemCounts.set(item.name, count + 1);
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  console.log("Your cart contains:\n");
  console.log("Product\t\tPrice\t\tQuantity\n");
  for (const [itemName, quantity] of cartItemCounts) {
    const item = products.find((product) => product.name === itemName);
    console.log(`${itemName}\t\t${item.price}€\t\t${quantity}`);
  }
  console.log("------------------------------------");
  console.log(`Total:\t\t${totalPrice}€`);
  console.log("------------------------------------");
}

function buyProducts() {
  if (cart.length == 0) {
    console.log("There's nothing placed in the cart.");
    return;
  }
  const totalPrice = cart.reduce((acc, { price }) => acc + price, 0);
  if (totalPrice <= walletBalance) {
    walletBalance -= totalPrice;
    cart.length = 0;
    console.log(
      `Products bought for ${totalPrice.toFixed(
        2
      )}€.\nRemaining balance: ${walletBalance.toFixed(2)}€.`
    );
  } else {
    console.log(
      "You don't have enough balance to buy all products in the cart."
    );
  }
}

function searchForItems(searchTerm) {
  const matchingProducts = products.filter(({ name }) =>
    name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (matchingProducts.length === 0) {
    console.log("No products found.");
  } else {
    console.log("Search results:");
    console.log(
      matchingProducts
        .map(({ name, price }) => `- ${name}: ${price}€`)
        .join("\n")
    );
  }
}

function help() {
  console.log("list: Display products");
  console.log("------------------------------------");
  console.log("balance: Display user balance");
  console.log("------------------------------------");
  console.log("search <searchTerm>: Search available products");
  console.log("------------------------------------");
  console.log(
    "add <quantity> <product_name>: Add certain quantity of a product"
  );
  console.log("------------------------------------");
  console.log(
    "remove <quantity> <product_name>: Remove certain quantity of a product"
  );
  console.log("------------------------------------");
  console.log("cart: Display cart");
  console.log("------------------------------------");
  console.log("buy: Buy products");
  console.log("------------------------------------");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the Store");

rl.prompt();
console.log("Call 'help' for available actions");

rl.on("line", (line) => {
  const split = line.split(" ");
  const command = split[0];
  const args = split.slice(1);

  switch (command) {
    case "help":
      help();
      break;
    case "list":
      displayProducts();
      break;
    case "balance":
      displayUserBalance();
      break;
    case "search":
      if (args.length !== 1) {
        console.log("Invalid arguments. Accepted input: search <searchTerm>");
      } else {
        searchForItems(args[0]);
      }
      break;
    case "add":
      if (args.length !== 2 || isNaN(args[0])) {
        console.log(
          "Invalid arguments. Accepted input: add <quantity> <product_name>"
        );
      } else {
        addToCart(parseInt(args[0]), args[1]);
      }
      break;
    case "remove":
      if (args.length !== 2 || isNaN(args[0])) {
        console.log(
          "Invalid arguments. Accepted input: remove <quantity> <product_name>"
        );
      } else {
        removeFromCart(parseInt(args[0]), args[1]);
      }
      break;
    case "cart":
      displayCart();
      break;
    case "buy":
      buyProducts();
      break;
    default:
      console.log(
        `Unknown command: ${command}. Call 'help' for available actions.`
      );
  }

  rl.prompt();
}).on("close", () => {
  console.log("Exiting the Store");
  process.exit(0);
});
