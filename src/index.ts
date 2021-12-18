import { ApolloServer, gql} from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from 'http';

import typeDefs from './graphql/schema';

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `
const resolvers = {
  Query: {
    hello() {
      return 'World'
    }
  }
}

const listen = async (port: number) => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
  });

  await server.start();
  server.applyMiddleware({app});
  return new Promise((resolve, reject) => {
    httpServer.listen(port).once('listen', resolve).once('error', reject)
  })
}

const main = async() => {
  try {
    const port = 2000
    await listen(port);
    console.log(`🚀 Server is ready at http://localhost:${port}/graphql`)
  } catch (err) {
    console.log('💀 Error starting the node server', err)
  }
}
void main();
