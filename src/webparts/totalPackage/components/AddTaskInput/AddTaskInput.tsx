import * as React from 'react';
import TaskContext from '../../hooks/TaskContext';

import styles from './AddTaskInput.module.scss';

const AddTaskInput = () => {
  const context = React.useContext(TaskContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  if (!context) return null;
  const { addTask } = context;
  const handleAddTask = () => {
    if (inputRef.current && inputRef.current.value) {
      addTask(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
