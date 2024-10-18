class View {
  static showAllUsers(users) {
    console.table(
      users.map((el) => {
        return {
          Email: el.email,
          Fullname: el.fullName,
          Gender: el.profile.gender,
          Age: el.profile.age,
        };
      })
    );
  }

  static showError(error) {
    console.log(error.message);
  }

  static successRegister(newUser) {
    console.log(`User ${newUser.fullName} has been registered!`);
  }
}

module.exports = View;
