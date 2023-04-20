import express from "express";
const app = express();
const port = +(process.env.PORT || 4001);
import cors from "cors";
import fs from "fs";
import morgan from "morgan";
import goalsRouter from './routers/goals.js';
import tasksRouter from './routers/tasks.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use(morgan("tiny"));

app.use('/goals', goalsRouter);
app.use('/tasks', tasksRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`);
});

