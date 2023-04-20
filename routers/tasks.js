import express from "express";
const router = express.Router();
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE Task via a POST route
router.post('/', async (req, res) => {
  const { title, goalId } = req.body;
  const task = await prisma.tasks.create({
    data: {
      title,
      complete: false,
      goalId
    },
  });
  res.json(task);
});

// READ all Tasks via a GET route
router.get('/', async (req, res) => {
  const tasks = await prisma.tasks.findMany();
  res.json(tasks);
});

// READ a specific Task via a GET route
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const task = await prisma.tasks.findUnique({
    where: { id: Number(id) },
  });
  res.json(task);
});

// UPDATE a specific Task via a PUT route
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, complete, goalId } = req.body;
  const task = await prisma.tasks.update({
    where: { id: Number(id) },
    data: {
      title,
      complete,
      goalId
    },
  });
  res.json(task);
});

// DELETE a specific Task via a DELETE route
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.tasks.delete({
      where: { id: Number(id) },
    });
    if (!task) {
      return res.status(404).json({ message: `Task with id ${id} not found` });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 