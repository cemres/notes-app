import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./sequelize.js";
import usersRouter from "./routes/users-routes.js";
import authRouter from "./routes/auth-routes.js";
import notesRouter from "./routes/notes-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8083;
const corsOptions = {
  credentials: true,
  origin: process.env.URL || "http://localhost:5173",
};

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

sequelize
  .sync()
  .then(() => console.log("Tables have been synced."))
  .catch((err) => console.log("Error syncing tables: " + err));

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
