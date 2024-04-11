import { FastifyInstance } from "fastify";
import { checkIfSessionIdExists } from "../middlewares/check-if-session-id-exists";
import { z } from "zod";
import { knex } from "../../db/knex-connection";

export async function updateMeal(app: FastifyInstance) {
  app.put('/meals/:id', {
    preHandler: [checkIfSessionIdExists]
  } , async (request, reply) => {
    const createRouteParamsSchema = z.object({
      id: z.string().uuid()
    })

    const createMealBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      is_meal_on_diet: z.boolean().optional(),
      meal_day: z.string().optional(),
      meal_time: z.string().optional()
    })

    const { id } = createRouteParamsSchema.parse(request.params);
    const { session_id } = request.cookies;
    const {
      name,
      description,
      is_meal_on_diet,
      meal_day,
      meal_time
    } = createMealBodySchema.parse(request.body);

    const meal = await knex('meals').where({
      id,
      user_id: session_id
    }).first();
    
    if (!meal) {
      return reply.status(404).send({
        status: 'error',
        message: 'Meal not found'
      });
    }

    const updatedMeal = await knex('meals').where({
      id,
      user_id: session_id
    }).update({
      name: name ?? meal.name,
      description: description ?? meal.description,
      is_meal_on_diet: is_meal_on_diet ?? meal.is_meal_on_diet,
      meal_day: meal_day ?? meal.meal_day,
      meal_time: meal_time ?? meal.meal_time,
      updated_at: knex.fn.now()
    }).returning('*');

    return reply.send({
      status: 'success',
      message: 'Meal updated successfully',
      data: updatedMeal
    })
  })
}