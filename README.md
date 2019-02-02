# Povio Likes

2019-01-30 marko@zabreznik.net 

## CI strategy 

- A combined Dockerfile build for production and testing
- ``npm run test`` within image (todo)
- App exposes an express endpoint at port 3000 and uses ENV (see .env.sample)

- todo, seed database /seed/postgres
- todo ``typeorm migration:run``

- todo Sentry error handling 
https://github.com/mentos1386/nest-raven

## Build

```bash
$ docker build .
```

## Develop

```bash
docker-compose up
```

port is exposed at 127.0.0.12:3000
(todo, move to own docker-compose.yml) nodemon at 127.0.0.12:9229

*Changing packages or build scripts requires a rebuild in docker and npm install locally*

## Database changes (todo Make better docs)

The schema is handled with TypeORM

```bash
npm prestart:prod
npm typeorm:generate
npm prestart:prod
npm typeorm:run
```

## API Versioning Strategy (todo Not implemented)

- Use a HTTP header to ask for a specific version of the API, defaulting to the latest
- SOLID Open/Closed principle used for backwards compatibility, per interface

## Documentation (todo Not implemented)

Docs are generated from JDoc comments
todo Swagger?
