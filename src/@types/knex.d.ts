import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      session_id: string
      name: string
      email: string
      created_at: string
    },
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      is_meal_on_diet: boolean
      meal_day: string
      meal_time: string
      created_at: string
      updated_at: string
    }
  }
}