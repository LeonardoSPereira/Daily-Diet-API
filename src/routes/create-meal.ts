import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { knex } from "../../db/knex-connection";
import { checkIfSessionIdExists } from "../middlewares/check-if-session-id-exists";
import { z } from "zod";

export async function createMeal(app: FastifyInstance) {
  app.post('/meals', {
    preHandler: [checkIfSessionIdExists]
  } ,async (request, reply) => {
    const createMealRequestBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      is_meal_on_diet: z.boolean(),
      meal_day: z.string(),
      meal_time: z.string(),
    });

    const {
      name,
      description,
      is_meal_on_diet,
      meal_day,
      meal_time,
    } = createMealRequestBodySchema.parse(request.body);
    const { session_id } = request.cookies;

    const meal = await knex('meals').insert({
      id: randomUUID(),
      user_id: session_id,
      name,
      description,
      is_meal_on_diet,
      meal_day,
      meal_time,
    }).returning('*');

    return reply.status(201).send({
      status: 'success',
      message: 'Meal created successfully',
      data: meal[0],
    });
  });
}