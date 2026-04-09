import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getUserFromToken } from "./utils/auth.js";
import typeDefs from "./typedefs.js";
import resolvers from "./resolvers.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
console.log(mongoUri);

if (!mongoUri) {
  console.error("❌ Missing MONGODB_URI environment variable. Copy .env.example to .env and set your MongoDB URI.");
  process.exit(1);
}

mongoose.set("strictQuery", false);

try {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to MongoDB");
} catch (error) {
  console.error("❌ MongoDB connection failed:", error.message);
  process.exit(1);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3200 },
  context: async ({ req }) => {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const user = await getUserFromToken(token);
    return { user };
  },
});
console.log(`🚀  Server ready at: ${url}`);
