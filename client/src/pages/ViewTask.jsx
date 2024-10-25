import React from 'react'
import { useState } from "react";
import Navigation from "../components/Navigation";
import { toast } from "react-hot-toast";


const ViewTask = () => {
    const [task, setTask] = useState({ numID: null, name: null, date: null });

    const viewTask = async (event) => {
        try {
            event.preventDefault()
            const taskID = document.querySelector("#taskID").value;
            const res = await fetch(`http://localhost:8000/api/view-task/${taskID}`,
                {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });
            const data = await res.json();
            if (data) {
                console.log(data)
                setTask(data)
            } else {
                throw new Error;
            }

        } catch (error) {
            toast.error("Task does not exist")
        }
    }
    return (
        <>
            <Navigation />
            <div className="view_task todo_btn">
                {task.numID !== null && task.name !== null && task.date !== null ? (
                    <div className="view_task_by_id  view_all_tasks_card">
                        <p>Task ID: {task.numID}</p>
                        <p>Task Name: {task.name}</p>
                        <p>Task Date: {task.date}</p>
                    </div>
                ) : (
                    <div className="empty_div"></div>
                )}
                <form onSubmit={viewTask}>
                    <label>
                        ID:
                        <input id="taskID" />
                    </label>
                    <button type="submit">View Task</button>
                </form>
            </div>

        </>
    )
}

export default ViewTask