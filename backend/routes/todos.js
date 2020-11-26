const router = require('express').Router();
const auth = require('../middleware/auth');

let Todo = require('../models/todo.model');

router.get('/', auth, async (req, res) => {
    await Todo.find({userId: req.user})
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', auth, async (req,res) => {
    const todo = req.body.todo;
    const description = req.body.description;
    const subTasks = req.body.subTasks;
    const completed = req.body.completed;
    const date = Date.parse(req.body.date);

    if (!todo || !date) 
        return res
            .status(400)
            .json({msg: "Fields empty!"});

    const newTodo = new Todo({
        userId: req.user,
        todo,
        description,
        subTasks,
        completed,
        date
    });

    await newTodo.save()
        .then(() => res.json(newTodo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', auth, async (req, res) => {
    await Todo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', auth, async (req, res) => {
    const todo = await Todo.findOne({userId: req.user, _id: req.params.id})
    if (!todo) 
        return res
            .status(400)
            .json({msg: "No todo Found!"});
    await Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json("Todo Deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', async (req, res) => {
    await Todo.findById(req.params.id)
        .then(todo => {
            todo.todo = req.body.todo;
            todo.description = req.body.description;
            todo.subTasks = req.body.subTasks;
            todo.completed = req.body.completed;
            todo.date = Date.parse(req.body.date);

            todo.save()
                .then(() => res.json('Todo Updated!!!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;