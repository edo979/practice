import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'
import {
  createTestNotes,
  firstTask,
  firstTaskId,
  secondTaskId,
  setupDatabase,
} from './fixtures/db'
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

describe('Test for updating notes', () => {
  beforeEach(async () => {
    await setupDatabase()
    await createTestNotes()
  })

  test('Should update note', async () => {
    const updateData = { title: 'Update title', body: 'Update body' }

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send(updateData)
      .expect(200)

    const updatedNote = await Note.findById(firstTaskId)

    expect(updatedNote).toBeDefined()
    expect(updatedNote?.title).toBe(updateData.title)
    expect(updatedNote?.body).toBe(updateData.body)
  })

  test('Should update only title of note', async () => {
    const newUpdate = { title: 'New update title' }

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send(newUpdate)
      .expect(200)

    const updatedNote = await Note.findById(firstTaskId)

    expect(updatedNote).toBeDefined()
    expect(updatedNote?.title).toBe(newUpdate.title)
    expect(updatedNote?.body).toBe(firstTask.body)
  })

  test('Should not update any other note', async () => {
    const updateData = { title: 'Update title', body: 'Update body' }

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send(updateData)
      .expect(200)

    const updatedNote = await Note.findById(secondTaskId)

    expect(updatedNote).toBeDefined()
    expect(updatedNote?.title).not.toBe(updateData.title)
    expect(updatedNote?.body).not.toBe(updateData.body)
  })

  test('Should not update note with wrong data', async () => {
    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send({ title: '' })
      .expect(400)

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send({ body: '' })
      .expect(400)
  })
})
