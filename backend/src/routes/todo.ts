import { Router, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;

    if (typeof title !== 'string' || typeof isCompleted !== 'boolean') {
      return res.status(400).json({ error: '無効な入力データです' });
    }

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

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: '無効なTodo IDです' });
    }

    const { title, isCompleted } = req.body;
    console.log(`title:${title}`)
    console.log(`isCompleted:${isCompleted}`)

    // TODO:フロント側で一旦titleが更新されるか検証したいのでisCompletedのチェックはしない
    // if (typeof title !== 'string' || typeof isCompleted !== 'boolean') {
    //   return res.status(400).json({ error: '無効な入力データです' });
    // }

    // if (typeof title !== 'string') {
    //   return res.status(400).json({ error: '無効な入力データです' });
    // }

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

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Todoが見つかりません' });
    }

    return res.status(500).json({ error: 'Todoの更新中にエラーが発生しました' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: '無効なTodo IDです' });
    }

    const deleteTodo = await prisma.todo.delete({
      where: { id }
    });

    return res.json(deleteTodo);
  } catch (error) {
    console.error('Todoの削除中にエラーが発生しました:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ error: 'Todoが見つかりません' });
    }

    return res.status(500).json({ error: 'Todoの削除中にエラーが発生しました' });
  }
});

export default router;
