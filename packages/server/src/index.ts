import 'reflect-metadata';
import * as express from 'express';
import * as session from 'express-session';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { createTypeormConn } from './createTypeormConn';
import { createSchema } from './createSchema';
import { MyContext } from './context';

// @todo move to .env
const SESSION_SECRET = 'ajslkjalksjdfkl';
const port = 4000;

const startServer = async () => {
  await createTypeormConn();

  const server = new ApolloServer({
    schema: createSchema(),
    context: ({ req, res }: MyContext) => ({
      req,
      res
    })
  });

  const app = express();

  app.use(
    session({
      name: 'sid',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        // secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // 7 days
      }
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  );

  server.applyMiddleware({ app });

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
};

startServer();
