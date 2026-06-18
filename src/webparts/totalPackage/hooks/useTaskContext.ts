import * as React from 'react';
import TaskContext, { type TaskContextType } from './TaskContext';

const useTaskContext = (): TaskContextType => {
  const context = React.useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskContext.Provider');
  }
  return context;
};

export default useTaskContext;
