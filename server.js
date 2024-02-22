const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const { typeDefs, resolvers } = require('./schemas');
const port = 3000;
const app = express();

app.use(
  jwt({
    secret: "HUSH_YO_MOUTH",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

async function startServer() {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user || null;
      return { user };
    },
  });
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.listen({ port }, () => {
  console.log(
    `Your server is ready on http://localhost:${port}${server.graphqlPath}`
  );
});
