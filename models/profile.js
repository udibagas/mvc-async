class Profile {
  constructor(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

module.exports = Profile;
