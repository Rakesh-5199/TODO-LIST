import React, { useState,useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksfilter, settasksfilter] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const handleNameChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewTaskDescription(e.target.value);
  };
  useEffect(()=>{
if(filter === 'completed'){
const filter_data =tasks.filter((ie)=> ie.status == 'completed')
settasksfilter(filter_data)
}
else if (filter === 'notCompleted'){
  const filter_data =tasks.filter((ie)=> ie.status == 'notCompleted')
  settasksfilter(filter_data)
  }
  else{

    settasksfilter(tasks)
  }


  },[filter,tasks])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskName.trim() !== '' && newTaskDescription.trim() !== '') {
      setTasks([...tasks, { 
        id: tasks.length + 1,
        name: newTaskName,
        description: newTaskDescription,
        completed: false,
        status: 'completed'
      
      }]);
      setNewTaskName('');
      setNewTaskDescription('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEdit = (id, newName, newDescription) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, name: newName, description: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };


  const handleopstion = (task) => {
    const id = task.id
    const  tempdata =[]
   tasks.map((ie)=>{
if(ie.id == id){
  const value ={
    id: ie.id,
    name:ie.name,
    description: ie.description,
    completed: ie.completed,
    status:ie.status  == "completed" ? "notCompleted" :  "completed"
  }
  tempdata.push(value)
}
else{
  tempdata.push(ie)
}

   });
   
   
    // console.log(tempdata,"tempdata")
  
    setTasks(tempdata)
  };
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'notCompleted') return !task.completed;
    return true;
  });
console.log(tasksfilter,"tasksfilter")
// console.log(filter,"filter")
  return (
    <div className='main'>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input className="name" value={newTaskName} onChange={handleNameChange} placeholder="Todo Name" />
        <input className="text" value={newTaskDescription} onChange={handleDescriptionChange} placeholder="Todo Description" />
        <button className="submit">Add Todo</button>
      </form>
  
      <div>
        <div className='filter'>
          <div><h3>My Todos</h3></div>
          <div> <label>Status Filter:</label>
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="notCompleted">Not Completed</option>
    </select></div>
         {/* Placed before the label */}
   
        </div>
      </div>



      <div className="todo-container">
        {tasksfilter.map(task => (
          <div key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
               <select value={task.status} onChange={(e) => handleopstion(task)}>
        
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
          
              
        
            <div className="todo-content">
              <strong>Name: {task.name}</strong> {/* Inserting Name label */}
              <p>Description: {task.description}</p> {/* Inserting Description label */}
            </div>
            <div className="todo-actions">
              <button className="edit-button" onClick={() => handleEdit(task.id, prompt("Edit name:", task.name), prompt("Edit description:", task.description))}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
