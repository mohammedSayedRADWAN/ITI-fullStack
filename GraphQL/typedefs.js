const typeDefs = `#graphql
    type Query{
     #GET apis
     hello:String,
     users:[User],
     user(id:Int!):User
     todos:[Todo]
     todo(id:Int!):Todo
     #####################
    posts:[Post]
    post(id:Int!):Post
    comments:[Comment]
    comment(id:Int!):Comment

    },
    type User{
        id:Int!,
        name:String,
        email:String,
        #one to many relation or embedded schema
        todos:[Todo]
        posts:[Post]
        comments:[Comment]
    },
    ###########
    type Todo{
        id:Int!,
        title:String,
        completed:Boolean,
        ## one to one relation or reference schema
        user:User
    },
    ##### posts   ###########
      type Post{
        id:Int!,
        title:String,
        content:String,
        # one to one relation or reference schema
        user:User
        # one to one relation or reference schema

        comments:[Comment]
    },
     type Comment{
        id:Int!,
        content:String,
        ## one to one relation or reference schema
        user:User
        post:Post
    }
    
    input TodoInput{
        title:String,
        completed:Boolean,
    }
    input PostInput{
        title:String,
        content:String,
    }
     input CommentInput{
        content:String,
    }

    type Mutation{
        #Post,Put,Delete
        # input
        addTodo(todo:TodoInput,userId:Int!):Todo
        deleteTodo(id:Int!):String
        updateTodo(id:Int!,todo:TodoInput):Todo

        #Post,Put,Delete (posts)
        addPost(post:PostInput,userId:Int!):Post
        deletePost(id:Int!):String
        updatePost(id:Int!,post:PostInput):Post

        #Post,Put,Delete (comments)
        addComment(comment:CommentInput,userId:Int!,postId:Int!):Comment
        deleteComment(id:Int!):String
        updateComment(id:Int!,comment:CommentInput):Comment
    }


    `;

export default typeDefs;
