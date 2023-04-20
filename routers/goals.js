import express from "express";
const router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE Goal via a POST route
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const goal = await prisma.goals.create({
    data: {
      title,
      description,
      targetDate: new Date("August 23, 2023"),
      complete: false,
    },
  });
  res.json(goal);
});

// READ all Goals and their related Tasks via a GET route
router.get('/', async (req, res) => {
  const goals = await prisma.goals.findMany({
    include: { tasks: false },
  });
  res.json(goals);
});

// READ a specific Goal and its related Tasks via a GET route
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const goal = await prisma.goals.findUnique({
    where: { id: Number(id) },
    include: { tasks: true },
  });
  res.json(goal);
});

// UPDATE a specific Goal via a PUT route
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, complete } = req.body;
  const goal = await prisma.goals.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      targetDate,
      complete,
    },
  });
  res.json(goal);
});

// DELETE a specific Goal via a DELETE route
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.$transaction([
      prisma.tasks.deleteMany({ where: { goalId: Number(id) } }),
      prisma.goals.deleteMany({ where: { id: Number(id) } }),
    ]);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete goal.' });
  }
});

export default router;