import fastify from 'fastify';
import cookie from '@fastify/cookie';
import { createUser } from './routes/create-user';
import { createMeal } from './routes/create-meal';
import { getMeals } from './routes/get-meals';
import { getSingleMeal } from './routes/get-single-meal';
import { updateMeal } from './routes/update-meal';
import { deleteMeal } from './routes/delete-meal';
import { getMetrics } from './routes/get-metrics';

export const app = fastify();

app.register(cookie)

app.register(createUser)
app.register(createMeal)
app.register(getMeals)
app.register(getSingleMeal)
app.register(updateMeal)
app.register(deleteMeal)
app.register(getMetrics)

