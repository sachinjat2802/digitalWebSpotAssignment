import {Task}from "../../models/task.js";
import CrudOperations from "../../utils/crudOpertions/moongodbCrud.js";
class TaskController{

    async createTask(req,res){
        const data = req.body;
        if(data.name){
            const task = await new  CrudOperations(Task).getDocument({"name":data.name,"isDeleted":false});
            if(task){
                return res.status(400).json({
                    "msg":"task already exists"
                })
            }
        }
               
                const newtask = new Task(data);
                try{
                    const result = await new CrudOperations(Task).save(newtask)
                    res.status(201).json(
                        result
                     )
                    }
                catch(error){
                    res.status(201).json(
                         {
                             "msg":error.message
                         }
                     )
                }
    }

    async getTasks(req,res){
        try{
            const tasks = await new CrudOperations(Task).getAllDocuments({"isDeleted":false},{},{pageNo:0,limit:0})
            res.status(200).json(tasks)
        }
        catch(error){
            res.status(400).json(error.message)
        }
    }

    async updateTask(req,res){
        try{
            const data = req.body
            const task = await new CrudOperations(Task).getDocumentById(req.params.id);
            if(task.isDeleted){
                res.status(400).json("task already deleted")
            }
           const updatedTask=Object.assign(task,data);
           
           const result = await new CrudOperations(Task).updateDocument({_id:req.params.id},updatedTask);
           
            res.status(200).json(result)
        }
        catch(error){
            res.status(400).json(error.message)
        }

        
    }

    async deleteTask(req,res){
        try{
            const task = await new CrudOperations(Task).getDocumentById(req.params.id);
            if(task.isDeleted){
                res.status(400).json("task already deleted")
            }else{
                const result = await new CrudOperations(Task).updateDocument({_id:req.params.id},{isDeleted:true});
                res.status(200).json(result)
            }
        }catch(error){
            res.status(400).json(error.message)
        }

   
    
               
}

        
 

        
}
       

   

export const taskController = new TaskController();