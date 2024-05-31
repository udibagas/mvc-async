const Controller = require("./controllers");

const command = process.argv[2];

if (command === "list") {
  Controller.showUsers();
} else if (command === "register") {
  const [email, password, firstName, lastName, gender, age] =
    process.argv.slice(3);
  Controller.register(email, password, firstName, lastName, gender, +age);
} else {
  Controller.showHelp();
}
