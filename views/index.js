class View {
  static showAllUsers(users) {
    console.table(
      users.map((el) => {
        return el.toJSON();
      })
    );
  }

  static showError(err) {
    console.log(err.message);
  }

  static registerSuccess(newUser) {
    console.log(`Pendaftaran user dengan nama ${newUser.fullName} sukses`);
  }
}

module.exports = View;
