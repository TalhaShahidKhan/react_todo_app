import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Fetch todos from JSONPlaceholder API on component mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTodos(response.data.slice(0, 10))) // Fetch first 10 todos
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoObj = { id: Date.now(), title: newTodo, completed: false };
      setTodos([newTodoObj, ...todos]);
      setNewTodo('');
    }
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle completion status
  const toggleCompletion = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Start editing a todo
  const startEditing = (id, title) => {
    setEditingTodoId(id);
    setEditingTitle(title);
  };

  // Save edited todo
  const saveTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, title: editingTitle } : todo
      )
    );
    setEditingTodoId(null);
    setEditingTitle('');
  };

  return (
    <div className='min-h-[70vh] p-4 container mx-auto my-3 rounded-xl bg-transparent flex items-center justify-start flex-col gap-8'>
      <div>
        <h1 className='my-5 p-3 text-white font-extrabold text-3xl'>Make Your Todo List</h1>
      </div>

      {/* Input for adding new todo */}
      <div className='w-full'>
        <div className="w-1/2 mx-auto">
          <div className="relative">
            <input
              type="text"
              id="task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your task"
            />
            <button
              onClick={addTodo}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Table to display todos */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-xl rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3 text-center">Task</th>
              <th scope="col" className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(todo.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  {editingTodoId === todo.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="border p-2 rounded-lg"
                    />
                  ) : (
                    <span className={todo.completed ? 'line-through text-wrap' : 'text-wrap'}>{todo.title}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {editingTodoId === todo.id ? (
                    <button
                      onClick={() => saveTodo(todo.id)}
                      className="text-green-600 hover:underline mx-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(todo.id, todo.title)}
                      className="text-blue-600 hover:underline mx-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-600 hover:underline mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
