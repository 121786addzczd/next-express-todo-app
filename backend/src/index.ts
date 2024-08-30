import express from 'express';
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 

const app: Express = express();
const PORT = 8000;

app.use(express.json());

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