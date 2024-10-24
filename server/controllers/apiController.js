import contract from '../contract/configContract.js'

export const viewTask = async (req,res,next) => {
    try {
        const { taskID } = req.params;
        const task = await contract.methods.viewTask(taskID).call();
        // console.log(task)
        const { id, name, date } = task;
        const numID = Number(id)
        return res.status(200).json({
            numID,
            name,
            date
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        });
    }
}

export const viewAllTask = async (req, res, next) => {
    try {
        const allTask = await contract.methods.allTask().call()

        if (!allTask) {
            return res.status(200).json({
                message: "0 task"
            })
        }

        const tasks = allTask.map(({id, name, date}) => {
            const numID = Number(id)
            return { numID, name , date}
        })

        return res.status(200).json({
            tasks
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        });
    }
}

export const createTask = async (req, res, next) => {
    try {
        await contract.methods.createTask("task3","14/10/24").send({from:"0x901B9338E461B679Cb70e6b205Dca82529AB2CA1"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        });
    }
}