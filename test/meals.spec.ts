import { afterAll, beforeAll, it, describe, expect } from 'vitest'
import request from 'supertest'
import { execSync } from 'node:child_process'
import { app } from '../src/app'
import { faker } from '@faker-js/faker'
import { beforeEach } from 'node:test'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  
  afterAll(async () => {
    await app.close()
  })
  
  it('should be able to create new meal', async () => {
    const createUserResponse = await request(app.server)
     .post('/users')
     .send({
        name: faker.person.fullName(),
        email: faker.internet.email()
      })

    const cookies = createUserResponse.get("Set-Cookie") || [] // Ensure cookies is an array

    await request(app.server)
     .post('/meals')
     .set('Cookie', cookies)
     .send({
      name: faker.lorem.words(),
      description: faker.lorem.text(),
      is_meal_on_diet: faker.datatype.boolean(),
      meal_day: faker.lorem.words(),
      meal_time: faker.lorem.words()
     })
     .expect(201)

  })

  it('should be able to get all meals', async () => {
    const createUserResponse = await request(app.server)
     .post('/users')
     .send({
        name: faker.person.fullName(),
        email: faker.internet.email()
      })

    const cookies = createUserResponse.get("Set-Cookie") || [] // Ensure cookies is an array

    await request(app.server)
     .get('/meals')
     .set('Cookie', cookies)
     .expect(200)
  })

  it('should be able to get a meal by id', async () => {
    const createUserResponse = await request(app.server)
     .post('/users')
     .send({
        name: faker.person.fullName(),
        email: faker.internet.email()
      })

    const cookies = createUserResponse.get("Set-Cookie") || [] // Ensure cookies is an array

    const createMealResponse = await request(app.server)
     .post('/meals')
     .set('Cookie', cookies)
     .send({
      name: faker.lorem.words(),
      description: faker.lorem.text(),
      is_meal_on_diet: faker.datatype.boolean(),
      meal_day: faker.lorem.words(),
      meal_time: faker.lorem.words()
     })

    const mealId = createMealResponse.body.data.id;

    await request(app.server)
     .get(`/meals/${mealId}`)
     .set('Cookie', cookies)
     .expect(200)
  })
})