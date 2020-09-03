import React, { useState } from 'react';
import InputForm from './components/InputForm';
import TodoItem from './components/TodoItem';
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name, priority) {
    const newTask = {
      id: 'todo-' + nanoid(),
      name: name, 
      completed: false, 
      priority: priority
    };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {
          ...task, 
          completed: !task.completed
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function updateTask(id, newName, newPriority) {
    const updatedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {
          ...task, 
          name: newName, 
          priority: newPriority
        }
      }
      return task;
    });
    setTasks(updatedTaskList);
  }

  const taskList = tasks.map(task => (
    <TodoItem 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} 
      priority={task.priority}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      updateTask={updateTask}
    />
  ));

  const welcomeView = (
    <li className='list-group-item list-group-item-info'>
      <p className='list-group-item-text'><strong>Welcome to Very Simple Todo App!</strong></p>
      <p className='list-group-item-text'>Get started now by adding a new todo on the left.</p>
    </li>
  );

  return (
    <div className='container'>
      <div className='page-header white'>
        <h1>Very Simple ToDo App</h1>
        <p className='lead'>Track all of the things</p>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <InputForm addTask={addTask} />
        </div>
        <div className='col-md-8'>
          <div className='panel panel-default'>
            <div className='panel-heading'>View Todos</div>
            <div className='panel-body no-padding'>
              <ul className='list-group no-margin'>
                {tasks.length > 0 ? taskList : welcomeView}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
