/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';
import TaskContext from '../../hooks/TaskContext';

import styles from './TaskSummary.module.scss';

const TaskSummary = () : JSX.Element | null => {
  const taskContext = React.useContext(TaskContext);
  if (!taskContext) return null;
  return <p className={styles.taskSummary}>You have {taskContext.tasks.length} tasks</p>;
};

export default TaskSummary;
