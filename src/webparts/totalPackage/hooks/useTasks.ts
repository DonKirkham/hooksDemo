import * as React from 'react';
import type { TaskContextType } from './TaskContext';

const useTasks = (): TaskContextType => {
  const [tasks, setTasks] = React.useState<string[]>([]);
  const pageTitle = React.useRef(document.title);

  const addTask = React.useCallback((task: string) => {
    setTasks(prevTasks => [...prevTasks, task]);
  }, []);

  // Side effect: react to task changes and clean up on unmount
  React.useEffect(() => {
    document.title = tasks.length > 0 ? `(${tasks.length}) My TODO App` : pageTitle.current;
    console.log(`[useTasks] ${tasks.length} task(s)`);
    return () => {
      document.title = pageTitle.current;
    };
  }, [tasks]);

  return { tasks, addTask };
};

export default useTasks;
