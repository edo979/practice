import request from 'supertest'
import app from '../src/app'

describe('Test crud operations with note', () => {
  test('Notes page should exist', async () => {
    const res = await request(app).get('/notes')

    expect(res.statusCode).toEqual(200)
  })

  test('Should get notes', async () => {
    const res = await request(app).get('/notes')

    expect(res.body.notes).toBeDefined()
  })
})
