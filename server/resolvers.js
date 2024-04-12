const Post = require("./Schema/postSchema");

//Resolvers
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getPosts: async () => {
      return await Post.find();
    },
  },
  Mutation: {
    createPost: async (parent, args) => {
      const { title, description } = args.post;
      const post = await new Post({ title, description }).save();
      return post;
    },
    updatePost: async (parent, args) => {
      const { id } = args;
      const { title, description } = args.post;
      const post = await Post.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return post;
    },
    deletePost: async (parent, args) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return "Deleted";
    },
  },
};

module.exports = resolvers;
