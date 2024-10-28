import { toast } from "react-hot-toast";
import Navigation from "../components/Navigation";
const UpdateTask = ({ state }) => {
    const { contract, account } = state;
    const updateTask = async (event) => {
        event.preventDefault();
        const taskName = document.querySelector("#taskName").value;
        const taskDate = document.querySelector("#taskDate").value;
        const taskID = document.querySelector("#taskID").value;

        try {
            const res = await fetch(
                "http://localhost:8000/api/update-task",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ taskDate: taskDate })
                }
            )
            const data = await res.json();
            if (data.status === 200) {
                await contract.methods.updateTask(taskID, taskName, taskDate).send({ from: account });
                toast.success(`Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`)
            } else {
                toast.error('Task cannot be updated because of date clash')
                throw new Error("Task cannot be updated because of date clash")
            }

        } catch (error) {
            toast.error(`Task can't be updated`)
            console.log(error)
        }
    }
    return (
        <>
            <Navigation />
            <div className="update_task todo_btn">
                <form onSubmit={updateTask}>
                    <label>
                        ID:
                        <input id="taskID" />
                    </label>
                    <label>
                        Name:
                        <input id="taskName" />
                    </label>
                    <label>
                        Date:
                        <input id="taskDate" type="date" />
                    </label>
                    <button type="submit">Update Task</button>
                </form>
            </div>
        </>
    );
}
export default UpdateTask;