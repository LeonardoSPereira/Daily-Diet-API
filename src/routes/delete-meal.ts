import { FastifyInstance } from "fastify";
import { checkIfSessionIdExists } from "../middlewares/check-if-session-id-exists";
import { z } from "zod";
import { knex } from "../../db/knex-connection";

export async function deleteMeal(app: FastifyInstance) {
  app.delete('/meals/:id', {
    preHandler: [checkIfSessionIdExists]
  }, async (request, reply) => {
    const createRouteParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = createRouteParamsSchema.parse(request.params);
    const { session_id } = request.cookies;

    await knex('meals').where({
      id,
      user_id: session_id
    }).delete();

    return reply.send({
      status: 'success',
      message: 'Meal deleted successfully'
    })
  })

}