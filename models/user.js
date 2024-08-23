const fs = require("fs");
const Profile = require("./profile");

// ! semua data yang keluar dari model harus beruap instance
class User {
  #password;
  constructor(id, email, password, profile) {
    this.id = id;
    this.email = email;
    this.#password = password;
    const { firstName, lastName, gender, age } = profile;
    this.profile = new Profile(firstName, lastName, gender, age);
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
    return this.profile.fullName;
  }

  static getAll() {
    const data = fs.readFileSync("./data/users.json", "utf-8"); // ambil data
    const parsedData = JSON.parse(data); // mengolah
    return Userfactory.createUsers(parsedData); // data mateng
  }

  static getAllCallback(cb) {
    fs.readFile("./data/users.json", "utf-8", (err, data) => {
      if (err) {
        return cb(err, null);
      }

      const parsedData = JSON.parse(data); // mengolah
      const users = Userfactory.createUsers(parsedData); // data mateng
      cb(null, users);
    });
  }

  static getAllPromise() {
    return fs.promises.readFile("./data/users.json", "utf-8").then((data) => {
      const parsedData = JSON.parse(data);
      const users = Userfactory.createUsers(parsedData);
      return users;
    });
  }

  static async getAllAwait() {
    try {
      const data = await fs.promises.readFile("./data/users.json", "utf-8");
      const parsedData = JSON.parse(data);
      return Userfactory.createUsers(parsedData);
    } catch (error) {
      throw new Error("Failed to read database");
    }
  }

  static async register({ email, password, firstName, lastName, gender, age }) {
    const users = await this.getAllAwait();
    const id = users.length ? users.at(-1).id + 1 : 1;

    const newUser = Userfactory.createUser({
      id,
      email,
      password,
      profile: {
        firstName,
        lastName,
        gender,
        age,
      },
    });

    users.push(newUser);
    const data = JSON.stringify(users, null, 2);
    await fs.promises.writeFile("./data/users.json", data);
    return newUser;
  }

  static async changePassword(email, newPassword) {
    const users = await this.getAllAwait();
    const user = users.find((el) => el.email == email);
    if (!user) throw new Error("User not found");
    user.password = newPassword;
    const data = JSON.stringify(users, null, 2);
    await fs.promises.writeFile("./data/users.json", data);
    return user;
  }
}

class Userfactory {
  static createUser(user) {
    const { id, email, password, profile } = user;
    return new User(id, email, password, profile);
  }

  static createUsers(data) {
    return data.map((el) => this.createUser(el));
  }
}

module.exports = User;
