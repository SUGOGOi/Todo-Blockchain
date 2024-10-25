import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from "react-hot-toast";
import Navigation from '../components/Navigation';

const ViewAllTask = () => {

    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        const allTasks = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/view-all-task", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                })
                const data = await res.json();
                if (data) {
                    // console.log(data.tasks)
                    setTaskList(data.tasks)
                    toast.success("Data fetched")
                }
            } catch (error) {
                console.error(error)
                toast.error("Error, while fetching all tasks")
            }
        }
        allTasks();
    }, [])
    return (
        <>
            <Navigation />
            <div className='view_all_tasks' >
                {taskList.map((task) => {
                    return (
                        <div
                            className="view_all_tasks_card"
                            key={task.numID}
                            style={task.numID !== "" && task.name !== "" && task.date !== "" ? {} : { display: "none" }}
                        >
                            <p>{task.numID}</p>
                            <p>{task.name}</p>
                            <p>{task.date}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ViewAllTask