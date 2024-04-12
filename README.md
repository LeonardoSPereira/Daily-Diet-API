# Daily Diet API

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Routes](#routes)
- [Tests](#tests)
- [Technologies](#technologies)


## About <a name = "about"></a>

This is a RESTful API built in with NodeJS, that allows users to track their daily diet. <br>
The API allows users to create an account and based on a cookie session, the user can track their daily diet.<br>
The user can realize CRUD operations on their daily diet, and also can track their metrics, like total meals, total meals on diet, total meals off diet and their best sequence of meals on diet.<br>

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have NodeJS installed on your machine. You can download it [here](https://nodejs.org/en/download/).<br>
You will also need an package manager, like npm or pnpm. NPM comes with NodeJS installation, and you can install pnpm by running the following command:

```bash
npm install -g pnpm
```

In this project I'm using PNPM. You can use NPM or Yarn if you want.

### Installing

A step by step series of examples that tell you how to get a development env running.

1. Clone the repository or download the zip file.<br>
if you will use git, you will also need to have git installed on your machine. You can download it [here](https://git-scm.com/downloads).

```bash
git clone https://github.com/LeonardoSPereira/Daily-Diet-API.git
```

2. Install the dependencies

```bash
pnpm install
```

3. Create a .env file in the root of the project and add the following variables:

```env
PORT=3000
```

4. Run the migrations

```bash
pnpm knex migrate:latest
```

5. Start the server

```bash
pnpm dev
```

## Routes <a name = "routes"></a>
The API has the following routes:

### Users

#### Create a user
```http
POST /users
```
- Body
```json
{
    "name": "John Doe",
    "email": "johndoe@email.com"
}
```

**Remember to get the cookie send as a response for this route. You will need to send it in the following requests. The cookie can be found in the response header.**

### Meals

#### Create a meal
```http
POST /meals
```
- Body
```json
{
  "name": "your meal name",
  "description": "your meal description",
  "is_meal_on_diet": if the meal is on diet or not,
  "meal_day": "day of the meal",
  "meal_time": "time of the meal"
}
```

#### Get all meals
```http
GET /meals
```

#### Get a meal
```http
GET /meals/:id
```
- Params
```json
{
  "id": "meal id"
}
```

#### Update a meal
```http
PUT /meals/:id
```
- Params
```json
{
  "id": "meal id"
}
```

- Body
```json
{
  "name": "your meal name",
  "description": "your meal description",
  "is_meal_on_diet": if the meal is on diet or not,
  "meal_day": "day of the meal",
  "meal_time": "time of the meal"
}
```
**You can send only the fields you want to update.**

#### Delete a meal
```http
DELETE /meals/:id
```

- Params
```json
{
  "id": "meal id"
}
```

### Metrics
```http
GET /metrics
```

## Usage <a name = "usage"></a>
Having the API running, you can use a tool like Postman to make requests to the API.<br>
The routes are described above, with the body and params that you need to send in the requests.<br>
***Remember to send the cookie in the requests that need it.***


## Tests <a name = "tests"></a>
The app has tests for create a user, create a meal, get all meals and get a meal.<br>
The tests where written using Vitest and Supertest.<br>
To run the tests, you can run the following command:

```bash
pnpm test
```

## Technologies <a name = "technologies"></a>
- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [Knex](http://knexjs.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Zod](https://zod.dev)
- [Vitest](https://vitest.dev)

