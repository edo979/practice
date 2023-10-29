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

const getJWTfromCookie = (res: request.Response) =>
  res.header['set-cookie'][0].split('; ')[0].split('=')[1]

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
    .expect(302)
  expect(res.header['set-cookie']).toBeDefined()

  const user = await User.findOne({ username: 'edi', email: 'jah@jah.com' })
  const jwt = getJWTfromCookie(res)

  expect(user).toBeDefined()
  expect(jwt).toEqual(user?.tokens[0].token)
  expect(user).toMatchObject({
    username: 'edi',
    email: 'jah@jah.com',
    age: 44,
    tokens: [{ token: jwt }],
  })
  expect(user?.password).not.toBe('jahjah')
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

    expect(getJWTfromCookie(res)).toEqual(user?.tokens[1].token)
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

describe('Tests for logout user', () => {
  beforeEach(createTestUsers)

  test('Should logout user', async () => {
    const res = await request(app)
      .post('/users/logout')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)
    expect(res.header['set-cookie']).toBeDefined()

    //res.header['set-cookie'][0].split('; ')[0]
    expect(getJWTfromCookie(res)).toEqual('')
  })

  test('Should logut user from all devices', async () => {
    const res = await request(app)
      .post('/users/logoutAll')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)
    expect(res.header['set-cookie']).toBeDefined()

    const user = await User.findById(userOneId)

    expect(getJWTfromCookie(res)).toEqual('')
    expect(user?.tokens).toHaveLength(0)
  })
})
