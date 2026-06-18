import * as React from 'react';
import useTaskContext from '../../hooks/useTaskContext';

import styles from './TaskList.module.scss';

const TaskList = (): JSX.Element => {
  const { tasks } = useTaskContext();
  // Memoize the sorted list so it only re-sorts when tasks change
  const sortedTasks = React.useMemo(() => {
    console.log('Sorting tasks...');
    return [...tasks].sort((a, b) => a.localeCompare(b));
  }, [tasks]);
  return (
    <ul className={styles.taskList}>
      {sortedTasks.map((task, index) => (
        <li key={index}>{task}</li>
      ))}
    </ul>
  );
};

export default TaskList;
