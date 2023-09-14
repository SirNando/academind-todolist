const Todo = require("../models/todo.model");

async function getAllTodos(req, res, next) {
    let todos
    try {
        todos = await Todo.getAllTodos();
    } catch(error) {
        return next(error);
    }

    res.json({
        todos: todos
    });
}

async function addTodo(req, res, next) {
    const todoText = req.body.text;

    const todo = new Todo(todoText);

    let insertedId;

    try {
        const result = await todo.save();
        insertedId = result.insertedId;
    } catch(error) {
        next(error);
    }

    todo.id = insertedId.toString();

    res.json({
        message: "Added todo successfully!",
        createdTodo: todo
    });
}

function updateTodos() {}

function deleteTodo() {}

module.exports = {
    getAllTodos,
    addTodo,
    updateTodos,
    deleteTodo
}