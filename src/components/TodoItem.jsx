import React, { useState } from 'react';

export default function TodoItem(props) {
    const [isUpdating, setUpdating] = useState(false);
    const [newName, setNewName] = useState(props.name);
    const [newPriority, setNewPriority] = useState(props.priority);

    function handleNameChange(e) {
        setNewName(e.target.value);
    }

    function handlePriorityChange(e) {
        setNewPriority(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(newName === '') return;
        props.updateTask(props.id, newName, newPriority);
        setNewName('');
        setNewPriority('1');
        setUpdating(false);
    }
 
    const updatingTemplate = (
        <form className={FormColor(newPriority)} onSubmit={handleSubmit} id='update-form'>
            <div className='form-group'>
                <label htmlFor={props.id}><strong>Description</strong></label>
                <textarea 
                    className='update-todo-text form-control' 
                    name='desc2'
                    type='text' 
                    id={props.id}
                    value={newName}
                    onChange={handleNameChange}
                ></textarea>
            </div>

            <div className='form-group'>
                <label htmlFor={props.id}><strong>Priority</strong></label>
                <select 
                    className='update-todo-priority form-control' 
                    name='sel2' 
                    type='select'
                    id={props.priority}
                    value={newPriority}
                    onChange={handlePriorityChange}
                >
                    <option value='1'>Select a Priority</option>
                    <option value='2'>High Priority</option>
                    <option value='3'>Medium Priority</option>
                    <option value='4'>Low Priority</option>
                </select>
            </div>

            <div>
                <button className='update-todo btn btn-success pull-right' type='submit'>Save</button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className={TodoItemColor(props.priority)} id='view-template'>
            <label className='checkbox-inline list-group-item-text' htmlFor={props.id}>
                <input 
                    id={props.id} 
                    key={props.id} 
                    type='checkbox' 
                    value='1' 
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                /><strong className='check-label'>
                    {props.name}
                </strong>
            </label>
            
            <a 
                className='delete-todo pull-right' 
                href='#'
                onClick={() => props.deleteTask(props.id)}
            >
                <span className="glyphicon glyphicon-trash text-danger"></span>
            </a>

            <a 
                className='edit-todo pull-right' 
                href='#'
                onClick={() => setUpdating(true)}
            >
                <span className="glyphicon glyphicon-edit"></span>
            </a>
        </div>
    );

    function TodoItemColor(priority) {
        if (priority == 1) {
            return 'list-group-item-default'
        } else if (priority == 2) {
            return 'list-group-item-danger'
        } else if (priority == 3) {
            return 'list-group-item-warning'
        } else if (priority == 4) {
            return 'list-group-item-success'
        }
    }

    function FormColor(priority) {
        if (priority == 1) {
            return 'list-group-item-default clearfix'
        } else if (priority == 2) {
            return 'list-group-item-danger clearfix'
        } else if (priority == 3) {
            return 'list-group-item-warning clearfix'
        } else if (priority == 4) {
            return 'list-group-item-success clearfix'
        }
    }

    return (
        <li className='todo list-group-item'>
            {isUpdating ? updatingTemplate : viewTemplate}
        </li>
    );
}