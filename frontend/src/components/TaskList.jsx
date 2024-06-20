import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskList.css'; // Import CSS file for TaskList component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="task-list">
      <h1>Task List</h1>
      <Link to="/add" className="add-link">Add Task</Link>
      <ul className="task-items">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <Link to={`/task/${task._id}`} className="task-title">{task.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
