import * as React from 'react';

export interface TaskContextType {
  tasks: string[];
  addTask: (task: string) => void;
}
const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

export default TaskContext;