import { FastifyInstance } from "fastify";
import { knex } from "../../db/knex-connection";
import { z } from "zod";
import { randomUUID } from "node:crypto";

export async function createUser(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const createUserRequestBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = createUserRequestBodySchema.parse(request.body);
    let { session_id } = request.cookies;

    if(!session_id) {
      session_id = randomUUID();
      
      reply.cookie('session_id', session_id, {
        path: '/',
      });
    }

    await knex('users').insert({
      id: randomUUID(),
      session_id,
      name,
      email,
    })

    return reply.status(201).send({
      status: 'success',
      message: 'User created successfully'
    });
  });
}