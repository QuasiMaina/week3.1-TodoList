import React, { useContext } from 'react';
import TaskContext from '../Components/TaskContext';
import TaskItem from './TaskItem';

 function TaskList() {
  const { state } = useContext(TaskContext);

  const filteredTasks = state.tasks.filter((task) => {
    if (state.filter === 'completed') return task.completed;
    if (state.filter === 'pending') return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No tasks to show.</p>;
  }

  return (
    <ul className="space-y-2">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}


export default TaskList