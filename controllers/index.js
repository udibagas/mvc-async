const User = require("../models/user");
const View = require("../views");

class Controller {
  static help() {
    View.help();
  }

  static async list() {
    // SYNC
    // const users = User.getAll();
    // View.showUsers(users);
    // CALLBACK
    // User.getAllCallback((err, users) => {
    //   if (err) {
    //     View.showError(err);
    //   } else {
    //     View.showUsers(users);
    //   }
    // });
    // PROMISE
    // User.getAllPromise()
    //   .then((users) => {
    //     View.showUsers(users);
    //   })
    //   .catch((err) => {
    //     View.showError(err);
    //   });

    try {
      const users = await User.getAllAwait();
      View.showUsers(users);
    } catch (error) {
      View.showError(error);
    }
  }

  static async register(email, password, firstName, lastName, gender, age) {
    try {
      const newUser = await User.register({
        email,
        password,
        firstName,
        lastName,
        gender,
        age,
      });

      View.registerSuccess(newUser);
    } catch (error) {
      View.showError(error);
    }
  }

  static async changePassword(email, newPassword) {
    try {
      const user = await User.changePassword(email, newPassword);
      console.log(user);
    } catch (error) {
      View.showError(error);
    }
  }
}

module.exports = Controller;
