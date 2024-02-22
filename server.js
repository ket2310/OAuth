const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const resolvers = require("./schemas/resolvers.js");
const typedefs = require("./schemas/typedefs.js");

const port = 3000;
const app = express();

app.use(
  jwt({
    secret: "HUSH_YO_MOUTH",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const server = new ApolloServer({
  typedefs,
  resolvers,
  context: ({ req }) => {
    const user = req.user || null;
    return { user };
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(
    `Your server is ready on http://localhost:${port}${server.graphqlPath}`
  );
});
