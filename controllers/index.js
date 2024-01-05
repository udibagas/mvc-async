const Model = require("../models");
const View = require("../views");

class Controller {
  static async list() {
    // ! Sync
    // const users = Model.getAllUsers();
    // ! Callback
    // Model.getAllUsersCallback((err, users) => {
    //   if (err) {
    //     View.showError(err);
    //   } else {
    //     View.showAllUsers(users);
    //   }
    // });
    // ! Promise
    // Model.getAllUsersPromise()
    //   .then((users) => {
    //     View.showAllUsers(users);
    //   })
    //   .catch((err) => {
    //     View.showError(err);
    //   });
    // Model.getAllUsersAsyncAwait()
    //   .then((users) => {
    //     View.showAllUsers(users);
    //   })
    //   .catch((err) => {
    //     View.showError(err);
    //   });

    try {
      const users = await Model.getAllUsersAsyncAwait();
      View.showAllUsers(users);
    } catch (err) {
      View.showError(err);
    }
  }

  static async register(firstName, lastName, email, gender, age) {
    const newUser = await Model.register(
      firstName,
      lastName,
      email,
      gender,
      age
    );

    View.registerSuccess(newUser);
  }
}

module.exports = Controller;
