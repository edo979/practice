import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'
import {
  createTestUsers,
  setupDatabase,
  userOne,
  userOneId,
} from './fixtures/db'
import User from '../src/models/user'

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
    },
    token: user?.tokens[0].token,
  })
})

describe('Tests for login user to the app', () => {
  beforeEach(createTestUsers)

  test('Should login user to the app', async () => {
    const res = await request(app)
      .post('/notes/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200)

    const user = await User.findById(userOneId)

    expect(res.body.token).toBe(user?.tokens[1].token)
  })

  test('Should not login user with wrong credentials', async () => {
    await request(app)
      .post('/notes/login')
      .send({
        email: userOne.email,
        password: '111111',
      })
      .expect(404)
  })
})
