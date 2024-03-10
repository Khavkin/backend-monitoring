const app = require('../../app');
const mongoose = require('mongoose');
const { describe, expect, test } = require('@jest/globals');
const bcrypt = require('bcrypt');

const request = require('supertest');
require('dotenv').config();

const User = require('../../service/schemas/users');

const { DB_TEST } = process.env;

describe('test login route', () => {
  let server = null;
  const testUser = { email: 'test-user@test.com', password: 'Te5tP455vv0rd!' };
  beforeAll(async () => {
    await mongoose.connect(DB_TEST);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('login with wrong email ', async () => {
    const { body, statusCode } = await request(app).post('/users/login').send(testUser);

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Email or password is wrong');
  });

  test('login with correct data', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'asetwrwewrqwer',
    });
    const { body, statusCode } = await request(app).post('/users/login').send(testUser);

    const user = await User.findOne({ email: testUser.email });

    expect(statusCode).toBe(200);
    expect(body.token).toBe(user.token);
    expect(body.user.email).toBe(user.email);
    expect(body.user.subscription).toBe(user.subscription);
  });

  test('login without password', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'werwerwerwerwer',
    });
    const { body, statusCode } = await request(app)
      .post('/users/login')
      .send({ email: testUser.email });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Password is required');
  });

  test('login without email', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'werwerwerwer',
    });
    const { body, statusCode } = await request(app)
      .post('/users/login')
      .send({ password: testUser.password });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Email is required');
  });

  test('login with incorrect password pattern', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'werwewewerwer',
    });
    const { body, statusCode } = await request(app)
      .post('/users/login')
      .send({ ...testUser, password: 'qwquou' });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Password must be 8-16 symbols and contains a-z,A-Z,0-9,!@#-*()');
  });

  test('login with incorrect password', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'werwewerwerw',
    });
    const { body, statusCode } = await request(app)
      .post('/users/login')
      .send({ ...testUser, password: 'aQ12237+' });

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Email or password is wrong');
  });

  test('login with incorrect email format', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'wewerwerwer',
    });
    const { body, statusCode } = await request(app)
      .post('/users/login')
      .send({ ...testUser, email: 'aaa@ddd' });

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Invalid email');
  });

  test('login with empty body', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: true,
      verificationToken: 'werwerwerwe',
    });
    const { body, statusCode } = await request(app).post('/users/login').send({});

    expect(statusCode).toBe(400);
    expect(body.message).toBe('Email is required');
  });

  test('login with correct data wiothout verification', async () => {
    const hash = await bcrypt.hash(testUser.password, 10);
    await User.create({
      ...testUser,
      password: hash,
      verify: false,
      verificationToken: 'wetwertewrtwew',
    });
    const { body, statusCode } = await request(app).post('/users/login').send(testUser);

    const user = await User.findOne({ email: testUser.email });

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Email not verified');
  });
});
