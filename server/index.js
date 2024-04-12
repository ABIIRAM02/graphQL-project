const express = require("express");
const app = express();

const PORT = process.env.PORT || 5500

const { ApolloServer } = require("apollo-server-express");

const mongoose = require("mongoose");
mongoose.set('strictQuery',false)

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//Database Connection
const URI = "mongodb://localhost:27017/graphQl";

mongoose.connect(URI, {useUnifiedTopology: true,useNewUrlParser: true,})
  .then(() => {
    console.log("connected to database");
  });


const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
};
startServer();


app.listen(PORT, () => console.log("Server Running on 5500"));
