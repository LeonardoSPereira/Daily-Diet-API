import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { createUser } from './routes/create-user';

const app = fastify();

app.register(cookie)
app.register(createUser)

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
})