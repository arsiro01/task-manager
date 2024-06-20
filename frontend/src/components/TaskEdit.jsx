import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskEdit.css'; // Import CSS file for TaskEdit component

const TaskEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.split('T')[0]); // Format date for input
      } catch (error) {
        console.error(`Error fetching task ${id}:`, error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, dueDate };
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      navigate(`/task/${id}`); // Use navigate instead of history.push
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
    }
  };

  return (
    <div className="task-edit">
      <h1>Edit Task</h1>
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
        <button type="submit" className="btn btn-primary">Update Task</button>
      </form>
    </div>
  );
};

export default TaskEdit;
