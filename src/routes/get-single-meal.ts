import { FastifyInstance } from "fastify";
import { checkIfSessionIdExists } from "../middlewares/check-if-session-id-exists";
import z from "zod";
import { knex } from "../../db/knex-connection";

export async function getSingleMeal(app: FastifyInstance) {
  app.get('/meals/:id', {
    preHandler: [checkIfSessionIdExists]
  }, async (request, reply) => {
    const createRouteParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = createRouteParamsSchema.parse(request.params);
    const { session_id } = request.cookies;

    const meal = await knex('meals').where(
      {
        user_id: session_id,
        id
      }
    ).first()
    
    return reply.status(200).send({
      status: 'success',
      data: meal
    })
  })
}