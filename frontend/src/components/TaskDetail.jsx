import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';
import '../styles/TaskDetail.css'; // Import CSS file for TaskDetail component
import { Link } from 'react-router-dom'; // Import Link or NavLink for navigation

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error(`Error fetching task ${id}:`, error);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      navigate('/'); // Use navigate to redirect after deletion
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
    }
  };

  return (
    <div className="task-detail">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="task-actions">
        <Link to={`/edit/${id}`} className="btn btn-primary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default TaskDetail;
