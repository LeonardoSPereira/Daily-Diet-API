import { afterAll, beforeAll, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { faker } from '@faker-js/faker'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

it('should be able to create a new user', async () => {
  await request(app.server)
   .post('/users')
   .send({
      name: faker.person.fullName(),
      email: faker.internet.email()
    })
   .expect(201)
})