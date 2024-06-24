import React, { useState } from 'react';
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
    // State to track if the todo item is editable
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    // State to store the current todo message
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    // Extracting functions from the useTodo context
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();

    // Function to handle editing the todo
    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false); // Exit edit mode
    };

    // Function to handle toggling the completed status
    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            {/* Checkbox to mark todo as completed */}
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            {/* Input field to display and edit the todo message */}
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable} // Only editable when in edit mode
            />
            {/* Edit/Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return; // Disable editing if todo is completed

                    if (isTodoEditable) {
                        editTodo(); // Save the edited todo
                    } else setIsTodoEditable((prev) => !prev); // Toggle edit mode
                }}
                disabled={todo.completed} // Disable button if todo is completed
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
