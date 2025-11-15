import * as React from 'react';

import type { TaskContextType } from './TaskContext';


const useTasks = () : TaskContextType => {
  const [tasks, setTasks] = React.useState<string[]>([]);

  const addTask = React.useCallback((task: string) => {
    setTasks(prevTasks => [...prevTasks, task]);
  }, []);

  return { tasks, addTask };
};

export default useTasks;
