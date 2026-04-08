export const Users=[
    {
        id:1,
        name:"Ali",
        email:"ali@ali.com"
    },
    {
        id:2,
        name:"Nour",
        email:"nour@nour.com"
    },
    {
        id:3,
        name:"Amr",
        email:"amr@amr.com"
    },
    
]

export const Todos=[
    {
        id:1,
        title:"eating breakfast",
        completed:true,
        userId:1
    },
    {
        id:2,
        title:"eating lunch",
        completed:false,
        userId:2
    },
    {
        id:3,
        title:"eating dinner",
        completed:false,
        userId:1
    },
    {
        id:4,
        title:"sleep more",
        completed:true,
        userId:3
    },
]

export const Posts = [
  {
    id: 1,
    title: "Intro to GraphQL",
    content: "GraphQL is a query language for APIs...",
    userId: 1,
  },
  {
    id: 2,
    title: "Node.js Tips",
    content: "Always handle async errors properly...",
    userId: 2,
  },
  {
    id: 3,
    title: "Clean Code",
    content: "Write readable and maintainable code...",
    userId: 1,
  },
];

export const Comments = [
  {
    id: 1,
    content: "Great post! ",
    userId: 2,
    postId: 1,
  },
  {
    id: 2,
    content: "Very helpful, thanks!",
    userId: 3,
    postId: 1,
  },
  {
    id: 3,
    content: "I love this tip about error handling.",
    userId: 1,
    postId: 2,
  },
  {
    id: 4,
    content: "Clean code is everything ",
    userId: 2,
    postId: 3,
  },
];