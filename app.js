const Controller = require("./controllers");

const [cmd, ...args] = process.argv.slice(2);

switch (cmd) {
  case "list":
    Controller.list();
    break;

  case "register":
    const [firstName, lastName, email, gender, age] = args;
    Controller.register(firstName, lastName, email, gender, Number(age));
    break;

  default:
    break;
}
