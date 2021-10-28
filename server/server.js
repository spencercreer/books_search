//Develop
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

let apollo_server;
async function startServer() {
  apollo_server = new ApolloServer({
    typeDefs,
    resolvers,
    constext: authMiddleware,
  });
  
  apollo_server.applyMiddleware({ app });
}

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`)
    console.log(`Use GrqphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
