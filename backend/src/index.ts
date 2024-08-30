import express from 'express';
import type { Express, Request, Response } from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const app: Express = express();
const PORT = 8000;

// ミドルウェアの設定
app.use(express.json());
app.use(morgan('dev'));

const prisma = new PrismaClient();

app.get('/todos', async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title, isCompleted } = req.body;
  const createTodo = await prisma.todo.create({
    data: {
      title,
      isCompleted
    }
  });
  return res.json(createTodo);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));