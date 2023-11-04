import request from 'supertest'
import httpserver from '../src/app'

describe('Test for chat-app', () => {
  test('Should page for chat exist', async () => {
    const res = await request(httpserver).get('/chat.html').expect(200)
  })
})
