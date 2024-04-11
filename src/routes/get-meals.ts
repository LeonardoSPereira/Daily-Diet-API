import { FastifyInstance } from "fastify";
import { checkIfSessionIdExists } from "../middlewares/check-if-session-id-exists";
import { knex } from "../../db/knex-connection";

export async function getMeals(app: FastifyInstance) {
  app.get('/meals', {
    preHandler: [checkIfSessionIdExists]
  }, async (request, reply) => {
    const { session_id } = request.cookies;

    const meals = await knex('meals').where('user_id', session_id);

    return reply.status(200).send({
      status: 'success',
      data: meals,
    });
  })
}