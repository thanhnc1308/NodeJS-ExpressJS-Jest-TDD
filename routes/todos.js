const router = require('express').Router();
const createError = require('http-errors');

const todos = [
    {
        id: 1,
        name: 'Todo 1',
        completed: false,
    },
    {
        id: 2,
        name: 'Todo 2',
        completed: true,
    },
];

/**
 * GET /todos
 */
router.get('/', (req, res, next) => {
    try {
        res.json(todos);
    } catch (e) {
        console.log(e);
    }
});

/**
 * GET /todos/:id
 */
router.get('/:id', (req, res, next) => {
    try {
        const foundTodo = todos.find(
            (todo) => todo.id === Number(req.params.id)
        );
        if (!foundTodo) {
            return next(createError(404, 'Not Found'));
        } else {
            res.json(foundTodo);
        }
    } catch (e) {
        console.log(e);
    }
});

/**
 * POST /todos
 */
router.post('/', (req, res, next) => {
    try {
        const { body } = req;

        // validate
        if (typeof body.name !== 'string') {
            return next(createError(422, 'Validation Error'));
        }

        const newTodo = {
            id: todos.length + 1,
            name: body.name,
            completed: false,
        };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
