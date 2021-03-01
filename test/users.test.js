const request = require('supertest');
const { setupMongo } = require('./test.setup');
const { app } = require('../src/server');

setupMongo('users-testing');

test('Add a user should work', async () => {
  const res = await request(app).post('/api/users').send({
    id: 1,
    firstName: 'Cass',
    lastName: 'lugh',
    email: 'hola@gmail.com',
    avatar: 'google.com',
    password: 'heyey',
    username: 'cassie',
  });

  const getAllRes = await request(app).get('/api/users');

  expect(res.status).toBe(201);
  expect(getAllRes.status).toBe(200);
  expect(getAllRes.body.length).toEqual(1);
});

test('Add a user should not work as email is invalid', async () => {
  const res = await request(app).post('/api/users').send({
    id: 1,
    firstName: 'Cass',
    lastName: 'lugh',
    email: 'hola@gmailcom',
    avatar: 'google.com',
    password: 'heyey',
    username: 'cassie',
  });

  expect(res.status).toBe(400);
  expect(res.body.errors[0].msg).toEqual('Invalid value');
  expect(res.body.errors[0].param).toEqual('email');
});

test('Add a user should not work as password is invalid', async () => {
  const res = await request(app).post('/api/users').send({
    id: 1,
    firstName: 'Cass',
    lastName: 'lugh',
    email: 'hola@gmail.com',
    avatar: 'google.com',
    password: '123',
    username: 'cassie',
  });

  expect(res.status).toBe(400);
  expect(res.body.errors[0].msg).toEqual('Invalid value');
  expect(res.body.errors[0].param).toEqual('password');
});

test('check token and userlogin', async () => {
  const creationRes = await request(app).post('/api/users').send({
    id: 1,
    firstName: 'Cass',
    lastName: 'Loughrey',
    email: 'cloughrey0@mozilla.org',
    avatar:
      'https://robohash.org/consecteturnobisdolores.bmp?size=50x50&set=set1',
    password: 'cloughrey0123',
    username: 'johnDoe',
  });

  const loginRes = await request(app).post('/login').send({
    email: 'cloughrey0@mozilla.org',
    password: 'cloughrey0123',
  });

  expect(creationRes.status).toBe(201);
  expect(loginRes.status).toBe(200);
  expect(loginRes.body).not.toBeUndefined();
});
