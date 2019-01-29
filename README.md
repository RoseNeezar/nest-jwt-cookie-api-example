
## Build

```bash
$ docker build .
```

## RUN

Set environment variables (.env)

## Develop

```bash
docker-compose up
```

The default port for developent is 127.0.0.12

Point the nodemon debugger to 127.0.0.12:9229

*Changing packages or build scripts requires a rebuild in docker and npm install locally*

## Database changes

The schema is handled with TypeORM

```bash
npm prestart:prod
npm typeorm:generate
npm prestart:prod
npm typeorm:run
```