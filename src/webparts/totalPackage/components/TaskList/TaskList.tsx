import * as React from 'react';
import TaskContext from '../../hooks/TaskContext';

import styles from './TaskList.module.scss';

const TaskList = () => {
  const context = React.useContext(TaskContext);
  if (!context) return null;
  const { tasks } = context;
  return (
    <ul className={styles.taskList}>
      {tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );
};

export default TaskList;
