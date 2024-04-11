import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { createUser } from './routes/create-user';
import { createMeal } from './routes/create-meal';

const app = fastify();

app.register(cookie)
app.register(createUser)
app.register(createMeal)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
})