import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../../db/database-connection";

export async function createUser(app: FastifyInstance) {
  app.post('/user', async (request, reply) => {
    const createUserRequestBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = createUserRequestBodySchema.parse(request.body);

    const test = await knex('sqlite_schema').select('*');
    console.log(test);
    

    return { name, email };

  });
}