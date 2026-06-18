import * as React from 'react';
import useTaskContext from '../../hooks/useTaskContext';

import styles from './TaskSummary.module.scss';

const TaskSummary = (): JSX.Element => {
  const { tasks } = useTaskContext();
  const count = tasks.length;
  return <p className={styles.taskSummary}>You have {count} {count === 1 ? 'task' : 'tasks'}</p>;
};

export default TaskSummary;
