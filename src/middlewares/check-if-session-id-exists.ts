import { FastifyReply, FastifyRequest } from "fastify";
import { knex } from "../../db/knex-connection";

export async function checkIfSessionIdExists(request: FastifyRequest, reply: FastifyReply) {
  const { session_id } = request.cookies;

  if (!session_id) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const user = await knex('users').where({ session_id }).first();

  if(!user) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
}