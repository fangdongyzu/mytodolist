import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Todo.css';
import _debounce from 'lodash/debounce';

export default function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(props.task);
    const [tempTask, setTempTask] = useState(props.task);

    useEffect(() => {
        setEditedTask(props.task);
        setTempTask(props.task);
    }, [props.task]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (editedTask.trim().length > 0) {
            props.editNote(editedTask);
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedTask(props.task);
        setTempTask(props.task);
        setIsEditing(false);
    };

    const debouncedChange = useCallback(
        _debounce((value) => {
            setEditedTask(value);
        }, 300),
        [] // empty array means this effect doesn't depend on any values from props or state
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setTempTask(value);
        debouncedChange(value);
    };

    const handleToggleDone = () => {
        props.toggleDone();
    };

    return (
        <div className={`parent-container ${props.isDone ? 'done' : ''}`}>
            <div className='job-container'>
                <div className="task-content">
                    {isEditing ? (
                        <input type="text" value={tempTask} onChange={handleChange} />
                    ) : (
                        <p className={props.isDone ? 'task-done' : ''}>{props.task}</p>
                    )}
                </div>
                <div className="button-group">
                    {isEditing ? (
                        <>
                            <button onClick={handleSaveEdit} disabled={editedTask.trim().length === 0}>Save</button>
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
