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
  beforeEach(createTestNotes)

  test('Should get notes', async () => {
    const res = await request(app).get('/notes')

    const notes = await Note.find()

    expect(res.body.notes).toBeDefined()
    expect(res.body.notes[0]).toMatchObject({
      title: notes[0].title,
      body: notes[0].body,
    })
    expect(res.body.notes[1]).toMatchObject({
      title: notes[1].title,
      body: notes[1].body,
    })
  })

  test('Should get note by id', async () => {
    const res = await request(app).get(`/notes/${secondTaskId}`).expect(200)

    const secondNote = await Note.findById(secondTaskId)

    expect(res.body.note).toBeDefined()
    expect(res.body.note).toMatchObject({
      title: secondNote?.title,
      body: secondNote?.body,
    })
  })

  test("Should not get note if note doesn't exist", async () => {
    const res = await request(app).get('/notes/1234').expect(404)

    expect(res.body.note).toBeUndefined()
  })
})

describe('Tests for updating notes', () => {
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

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send({ title: 'te' })
      .expect(400)
  })
})

describe('Tests for deleting note by id', () => {
  beforeEach(createTestNotes)

  test('Should delete note', async () => {
    await request(app).delete(`/notes/${firstTaskId}`).send().expect(200)

    const firstNote = await Note.findByIdAndDelete(firstTaskId)
    const secondNote = await Note.findByIdAndDelete(secondTaskId)

    expect(firstNote).toBeNull()
    expect(secondNote).toBeDefined()
  })
})
