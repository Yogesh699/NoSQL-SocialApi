import express from "express";
import connectDb from "./db/db.js";
import { configDotenv } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import thoughtRoutes from "./routes/thoughtRoutes.js";

configDotenv();
const app = express();

app.use(express.json());

//database

connectDb();

//routes

app.get("/", (req, res) => {
  return res.json("Hello world");
});

//user routes
app.use("/api/v1/users", userRouter);
//transections routes
app.use("/api/v1/thought", thoughtRoutes);

///listening

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT} `);
});
