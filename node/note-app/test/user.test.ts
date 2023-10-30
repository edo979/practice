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
      .expect('set-cookie', /note_app_session/)

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
      .get('/users/logout')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(302)
    expect(res.header['set-cookie']).toBeDefined()

    const user = await User.findById(userOneId)

    expect(getJWTfromCookie(res)).toEqual('')
    expect(user?.tokens).toHaveLength(0)
  })

  test('Should delete token when user logout', async () => {
    await request(app)
      .get('/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(301)

    const firstToken = userOne.tokens[0].token

    const res = await request(app)
      .get('/users/logout')
      .set('Authorization', `Bearer ${firstToken}`)
      .expect(302)
    expect(res.header['set-cookie']).toBeDefined()

    const user = await User.findById(userOneId)

    expect(getJWTfromCookie(res)).toEqual('')
    expect(user?.tokens[0]).toBeFalsy()
  })

  test('Should not delete other user token when one user logout', async () => {
    await request(app)
      .get('/users/logout')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(302)

    const users = await User.find()

    // Token is created when user signup
    expect(users[0].tokens).toHaveLength(0)
    expect(users[1].tokens).toHaveLength(1)
  })

  test('Should logout user from all devices', async () => {
    const res = await request(app)
      .get('/users/logoutAll')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)
    expect(res.header['set-cookie']).toBeDefined()

    const user = await User.findById(userOneId)

    expect(getJWTfromCookie(res)).toEqual('')
    expect(user?.tokens).toHaveLength(0)
  })
})
