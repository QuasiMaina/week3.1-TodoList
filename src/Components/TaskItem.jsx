import React, { useContext, useState } from 'react';
import TaskContext from '../Components/TaskContext';

export default function TaskItem({ task }) {
  const { dispatch } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleUpdate = () => {
    if (title.trim()) {
      dispatch({ type: 'UPDATE_TASK', payload: { ...task, title } });
      setIsEditing(false);
    }
  };

  return (
    <li className="flex justify-between items-center bg-white p-3 rounded shadow">
      {isEditing ? (
        <input
          type="text"
          className="flex-grow border-b border-blue-400 mr-2 outline-none px-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
          autoFocus
        />
      ) : (
        <span
          className={`flex-grow cursor-pointer ${
            task.completed ? 'line-through text-gray-400' : ''
          }`}
          onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id })}
        >
          {task.title}
        </span>
      )}
      <div className="flex items-center gap-2 ml-2">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => setIsEditing(true)}
        >
          ✎
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
        >
          ✕
        </button>
      </div>
    </li>
  );
}
