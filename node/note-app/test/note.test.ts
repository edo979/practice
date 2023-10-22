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

  test('Notes page should exist', async () => {
    const res = await request(app).get('/notes')

    expect(res.statusCode).toEqual(200)
  })

  test('Should get notes', async () => {
    const res = await request(app).get('/notes')

    expect(res.body.notes).toBeDefined()
  })
})
