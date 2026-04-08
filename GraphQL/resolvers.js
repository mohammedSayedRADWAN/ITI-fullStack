import { Todos, Users, Posts, Comments } from "./_db.js";
// nested resolvers
const resolvers = {
  Query: {
    hello: () => "Hello from GraphQl",

    users: () => Users,
    user: (_, { id }) => Users.find((u) => u.id === id),

    todos: () => Todos,
    todo: (_, { id }) => Todos.find((t) => t.id === id),

    posts: () => Posts,
    post: (_, { id }) => Posts.find((p) => p.id === id),

    comments: () => Comments,
    comment: (_, { id }) => Comments.find((c) => c.id === id),
  },

  Todo: {
    user(parent) {
      return Users.find((u) => u.id === parent.userId);
    },
  },

  User: {
    todos(parent) {
      return Todos.filter((t) => t.userId === parent.id);
    },
    posts(parent) {
      return Posts.filter((p) => p.userId === parent.id);
    },
    comments(parent) {
      return Comments.filter((c) => c.userId === parent.id);
    },
  },

  Post: {
    user(parent) {
      return Users.find((u) => u.id === parent.userId);
    },
    comments(parent) {
      return Comments.filter((c) => c.postId === parent.id);
    },
  },

  Comment: {
    user(parent) {
      return Users.find((u) => u.id === parent.userId);
    },
    post(parent) {
      return Posts.find((p) => p.id === parent.postId);
    },
  },

  Mutation: {
    addTodo(_, { todo, userId }) {
      const newTodo = {
        ...todo,
        userId,
        id: Todos.length ? Todos[Todos.length - 1].id + 1 : 1,
      };
      Todos.push(newTodo);
      return newTodo;
    },

    addPost(_, { post, userId }) {
      const newPost = {
        ...post,
        userId,
        id: Posts.length ? Posts[Posts.length - 1].id + 1 : 1,
      };
      Posts.push(newPost);
      return newPost;
    },

    updateTodo(_, { id, todo }) {
      const oldTodo = Todos.find((t) => t.id === id);
      if (!oldTodo) throw new Error("Todo not found");

      Object.assign(oldTodo, todo);
      return oldTodo;
    },

    updatePost(_, { id, post }) {
      const oldPost = Posts.find((p) => p.id === id);
      if (!oldPost) throw new Error("Post not found");

      Object.assign(oldPost, post);
      return oldPost;
    },

    deleteTodo(_, { id }) {
      const index = Todos.findIndex((t) => t.id === id);
      if (index === -1) return false;

      Todos.splice(index, 1);
      return true;
    },

    deletePost(_, { id }) {
      const index = Posts.findIndex((p) => p.id === id);
      if (index === -1) return false;

      Posts.splice(index, 1);
      return true;
    },
  },
};


export default resolvers;
