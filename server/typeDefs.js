// ? Queries
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
  }

  type Query {
    hello: String!
    getPosts: [Post!]!
  }

  type Mutation {
    createPost(post: postInputs): Post,
    updatePost( id : ID! , post : postInputUpdate ) : Post,
    deletePost( id : ID! ) : String
  }

  input postInputs {
    title: String!
    description: String!
  }

  input postInputUpdate {
    title: String
    description: String
  }
`;

module.exports = typeDefs;
