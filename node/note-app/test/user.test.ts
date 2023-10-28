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

  test('Should login user by setting cookie', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(302)
    expect(res.header['set-cookie']).toBeDefined()

    const user = await User.findById(userOneId)

    expect(res.header['set-cookie'][0].split('; ')[0].split('=')[1]).toEqual(
      user?.tokens[0].token
    )
  })

  test('Should not login user with wrong credentials', async () => {
    const res = await request(app)
      .post('/notes/login')
      .send({
        email: userOne.email,
        password: '111111',
      })
      .expect(404)
    expect(res.header['set-cookie']).toBeUndefined()

    await request(app)
      .post('/notes/login')
      .send({
        email: 'nono@no.no',
        password: 'jahjah',
      })
      .expect(404)
  })
})
