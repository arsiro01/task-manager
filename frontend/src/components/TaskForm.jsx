import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskForm.css'; // Import CSS file for TaskForm component

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, dueDate };
    try {
      await axios.post('http://localhost:5000/tasks', newTask);
      navigate('/'); // Navigate back to the home page after adding task
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-form">
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-control"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
        ></textarea>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
