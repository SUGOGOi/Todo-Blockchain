import contract from '../contract/configContract.js'

//<-----------------------ClashCheck----------------------->
const dateclashCheck=async(taskDate)=>{
    const tasks = await contract.methods.allTask().call();
    const foundTask = tasks.find(task=>task.date===taskDate);

    if(foundTask){
        return foundTask.name;
    }
    return "No Task Found";
}

//<-----------------------VIEW FUNCTIONS----------------------->
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


//<------------------------------WRITE FUNCTIONS------------------------------>
export const createTask=async(req,res)=>{
    const {taskDate}=req.body; 
    const task = await dateclashCheck(taskDate);
    try{
        if(task!=="No Task Found"){
            res.status(409).json({status:409,message:"Date clash:Task cannot be added"})
        }else{
            res.status(200).json({status:200,message:"Task can be added"})
        }
    }catch(error){
        console.error(error)
    }
}

export const updateTask = async(req, res)=>{
    const {taskDate}=req.body; 
    const task = await dateclashCheck(taskDate);
    try{
      if(task!=="No Task Found"){
         res.status(409).json({status:409,message:"Date clash:Task cannot be updated"})
      }else{
         res.status(200).json({status:200,message:"Task can be updated"})
      }
    }catch(error){
     console.error(error)
    }
}
