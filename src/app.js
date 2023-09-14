import express from 'express';
import datab from './utils/database.js';
import Todo from './models/todomodel.js';
import 'dotenv/config';
import cors from 'cors'

Todo;

const PORT = process.env.PORT ?? 8000;

datab.authenticate()
  .then(() => console.log('Conected'))
  .catch(error => console.log(error));

datab.sync()
  .then(() => console.log('synchronized database'))
  .catch(error => console.log(error));

const app = express();

app.use(express.json(),cors());

app.get('/', (req, res) => {
  res.send('ok')
});


app.post('/todos', async (req, res) => {
  try {
    const { body } = req;
    const todo = await Todo.create(body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
})


app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(400).json(error);
  }
});


app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.json(todo);
  } catch (error) {
    res.status(400).json(error);
  }
});


app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await Todo.update(body, {
      where: { id }
    });
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error);
  }
});


app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.destroy({
      where: {id}
    });
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server listing on port ${PORT}`);
})


















    