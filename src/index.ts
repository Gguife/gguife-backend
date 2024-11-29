import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter";
import projectRouter from "./routes/projectRouter";

dotenv.config();
const app = express();

app.use(express.json());
const allowedOrigins = [
  'https://localhost:8080',
  'http://localhost:5173'
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(userRouter);
app.use(projectRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: '© 2024 - gguife backend online!' })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})