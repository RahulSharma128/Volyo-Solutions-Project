import React from 'react';
import styles from './page.module.css';

const AddTask = ({ formState, onFormChange, onAddClick }) => {
  return (
    <div className={styles.todo}>
      <h3>Add Task</h3>
      <br />
      <div>
        <label>ID</label>
        <input
          type="text"
          name="ID"
          value={formState.ID}
          onChange={(e) => onFormChange('ID', e.target.value)}
        />
      </div>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="Title"
          value={formState.Title}
          onChange={(e) => onFormChange('Title', e.target.value)}
        />
      </div>
      <button onClick={onAddClick}>Add</button>
    </div>
  );
};

export default AddTask;
