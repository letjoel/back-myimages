# Imagine (Backend API)

Favourite images app developed with React and Nest js.

## Description

Backend Rest Api that serves an image CRUD for the [frontend application](https://github.com/letjoel/front-myimages).
The images are stored on the server and served as static files through an endpoint.
Images are saved in a MongoDB with title, url and id.

## Technology used

[Nest](https://github.com/nestjs/nest) framework using TypeScript and Mongoose (MongoDB)

## Documentation

Check documentation with Swagger, just browse to:
{localhost:port}/docs

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Next Setps

The application can be scaled by introducing functionalities such as login, multiple selection, image cropping or color editing. It could also be linked to a cloud service to avoid storing images on the same API server.

## Stay in touch

- Author - [Joel](https://elniu.dev)
