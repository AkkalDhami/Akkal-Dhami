import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import { connectToDatabase } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authRequired } from './middleware/auth.js';


import authRouter from './routes/authRoutes.js';
import projectRouter from './routes/projectRoutes.js';
import skillRouter from './routes/skillRoutes.js';
import aboutRouter from './routes/aboutRoutes.js';
import educationRouter from './routes/educationRoutes.js';
import experienceRouter from './routes/experienceRoutes.js';
import messageRouter from './routes/messageRoutes.js';

const app = express();

// Middleware
const rawCorsOrigins = process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5175';
const allowedOrigins = rawCorsOrigins.split(',').map((s) => s.trim());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/project', projectRouter);
app.use('/api/skill', skillRouter);
app.use('/api/about', aboutRouter);
app.use('/api/education', educationRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/message', messageRouter);

app.get('/', (req, res) => {
    res.json({ status: 'ok', service: 'portfolio-server' });
});

app.use((req, res) => {
    res.status(404).json({ message: '404 Not Found' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    });

export default app;