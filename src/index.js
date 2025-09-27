
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import blogRoutes from './routes/blog.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
dotenv.config();
const port = process.env.PORT;


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);


app.listen(port, () => {
  console.log("Example listening on PORT:" + port);
  connectDB();
})
