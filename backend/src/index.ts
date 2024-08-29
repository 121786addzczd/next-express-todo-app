import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = 8000;

app.get('/todos', (req: Request, res: Response) => {
  const todos = [
    { id: 1, title: '買い物に行く', isCompleted: false },
    { id: 2, title: '犬の散歩をする', isCompleted: true },
    { id: 3, title: '本を読む', isCompleted: false },
  ];

  return res.json(todos);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));