import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import UserContext from '../Context/UserContext';

import Navbar from './Navbar/Navbar';
import TodoList from "./todo-list";
import EditTodo from "./edit-todo";
import CreateTodo from "./create-todo";

function Notes() {
    return (
        <Router>
            <Navbar />
            {/* <TodoList /> */}
            <Route path="/notes" exact component={TodoList} />
            <Route path="/notes/edit/:id" exact component={EditTodo} />
            <Route path="/notes/create" exact component={CreateTodo} />
        </Router>
    );
}

export default Notes;
