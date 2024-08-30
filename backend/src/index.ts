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
  try {
    const { title, isCompleted } = req.body;

    // 入力のバリデーション
    if (typeof title !== 'string' || typeof isCompleted !== 'boolean') {
      return res.status(400).json({ error: '無効な入力データです' });
    }

    // データベース保存処理
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted
      }
    });
    return res.status(201).json(createTodo);
  } catch (error) {
    console.error('Todoの作成中にエラーが発生しました:', error);
    return res.status(500).json({ error: 'Todoの作成中にエラーが発生しました' });
  }
});

app.put('/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // IDのバリデーション
    if (isNaN(id)) {
      return res.status(400).json({ error: '無効なTodo IDです' });
    }

    const { title, isCompleted } = req.body;

    // 入力バリデーション
    if (typeof title !== 'string' || typeof isCompleted !== 'boolean') {
      return res.status(400).json({ error: '無効な入力データです' });
    }

    // データベースの更新処理
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });

    return res.json(editTodo);
  } catch (error) {
    console.error('Todoの更新中にエラーが発生しました:', error);

    // Prismaでのエラーを判別
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      // 'P2025' は対象データが見つからない場合のエラーコード
      return res.status(404).json({ error: 'Todoが見つかりません' });
    }

    return res.status(500).json({ error: 'Todoの更新中にエラーが発生しました' });
  }
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // IDのバリデーション
    if (isNaN(id)) {
      return res.status(400).json({ error: '無効なTodo IDです' });
    }

    // データベースの更新処理
    const deleteTodo = await prisma.todo.delete({
      where: { id }
    });

    return res.json(deleteTodo);
  } catch (error) {
    console.error('Todoの削除中にエラーが発生しました:', error);

    // Prismaでのエラーを判別
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      // 'P2025' は対象データが見つからない場合のエラーコード
      return res.status(404).json({ error: 'Todoが見つかりません' });
    }

    return res.status(500).json({ error: 'Todoの削除中にエラーが発生しました' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));