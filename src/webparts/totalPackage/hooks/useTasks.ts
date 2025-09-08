import * as React from 'react';

const useTasks = () : { tasks: string[]; addTask: (task: string) => void; } => {
  const [tasks, setTasks] = React.useState<string[]>([]);

  const addTask = React.useCallback((task: string) => {
    setTasks(prevTasks => [...prevTasks, task]);
  }, []);

  return { tasks, addTask };
};

export default useTasks;
