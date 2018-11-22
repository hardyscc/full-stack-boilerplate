# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

# start a docker instance of postgres, redis

docker run --name some-redis -p 6379:6379 -d redis
docker run --name some-postgres -p 5432:5432 -d -e POSTGRES_DB=test postgres

# start a command line instance of postgres, redis

docker run -it --rm --link some-redis:redis redis redis-cli -h redis -p 6379
docker run -it --rm --link some-postgres:postgres postgres psql -h postgres -U postgres test
