class View {
  static help() {
    console.log(`
    Command:

    $ node app.js list
    $ node app.js register email password fName lName gender age
    `);
  }

  static showUsers(users) {
    console.log(users);
    users = users.map((el) => {
      return {
        ID: el.id,
        Email: el.email,
        Name: el.fullName,
      };
    });

    console.table(users);
  }

  static showError(error) {
    console.log(error.message);
  }

  static registerSuccess(newUser) {
    console.log(`User ${newUser.fullName} is created!`);
  }
}

module.exports = View;
