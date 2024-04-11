import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('session_id').inTable('users');
    table.text('name').notNullable();
    table.text('description');
    table.boolean('is_meal_on_diet').notNullable();
    table.text('meal_day').notNullable();
    table.text('meal_time').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}