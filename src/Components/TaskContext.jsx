import React, { createContext, useReducer, useEffect } from 'react';

const TaskContext = createContext();
const API_BASE = 'https://jsonplaceholder.typicode.com/todos';

const initialState = {
  tasks: [],
  filter: 'all',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.payload.id ? action.payload : t)),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`${API_BASE}?_limit=10`);
      const data = await res.json();
      dispatch({ type: 'SET_TASKS', payload: data });
    };
    fetchTasks();
  }, []);

  // CRUD actions
  const enhancedDispatch = async (action) => {
    switch (action.type) {
      case 'ADD_TASK': {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.payload),
        });
        const newTask = await res.json();
        dispatch({ type: 'ADD_TASK', payload: newTask });
        break;
      }
      case 'UPDATE_TASK': {
        await fetch(`${API_BASE}/${action.payload.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.payload),
        });
        dispatch(action);
        break;
      }
      case 'DELETE_TASK': {
        await fetch(`${API_BASE}/${action.payload}`, {
          method: 'DELETE',
        });
        dispatch(action);
        break;
      }
      case 'TOGGLE_COMPLETE': {
        const task = state.tasks.find(t => t.id === action.payload);
        const updated = { ...task, completed: !task.completed };
        await fetch(`${API_BASE}/${task.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: updated.completed }),
        });
        dispatch({ type: 'UPDATE_TASK', payload: updated });
        break;
      }
      default:
        dispatch(action);
    }
  };

  return (
    <TaskContext.Provider value={{ state, dispatch: enhancedDispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;