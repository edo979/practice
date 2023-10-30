import request from 'supertest'
import app from '../src/app'
import { closeConnection } from '../src/db/mongoose'
import {
  createTestNotes,
  createTestUsers,
  firstTask,
  firstTaskId,
  secondTaskId,
  setupDatabase,
  thirdTaskId,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
} from './fixtures/db'
import Note from '../src/models/note'

beforeEach(async () => {
  await setupDatabase()
  await createTestUsers()
  await createTestNotes()
})
afterAll(closeConnection)

describe('Tests for creating notes', () => {
  test('Should create a new note', async () => {
    const note = { title: 'Test title', body: 'Test body', owner: userOneId }

    const res = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send(note)
      .expect(201)

    const noteFromDb = await Note.findById(res.body._id)

    expect(noteFromDb).toMatchObject(note)
  })

  test('Should refuse creates note if user is not logged in', async () => {
    await request(app)
      .post('/notes')
      .send({ title: 'New title', body: 'New body' })
      .expect(401)

    const notes = await Note.find()

    expect(notes).toHaveLength(3)
  })

  test('Should not to create note if is not passes validation', async () => {
    await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ body: 'test body' })
      .expect(404)

    await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ title: 'te', body: 'test body' })
      .expect(404)

    await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ title: 'test' })
      .expect(404)
  })
})

describe('Tests for fetching notes', () => {
  test('Should get notes', async () => {
    const res = await request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)

    const notes = await Note.find({ owner: userOneId })

    // expect(res.body).toBeDefined()
    // expect(res.body.length).toBe(2)
    // expect(res.body[0]).toMatchObject({
    //   title: notes[0].title,
    //   body: notes[0].body,
    //   owner: notes[0].owner.toString(),
    // })
    // expect(res.body[1]).toMatchObject({
    //   title: notes[1].title,
    //   body: notes[1].body,
    //   owner: notes[1].owner.toString(),
    // })
    expect(res.header['content-type']).toMatch(/html/)
  })

  test('Should get note by id', async () => {
    const res = await request(app)
      .get(`/notes/${secondTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)

    const secondNote = await Note.findById(secondTaskId)

    expect(res.body.note).toBeDefined()
    expect(res.body.note).toMatchObject({
      title: secondNote?.title,
      body: secondNote?.body,
    })
  })

  test("Should not get note if note doesn't exist", async () => {
    const res = await request(app)
      .get('/notes/1234')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(404)

    expect(res.body.note).toBeUndefined()
  })

  test("Should not get note by id if doesn't belong to logged in user", async () => {
    await request(app)
      .get(`/notes/${thirdTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(404)
  })
})

describe('Tests for updating notes', () => {
  test('Should update note', async () => {
    const updateData = { title: 'Update title', body: 'Update body' }

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
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
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
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
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send(updateData)
      .expect(200)

    const note1 = await Note.findById(secondTaskId)
    const note2 = await Note.findById(thirdTaskId)

    expect(note1).toBeDefined()
    expect(note1?.title).not.toBe(updateData.title)
    expect(note1?.body).not.toBe(updateData.body)

    expect(note2).toBeDefined()
    expect(note2?.title).not.toBe(updateData.title)
    expect(note2?.body).not.toBe(updateData.body)
  })

  test('Should not update note with wrong data', async () => {
    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ title: '' })
      .expect(400)

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ body: '' })
      .expect(400)

    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ title: 'te' })
      .expect(400)
  })

  test('Should not update note if note does not exist', async () => {
    await request(app)
      .patch('/notes/notExist')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({ title: 'New note title' })
      .expect(404)
  })

  test('Should not update note of another user', async () => {
    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({ title: 'New title' })
      .expect(404)
  })

  test('Should not update note if user not logged in', async () => {
    await request(app)
      .patch(`/notes/${firstTaskId}`)
      .send({ title: 'New title' })
      .expect(401)
  })
})

describe('Tests for deleting note', () => {
  test('Should delete note', async () => {
    await request(app)
      .delete(`/notes/${firstTaskId}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200)

    const notes = await Note.find()
    const deletedNote = await Note.findById(firstTaskId)

    expect(notes).toHaveLength(2)
    expect(deletedNote).toBeFalsy()
  })

  test('Should not delete other user note', async () => {
    await request(app)
      .delete(`/notes/${thirdTaskId}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .expect(200)

    const notes = await Note.find()

    expect(notes).toHaveLength(2)
    expect(notes[0].owner).not.toBe(userTwoId)
    expect(notes[1].owner).not.toBe(userTwoId)
  })

  test('Should not delete note that does not exist', async () => {
    await request(app)
      .delete('/notes/123')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(404)

    const notes = await Note.find()

    expect(notes).toHaveLength(3)
  })

  test('Should not delete note if user is not logged in', async () => {
    await request(app).delete(`/notes/${thirdTaskId}`).expect(401)

    const notes = await Note.find()

    expect(notes).toHaveLength(3)
  })
})
