// Home.js
import React, { useEffect, useRef, useState } from 'react';
import { addDoc, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { notesCollection, db } from '../firebase';
import Todo from '../components/Todo.jsx';

export default function Home() {
    const messageRef = useRef();
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
            const tasksArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            tasksArr.sort((a, b) => b.updateTime - a.updateTime);
            setTaskList(tasksArr);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        // Define data outside the if block to ensure it's accessible in the try block
        let data = {};

        if (messageRef.current.value.length > 0) {
            data = {
                message: messageRef.current.value,
                createTime: Date.now(),
                updateTime: Date.now(),
                done: false // Initial done state
            };
        } else {
            // Handle the case where messageRef.current.value is empty or not valid
            return; // Optionally, you can add your own handling logic here
        }

        try {
            await addDoc(notesCollection, data);
            messageRef.current.value = "";
        } catch (e) {
            console.log(e);
            // Handle errors appropriately, such as displaying an error message
        }
    };

    async function deleteNote(noteId) {
        const docRef = doc(db, "notes", noteId);
        await deleteDoc(docRef);
    }

    async function editNote(newText, currentNoteId) {
        try {
            const docRef = doc(db, "notes", currentNoteId);
            await updateDoc(docRef, {
                message: newText,
                updateTime: Date.now()
            });
            console.log("Note edited successfully!");
        } catch (error) {
            console.error("Error editing note:", error);
        }
    }

    async function toggleDone(noteId, newValue) {
        try {
            const docRef = doc(db, "notes", noteId);
            await updateDoc(docRef, {
                done: newValue,
                updateTime: Date.now()
            });
            console.log("Task marked as done:", newValue);
        } catch (error) {
            console.error("Error toggling done state:", error);
        }
    }

    return (
        <div className='body-wrap'>
            <div className='center-form'>
                <form onSubmit={handleSave}>
                    <label htmlFor="text"></label>
                    <input id='text' ref={messageRef} type="text" placeholder='Enter your task here' />
                    <button type='submit'>Add</button>
                </form>
            </div>

            {taskList.map(task => (
                <Todo
                    key={task.id}
                    task={task.message}
                    isDone={task.done}
                    deleteTask={() => deleteNote(task.id)}
                    editNote={(newText) => editNote(newText, task.id)}
                    toggleDone={() => toggleDone(task.id, !task.done)}
                />
            ))}
        </div>
    );
}
