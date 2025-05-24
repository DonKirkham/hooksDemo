import * as React from 'react';
import TaskContext from '../../hooks/TaskContext';

import styles from './TaskSummary.module.scss';

const TaskSummary = () => {
  const context = React.useContext(TaskContext);
  if (!context) return null;
  const { tasks } = context;
  return <p className={styles.taskSummary}>You have {tasks.length} tasks</p>;
};

export default TaskSummary;
