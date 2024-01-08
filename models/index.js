const fs = require("fs"); // built in package di node js
const User = require("./user");
const UserFactory = require("./user");

// Ngurusin data
// Logic CRUD = Create Read Update Delete
// ! Semua data yang keluar dari model harus berupa instance!!!
class Model {
  static getAllUsers() {
    const data = fs.readFileSync("./data/users.json", "utf-8");
    const arrData = JSON.parse(data);
    return UserFactory.createBulk(arrData);
  }

  static getAllUsersCallback(cb) {
    fs.readFile("./data/users.json", "utf-8", (err, data) => {
      if (err) {
        cb(err, undefined);
      } else {
        const arrData = JSON.parse(data);
        const users = UserFactory.createBulk(arrData);
        cb(null, users);
      }
    });
  }

  static getAllUsersPromise() {
    return fs.promises
      .readFile("./data/users.json", "utf-8")
      .then((data) => {
        const arrData = JSON.parse(data);
        const users = UserFactory.createBulk(arrData);
        return users;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async getAllUsersAsyncAwait() {
    const data = await fs.promises.readFile("./data/users.json", "utf-8"); // string
    const arrData = JSON.parse(data); // array of object literal
    return UserFactory.createBulk(arrData);
  }

  static async register(firstName, lastName, email, gender, age) {
    const users = await this.getAllUsersAsyncAwait();
    const lastData = users.at(-1);
    const id = lastData.id + 1;
    const newUser = UserFactory.create({
      id,
      firstName,
      lastName,
      email,
      gender,
      age,
    });

    users.push(newUser); // array of object instance
    const arrData = users.map((el) => {
      return {
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        gender: el.gender,
        age: el.age, // getter
      };
    });
    const dataToBeWritten = JSON.stringify(arrData, null, 2); // string
    fs.promises.writeFile("./data/users.json", dataToBeWritten);

    return newUser;
  }

  static registerCb(firstName, lastName, email, gender, age, cb) {
    this.getAllUsersCallback((err, users) => {
      if (err) {
        cb(err);
      } else {
        const lastData = users.at(-1);
        const id = lastData.id + 1;
        const newUser = UserFactory.create({
          id,
          firstName,
          lastName,
          email,
          gender,
          age,
        });

        users.push(newUser); // array of object instance
        const arrData = users.map((el) => {
          return {
            id: el.id,
            firstName: el.firstName,
            lastName: el.lastName,
            email: el.email,
            gender: el.gender,
            age: el.age, // getter
          };
        });

        const dataToBeWritten = JSON.stringify(arrData, null, 2); // string

        fs.writeFile("./data/users.json", dataToBeWritten, (err) => {
          if (err) {
            cb(err);
          } else {
            cb(null, newUser);
          }
        });
      }
    });
  }
}

module.exports = Model;
