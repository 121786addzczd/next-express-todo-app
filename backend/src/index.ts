import express from 'express';
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 

const app: Express = express();
const PORT = 8000;

const prisma = new PrismaClient();

app.get('/todos', async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));