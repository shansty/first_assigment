import express, { Express } from "express";
import cors from 'cors';
import dotenv from "dotenv";
import rootRouter from "./routers";
import { connectDB } from "./mongo_db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


(async () => {
  await connectDB();
})();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use('/', rootRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
