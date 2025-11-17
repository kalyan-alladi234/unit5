const boxen = require("boxen");

const title = "Hurray!!!";
const message = "I am using my first external module!";

// Classic Box
console.log(
  boxen(message, {
    title: title,
    padding: 1,
    borderStyle: "classic",
  })
);

// SingleDouble Box
console.log(
  boxen(message, {
    title: title,
    padding: 1,
    borderStyle: "singleDouble",
  })
);

// Round Box
console.log(
  boxen(message, {
    title: title,
    padding: 1,
    borderStyle: "round",
  })
);
