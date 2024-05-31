const fs = require("fs");
const Profile = require("./profile");

class User {
  #password;

  constructor(id, email, password, profile) {
    this.id = id;
    this.email = email;
    this.#password = password;
    const { firstName, lastName, gender, age } = profile;
    this.profile = new Profile(firstName, lastName, gender, age);
  }

  get fullName() {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  }

  get password() {
    return "*****";
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.#password,
      profile: this.profile,
    };
  }

  //! semua data yang keluar dari model harus berupa instance
  static readAllUsers() {
    const data = fs.readFileSync("./data/users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const users = UserFactory.createBulk(parsedData);
    return users;
  }

  static readAllUsersCallback(cb) {
    fs.readFile("./data/users.json", "utf-8", (err, data) => {
      if (err) {
        cb(err);
      } else {
        const parsedData = JSON.parse(data);
        const users = UserFactory.createBulk(parsedData);
        cb(null, users);
      }
    });
  }

  static readAllUsersPromise() {
    return fs.promises.readFile("./data/users.json", "utf-8").then((data) => {
      const parsedData = JSON.parse(data);
      const users = UserFactory.createBulk(parsedData);
      return users;
    });
  }

  static async readAllUsersAsyncAwait() {
    const data = await fs.promises.readFile("./data/users.json", "utf-8");
    const parsedData = JSON.parse(data);
    const users = UserFactory.createBulk(parsedData);
    return users;
  }

  static async register(email, password, firstName, lastName, gender, age) {
    if (age < 18) {
      throw new Error("Belum cukup umur");
    }

    const users = await this.readAllUsersAsyncAwait();
    const lastData = users.at(-1);
    const id = lastData.id + 1;

    const newUser = UserFactory.create({
      id,
      email,
      password,
      lastName,
      firstName,
      age,
      gender,
    });

    users.push(newUser);
    const data = JSON.stringify(users, null, 2);
    await fs.promises.writeFile("./data/users.json", data);
    return newUser;
  }
}

class UserFactory {
  static createBulk(data) {
    return data.map((el) => {
      return new User(el.id, el.email, el.password, el.profile);
    });
  }

  static create(data) {
    const { id, email, password, firstName, lastName, gender, age } = data;
    return new User(id, email, password, {
      firstName,
      lastName,
      gender,
      age,
    });
  }
}

module.exports = User;
