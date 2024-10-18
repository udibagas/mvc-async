const User = require("../models/user");
const View = require("../views");

class Controller {
  static async list() {
    //! sync
    // const users = User.getAllUsers();
    // View.showAllUsers(users);
    //! callback
    // User.getAllUsersCallback((err, users) => {
    //   if (err) {
    //     View.showError(err);
    //   } else {
    //     View.showAllUsers(users);
    //   }
    // });
    //! Promise
    // User.getAllUsersPromise()
    //   .then((users) => {
    //     View.showAllUsers(users);
    //   })
    //   .catch((err) => {
    //     View.showError(err);
    //   });
    // try {
    //   const users = await User.getAllUsersPromise();
    //   View.showAllUsers(users);
    // } catch (error) {
    //   View.showError(error);
    // }

    // User.getAllUsersAsync()
    //   .then((users) => {
    //     View.showAllUsers(users);
    //   })
    //   .catch((err) => {
    //     View.showError(err);
    //   });

    try {
      const users = await User.getAllUsersAsync();
      View.showAllUsers(users);
    } catch (error) {
      View.showError(error);
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

      View.successRegister(newUser);
    } catch (error) {
      View.showError(error);
    }
  }
}

module.exports = Controller;
