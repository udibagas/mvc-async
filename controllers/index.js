const User = require("../models/user");
const View = require("../views");

class Controller {
  static showHelp() {
    View.showHelp();
  }

  static async showUsers() {
    //! sync
    // const users = User.readAllUsers();
    // View.showUsers(users);
    //! callback
    // User.readAllUsersCallback((err, users) => {
    //   if (err) {
    //     View.showError(err);
    //   } else {
    //     View.showUsers(users);
    //   }
    // });
    // ! promise
    // User.readAllUsersAsyncAwait()
    //   .then((users) => {
    //     View.showUsers(users);
    //   })
    //   .catch((err) => {
    //     View.showError(err);
    //   });
    try {
      const users = await User.readAllUsersPromise();
      View.showUsers(users);
    } catch (err) {
      View.showError(err);
    }
  }

  static async register(email, password, firstName, lastName, gender, age) {
    try {
      const newUser = await User.register(
        email,
        password,
        firstName,
        lastName,
        gender,
        age
      );

      View.registerSuccess(newUser);
    } catch (error) {
      View.showError(error);
    }
  }
}

module.exports = Controller;
