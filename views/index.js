class View {
  static showHelp() {
    console.log(`
      Available command:
      > node app.js help
      > node app.js list
      > node app.js register email password firstName lastName gender age
    `);
  }

  static showUsers(users) {
    console.log(users);
    users = users.map((user) => {
      return {
        ID: user.id,
        Fullaname: user.fullName,
        Email: user.email,
        Gender: user.profile.gender,
        Age: user.profile.age,
      };
    });

    console.table(users);
  }

  static showError(err) {
    console.log(err.message);
  }

  static registerSuccess(newUser) {
    console.log(`User ${newUser.fullName} has been created!`);
  }
}

module.exports = View;
