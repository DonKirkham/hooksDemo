/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';
import TaskContext from '../../hooks/TaskContext';

import styles from './TaskList.module.scss';

const TaskList = (): JSX.Element | null => {
  const taskContext = React.useContext(TaskContext);
  if (!taskContext) return null;  
  return (
    <ul className={styles.taskList}>
      {taskContext.tasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );  
};

export default TaskList;
