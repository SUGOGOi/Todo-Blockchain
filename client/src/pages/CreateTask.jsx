import React from 'react'
import Navigation from "../components/Navigation";
import { toast } from "react-hot-toast";


const CreateTask = ({ state }) => {
    const createTask = async (event) => {
        event.preventDefault();
        console.log(state)
        const { contract, account } = state;
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        const showMessage = () => {
            toast.success("Task created!")
        }
        try {
            const res = await fetch("http://localhost:8000/api/create-task", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ taskDate: taskDate })
            })
            const data = await res.json()
            if (data.status === 200) {
                if (contract && contract.methods) {
                    await contract.methods.createTask(taskName, taskDate).send({ from: account })
                    showMessage()
                }
            } else {
                toast.error("Task cannot be added")
            }
        } catch (error) {
            toast.error(`Task already exists at ${taskDate}`)
        }
    }
    return (
        <>
            <Navigation />
            <div className="create_task todo_btn">
                <form onSubmit={createTask}>
                    <label>
                        Name:
                        <input id="taskName" />
                    </label>
                    <label>
                        Date:
                        <input id="taskDate" type="date" />
                    </label>
                    <button type="submit">Create Task</button>
                </form>
            </div>
        </>
    )
}

export default CreateTask