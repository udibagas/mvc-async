const Controller = require("./controllers");

const [cmd, ...params] = process.argv.slice(2);

switch (cmd) {
  case "list":
    Controller.list();
    break;

  case "register":
    // TODO: create new user
    const [email, password, firstName, lastName, gender, age] = params;
    Controller.register(email, password, firstName, lastName, gender, +age);
    break;

  case "changePassword": {
    const [email, newPassword] = params;
    Controller.changePassword(email, newPassword);
    break;
  }

  default:
    Controller.help();
    break;
}
