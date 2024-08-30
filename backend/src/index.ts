import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import todoRoutes from './routes/todo';

const app: Express = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(morgan('dev'));

// /todos エンドポイントに対して todoRoutes を使用
app.use('/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
