import React, { useState } from 'react';

function InputForm(props) {
    const [name, setName] = useState('');
    const [priority, setPriority] = useState('1');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handlePriorityChange(e) {
        setPriority(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(name === '') return;
        props.addTask(name, priority);
        setName('');
        setPriority('1');
    }
    
    return (
        <form className='panel panel-default' onSubmit={handleSubmit}>
            <div className='panel-heading'>Add New Todo</div>
            <div className='panel-body'>
                <div className='form-group'>
                    <label htmlFor='desc1'><strong>I want to...</strong></label>
                    <textarea 
                        className='create-todo-text form-control' 
                        name='desc1' 
                        type='text'
                        id='desc1' 
                        placeholder='Add an item'
                        value={name}
                        onChange={handleNameChange}
                    ></textarea>
                </div>
    
                <div className='form-group'>
                    <label htmlFor='sel1'><strong>How much of a priority is this?</strong></label>
                    <select 
                        className='create-todo-priority form-control' 
                        name='sel1' 
                        type='select'
                        id='sel1' 
                        value={priority}
                        onChange={handlePriorityChange}>
                            <option value='1'>Select a Priority</option>
                            <option value='2'>High Priority</option>
                            <option value='3'>Medium Priority</option>
                            <option value='4'>Low Priority</option>
                    </select>
                </div>
            </div>
    
            <div className='panel-footer'>
                <button className='create-todo btn btn-success btn-block'  type='submit'>Add</button>
            </div>
        </form>
    );
}

export default InputForm;