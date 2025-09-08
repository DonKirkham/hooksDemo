/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';
import TaskContext from '../../hooks/TaskContext';

import styles from './AddTaskInput.module.scss';

const AddTaskInput = (): JSX.Element | null => {
  const taskContext = React.useContext(TaskContext);
  const inputRef = React.useRef<HTMLInputElement>(null);
  if (!taskContext) return null;

  const handleAddTask = () : void => {
    if (inputRef.current && inputRef.current.value) {
      taskContext.addTask(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) : void => {
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
