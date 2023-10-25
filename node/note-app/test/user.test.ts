import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'

afterAll(closeConnection)

test('Should create a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      username: 'edi',
      email: 'jah@jah.com',
      age: 44,
      password: 'jahjah',
    })
    .expect(201)
})
