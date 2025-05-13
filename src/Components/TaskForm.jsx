import React, { useState, useContext } from 'react';
import TaskContext from '../Components/TaskContext';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const { dispatch } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch({ type: 'ADD_TASK', payload: { title, completed: false } });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
}
