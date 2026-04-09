import bcrypt from "bcrypt";
import { AuthenticationError } from "apollo-server-errors";
import User from "./models/User.js";
import Todo from "./models/Todo.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import { generateToken } from "./utils/auth.js";

const requireAuth = (user) => {
  if (!user) {
    throw new AuthenticationError("Authentication required");
  }
  return user;
};

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQl",

    me: async (_, __, { user }) => {
      requireAuth(user);
      return user;
    },

    users: async (_, __, { user }) => {
      requireAuth(user);
      return User.find().lean();
    },
    user: async (_, { id }, { user }) => {
      requireAuth(user);
      return User.findOne({ id }).lean();
    },

    todos: async (_, __, { user }) => {
      requireAuth(user);
      return Todo.find().lean();
    },
    todo: async (_, { id }, { user }) => {
      requireAuth(user);
      return Todo.findOne({ id }).lean();
    },

    posts: async (_, __, { user }) => {
      requireAuth(user);
      return Post.find().lean();
    },
    post: async (_, { id }, { user }) => {
      requireAuth(user);
      return Post.findOne({ id }).lean();
    },

    comments: async (_, __, { user }) => {
      requireAuth(user);
      return Comment.find().lean();
    },
    comment: async (_, { id }, { user }) => {
      requireAuth(user);
      return Comment.findOne({ id }).lean();
    },
  },

  Todo: {
    user: async (parent) => User.findOne({ id: parent.userId }).lean(),
  },

  User: {
    todos: async (parent) => Todo.find({ userId: parent.id }).lean(),
    posts: async (parent) => Post.find({ userId: parent.id }).lean(),
    comments: async (parent) => Comment.find({ userId: parent.id }).lean(),
  },

  Post: {
    user: async (parent) => User.findOne({ id: parent.userId }).lean(),
    comments: async (parent) => Comment.find({ postId: parent.id }).lean(),
  },

  Comment: {
    user: async (parent) => User.findOne({ id: parent.userId }).lean(),
    post: async (parent) => Post.findOne({ id: parent.postId }).lean(),
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email is already in use");
      }

      const lastUser = await User.findOne().sort({ id: -1 });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        id: lastUser ? lastUser.id + 1 : 1,
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      const token = generateToken(newUser);
      return { token, user: newUser.toObject() };
    },

    signin: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError("Invalid email or password");
      }

      const token = generateToken(user);
      return { token, user: user.toObject() };
    },

    addTodo: async (_, { todo }, { user }) => {
      requireAuth(user);
      const lastTodo = await Todo.findOne().sort({ id: -1 });
      const newTodo = new Todo({
        ...todo,
        userId: user.id,
        id: lastTodo ? lastTodo.id + 1 : 1,
      });
      return newTodo.save();
    },

    addPost: async (_, { post }, { user }) => {
      requireAuth(user);
      const lastPost = await Post.findOne().sort({ id: -1 });
      const newPost = new Post({
        ...post,
        userId: user.id,
        id: lastPost ? lastPost.id + 1 : 1,
      });
      return newPost.save();
    },

    addComment: async (_, { comment, postId }, { user }) => {
      requireAuth(user);
      const lastComment = await Comment.findOne().sort({ id: -1 });
      const newComment = new Comment({
        ...comment,
        userId: user.id,
        postId,
        id: lastComment ? lastComment.id + 1 : 1,
      });
      return newComment.save();
    },

    updateTodo: async (_, { id, todo }, { user }) => {
      requireAuth(user);
      const updated = await Todo.findOneAndUpdate({ id }, todo, {
        new: true,
      }).lean();
      if (!updated) throw new Error("Todo not found");
      return updated;
    },

    updatePost: async (_, { id, post }, { user }) => {
      requireAuth(user);
      const updated = await Post.findOneAndUpdate({ id }, post, {
        new: true,
      }).lean();
      if (!updated) throw new Error("Post not found");
      return updated;
    },

    updateComment: async (_, { id, comment }, { user }) => {
      requireAuth(user);
      const updated = await Comment.findOneAndUpdate({ id }, comment, {
        new: true,
      }).lean();
      if (!updated) throw new Error("Comment not found");
      return updated;
    },

    deleteTodo: async (_, { id }, { user }) => {
      requireAuth(user);
      const deleted = await Todo.findOneAndDelete({ id }).lean();
      return deleted ? "Todo deleted successfully" : "Todo not found";
    },

    deletePost: async (_, { id }, { user }) => {
      requireAuth(user);
      const deleted = await Post.findOneAndDelete({ id }).lean();
      return deleted ? "Post deleted successfully" : "Post not found";
    },

    deleteComment: async (_, { id }, { user }) => {
      requireAuth(user);
      const deleted = await Comment.findOneAndDelete({ id }).lean();
      return deleted ? "Comment deleted successfully" : "Comment not found";
    },
  },
};

export default resolvers;
