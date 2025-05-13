import React, { useContext } from 'react';
import TaskContext from '../Components/TaskContext';
import App from '../App';

function FilterBar() {
  const { state, dispatch } = useContext(TaskContext);
  const filters = ['all', 'completed', 'pending'];

  return (
    <div className="flex justify-center gap-4 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            state.filter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}


export default FilterBar
