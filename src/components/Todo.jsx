import React, { useState } from 'react';
import '../styles/Todo.css';
import _debounce from 'lodash/debounce';

export default function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(props.task);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        props.editNote(editedTask);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedTask(props.task);
        setIsEditing(false);
    };

    const handleChange = _debounce((e) => {
        setEditedTask(e.target.value);
    }, 300);

    const handleToggleDone = () => {
        props.toggleDone();
    };

    return (
        <div className={`parent-container ${props.isDone ? 'done' : ''}`}>
            <div className='job-container'>
                <div className="task-content">
                    {isEditing ? (
                        <input type="text" value={editedTask} onChange={handleChange} />
                    ) : (
                        <p className={props.isDone ? 'task-done' : ''}>{props.task}</p>
                    )}
                </div>
                <div className="button-group">
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveEdit}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleEdit} disabled={props.isDone}>Edit</button>
                            <button onClick={handleToggleDone}>{props.isDone ? 'Undone' : 'Done'}</button>
                            <button onClick={props.deleteTask}>Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
