
import * as React from 'react';
import useTasks from '../hooks/useTasks';
import TaskContext from '../hooks/TaskContext';
import AddTaskInput from './AddTaskInput/AddTaskInput';
import TaskSummary from './TaskSummary/TaskSummary';
import TaskList from './TaskList/TaskList';
import styles from './TotalPackage.module.scss';

export interface ITotalPackageProps {
}

const TotalPackage = (props: ITotalPackageProps) => {
  const taskState = useTasks();
  return (
    <TaskContext.Provider value={taskState}>
      <div className={styles.totalPackage}>
        <h2>My TODO App with Hooks</h2>
        <AddTaskInput />
        <TaskSummary />
        <TaskList />
      </div>
    </TaskContext.Provider>
  );
};

export default TotalPackage;

