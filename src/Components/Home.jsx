import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import FilterBar from './FilterBar';

 function Home() {
  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <TaskForm />
      <FilterBar />
      <TaskList />
    </main>
  );
}



export default Home