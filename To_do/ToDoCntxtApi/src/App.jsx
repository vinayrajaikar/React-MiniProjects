import React, { useEffect, useState } from 'react';
import { TodoProvider } from './contexts';
import { TodoForm, TodoItem } from './components';

const App = () => {
    // State to hold the list of todos
    const [todos, setTodos] = useState([]);

    // Function to add a new todo
    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    // Function to update an existing todo
    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
    };

    // Function to delete a todo by id
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // Function to toggle the completion status of a todo
    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
            )
        );
    };

    // Load todos from local storage when the component mounts
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem('todos'));
        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    // Save todos to local storage whenever the todos state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Form to add a new todo */}
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/* Render each todo item */}
                        {todos.map((todo) => (
                            <div key={todo.id} className="w-full">
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TodoProvider>
    );
};

export default App;
