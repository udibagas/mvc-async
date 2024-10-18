const Controller = require("./controllers");

const command = process.argv[2];

switch (command) {
  case "list":
    Controller.list();
    break;

  case "register":
    const [email, password, firstName, lastName, gender, age] =
      process.argv.slice(3);
    Controller.register(email, password, firstName, lastName, gender, age);
    break;

  default:
    break;
}
