const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: { type: String, required: true },
    todo: { type: String, required: true },
    description: { type: String },
    subTasks: { type: {String: Boolean} },
    completed: { type: Boolean, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;