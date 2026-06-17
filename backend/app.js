
import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeAllRoutes/resumeRoutes.js';
import templateRoutes from './routes/resumeAllRoutes/templateRoutes.js';
import path from 'path';
import cors from 'cors';


import dns from 'dns';
dns.setServers(['1.2.1.2', '2.3.2.3', '0.0.0.0', '8.8.8.8', '8.8.4.4', '1.1.1.1']);


const app = express();
app.use(cors({
  origin: ["http://192.168.1.92:5173", "http://localhost:5173"], // Adjust this to your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// expose uploads folder publicly
app.use("/uploads", express.static(path.resolve("uploads")));



app.use('/resume', resumeRoutes);
app.use('/user', userRoutes);
app.use('/create', templateRoutes);


connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
