import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'
import { setupDatabase } from './fixtures/db'
import Note from '../src/models/note'

beforeEach(setupDatabase)
afterAll(closeConnection)

describe('Test crud operations with note', () => {
  test('Should create a new note', async () => {
    const note = { title: 'Test title', body: 'Test body' }

    const res = await request(app).post('/notes').send(note).expect(201)

    console.log(res.body)

    const noteFromDb = await Note.findById(res.body._id)

    expect(noteFromDb).toMatchObject(note)
  })

  test('Should not to create note if is not passes validation', async () => {
    await request(app).post('/notes').send({ body: 'test body' }).expect(404)

    await request(app)
      .post('/notes')
      .send({ title: 'te', body: 'test body' })
      .expect(404)

    await request(app).post('/notes').send({ title: 'test' }).expect(404)
  })

  test('Notes page should exist', async () => {
    const res = await request(app).get('/notes')

    expect(res.statusCode).toEqual(200)
  })

  test('Should get notes', async () => {
    const res = await request(app).get('/notes')

    expect(res.body.notes).toBeDefined()
  })
})
