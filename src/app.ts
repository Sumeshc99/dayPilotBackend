import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

setupSwagger(app);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.use("/api", router);

export default app;
