/* eslint-disable */

const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../../app");

const { User } = require("../../models/user-model");

require("dotenv").config();
const { DB_DRIVER, SECRET_KEY } = process.env;

const { sq } =
  DB_DRIVER === "MYSQL" ? require("../../config/mysql/db") : require("../../config/postgresql/db");

/**
 * Login
 * 1. Response must have status code 200.
 * 2. The response should return a token and  user object with 7 fields.
 * 3. Must be stored token in user data
 */

describe("test login route", () => {
  let server = null;
  beforeAll(async () => {
    await sq.authenticate();
    server = app.listen(3000);
  });

  afterAll(async () => {
    await sq.close();
    server.close();
  });

  beforeEach(() => {});

  // afterEach(async () => {
  //   await User.deleteMany({});
  // });

  test("test correct login data", async () => {
    const loginData = {
      login: "admin",
      password: "12345678",
    };
    const { body, statusCode } = await request(app).post("/api/users/login").send(loginData);

    expect(statusCode).toBe(200);
    const { id } = jwt.verify(body.token, SECRET_KEY);
    expect(body.user.id).toBe(id);
    // expect(body.user.subscription).toBe("starter");

    // const user = await User.findOne({ email: registerData.email });
    //expect(user.email).toBe(registerData.email);
  });
});

// /**
//  * Register
//  * 1. Response must have status code 201.
//  * 2. The response should return a user object with 2 fields email and subscription, having the data type String.
//  * 3. Must be created user in data base
//  */

// describe("test register route", () => {
//   let server = null;
//   beforeAll(async () => {
//     await mongoose.connect(DB_HOST_TEST);
//     server = app.listen(3000);
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//     server.close();
//   });

//   beforeEach(() => {});

//   afterEach(async () => {
//     await User.deleteMany({});
//   });

//   test("test correct register data", async () => {
//     const registerData = {
//       email: "example@example.com",
//       password: "examplepassword",
//     };
//     const { body, statusCode } = await request(app).post("/users/register").send(registerData);

//     expect(statusCode).toBe(201);
//     expect(body.user.email).toBe(registerData.email);
//     expect(body.user.subscription).toBe("starter");

//     const user = await User.findOne({ email: registerData.email });
//     expect(user.email).toBe(registerData.email);
//   });
// });
