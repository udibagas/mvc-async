class User {
  #age;

  constructor(id, firstName, lastName, email, gender, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.gender = gender;
    this.#age = age;
  }

  get age() {
    return this.#age;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJSON() {
    return {
      ID: this.id,
      "Full Name": this.fullName,
      Email: this.email,
      Gender: this.gender,
    };
  }
}

module.exports = User;
