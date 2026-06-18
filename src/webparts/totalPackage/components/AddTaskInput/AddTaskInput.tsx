import * as React from 'react';
import useTaskContext from '../../hooks/useTaskContext';

import styles from './AddTaskInput.module.scss';

const AddTaskInput = (): JSX.Element => {
  const { addTask } = useTaskContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleAddTask = (): void => {
    if (inputRef.current && inputRef.current.value) {
      addTask(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className={styles.addTaskInput}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter task"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskInput;
