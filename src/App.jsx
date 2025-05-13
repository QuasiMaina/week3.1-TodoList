import React from 'react';
import { TaskProvider } from './Components/TaskContext'
import Home from './Components/Home';

function App() {



  return (
    <TaskProvider>
      <Home />
    </TaskProvider>
  );
}


export default App







