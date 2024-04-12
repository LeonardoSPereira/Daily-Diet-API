import { FastifyInstance } from "fastify";
import { checkIfSessionIdExists } from "../middlewares/check-if-session-id-exists";
import { knex } from "../../db/knex-connection";

export async function getMetrics(app: FastifyInstance) {
  app.get('/metrics', {
      preHandler: [checkIfSessionIdExists]
    }, async (request, reply) => {
        const { session_id } = request.cookies

        const totalMealsOnDiet = await knex('meals')
          .where({ user_id: session_id, is_meal_on_diet: true})
          .count('id', { as: 'total' })
          .first()

        const totalMealsOffDiet = await knex('meals')
          .where({ user_id: session_id, is_meal_on_diet: false })
          .count('id', { as: 'total' })
          .first()

        const totalMeals = await knex('meals')
          .where({ user_id: session_id })
          .orderBy('created_at', 'desc')

        const { bestOnDietSequence } = totalMeals.reduce(
          (acc, meal) => {
            if (meal.is_meal_on_diet) {
              acc.currentSequence += 1
            } else {
              acc.currentSequence = 0
            }

            if (acc.currentSequence > acc.bestOnDietSequence) {
              acc.bestOnDietSequence = acc.currentSequence
            }

            return acc
          },
          { bestOnDietSequence: 0, currentSequence: 0 },
        )

        return reply.send({
          status: 'success',
          totalMeals: totalMeals.length,
          totalMealsOnDiet: totalMealsOnDiet?.total,
          totalMealsOffDiet: totalMealsOffDiet?.total,
          bestOnDietSequence,
        })
  })
}