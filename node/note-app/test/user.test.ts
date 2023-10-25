import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'
import { setupDatabase } from './fixtures/db'
import User from '../src/models/user'
import { response } from 'express'

beforeEach(setupDatabase)
afterAll(closeConnection)

test('Should create a new user', async () => {
  const res = await request(app)
    .post('/users')
    .send({
      username: 'edi',
      email: 'jah@jah.com',
      age: 44,
      password: 'jahjah',
    })
    .expect(201)

  const user = await User.findById(res.body.user._id)

  expect(user).toBeDefined()
  expect(res.body).toMatchObject({
    user: {
      username: 'edi',
      email: 'jah@jah.com',
      age: 44,
      password: 'jahjah',
    },
    token: user?.tokens[0].token,
  })
})
