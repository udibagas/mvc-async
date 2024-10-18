const fs = require("fs");

class Profile {
  constructor(firstName, lastName, gender, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = +age;
  }
}

class User {
  #password;

  constructor(id, email, password, profile) {
    this.id = id;
    this.email = email;
    this.#password = password;
    // composition
    this.profile = new Profile(
      profile.firstName,
      profile.lastName,
      profile.gender,
      profile.age
    );
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      password: this.#password,
      profile: this.profile,
    };
  }

  get fullName() {
    return `${this.profile.firstName} ${this.profile.lastName}`;
  }

  //! semua data yang keluar dari model harus berupa instance
  static getAllUsers() {
    const data = fs.readFileSync("./data/users.json");
    const parsedData = JSON.parse(data);

    const users = parsedData.map((el) => {
      const { id, email, password, profile } = el;
      return new User(id, email, password, profile);
    });

    return users;
  }

  static getAllUsersCallback(cb) {
    fs.readFile("./data/users.json", (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        const parsedData = JSON.parse(data);

        const users = parsedData.map((el) => {
          const { id, email, password, profile } = el;
          return new User(id, email, password, profile);
        });

        cb(null, users);
      }
    });
  }

  static getAllUsersPromise() {
    return fs.promises.readFile("./data/users.json").then((data) => {
      const parsedData = JSON.parse(data);

      const users = parsedData.map((el) => {
        const { id, email, password, profile } = el;
        return new User(id, email, password, profile);
      });

      return users;
    });
  }

  static async getAllUsersAsync() {
    const data = await fs.promises.readFile("./data/users.json");
    const parsedData = JSON.parse(data);

    const users = parsedData.map((el) => {
      const { id, email, password, profile } = el;
      return new User(id, email, password, profile);
    });

    console.log(users);

    return users;
  }

  static async register(email, password, firstName, lastName, gender, age) {
    const users = await this.getAllUsersAsync();
    let id = 1;

    if (users.length > 0) {
      id = users.at(-1).id + 1;
    }
    const profile = {
      firstName,
      lastName,
      gender,
      age,
    };

    const newUser = new User(id, email, password, profile);
    users.push(newUser);

    const data = JSON.stringify(users, null, 2);
    await fs.promises.writeFile("./data/users.json", data);

    return newUser;
  }
}

module.exports = User;
