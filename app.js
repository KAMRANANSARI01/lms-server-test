import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from './routes/courseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import miscRoutes from './routes/miscelleneousRoutes.js';
import errorMiddleware from "./middleware/error.middleware.js";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://lms-kamran.vercel.app', // Remove trailing slash
  credentials: true,
}));
app.use(cookieParser());
app.use(morgan('dev'));

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

app.use("/api/v1/user", userRoutes); // for user homePage
app.use("/api/v1/course", courseRoutes); // for course homepage
app.use("/api/v1/payment", paymentRoutes);
app.use('/api/v1', miscRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! Page not found");
});

app.use(errorMiddleware);

export default app;
