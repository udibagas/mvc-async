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

class MaleUser extends User {
  constructor(id, firstName, lastName, email, age) {
    super(id, firstName, lastName, email, "Male", age);
  }
}

class FemaleUser extends User {
  constructor(id, firstName, lastName, email, age) {
    super(id, firstName, lastName, email, "Female", age);
  }
}

class UserFactory {
  static create({ id, firstName, lastName, email, gender, age }) {
    if (gender == "Male") {
      return new MaleUser(id, firstName, lastName, email, age);
    }

    if (gender == "Female") {
      return new FemaleUser(id, firstName, lastName, email, age);
    }
  }

  static createBulk(arrData) {
    return arrData.map((el) => this.create(el));
  }
}

module.exports = UserFactory;
