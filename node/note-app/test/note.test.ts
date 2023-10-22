import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'
import { setupDatabase } from './fixtures/db'
import Note from '../src/models/note'

beforeEach(setupDatabase)
afterAll(closeConnection)

describe('Tests for creating notes', () => {
  test('Should create a new note', async () => {
    const note = { title: 'Test title', body: 'Test body' }

    const res = await request(app).post('/notes').send(note).expect(201)

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
})

describe('Tests for fetching notes', () => {
  test('Should get notes', async () => {
    const res = await request(app).get('/notes')
    const notes = [
      { title: 'First', body: 'First body' },
      { title: 'Second', body: 'Second body' },
    ]

    await Note.insertMany(notes)

    const notesFromDB = await Note.find()

    expect(res.body.notes).toBeDefined()
    expect(notesFromDB[0]).toMatchObject(notes[0])
    expect(notesFromDB[1]).toMatchObject(notes[1])
  })
})
