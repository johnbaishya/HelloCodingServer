import { Response } from "express";
import { UserRequest } from "../Types/request";
import { Module, QuizModule } from "../models/Module";
import { sendErrorResponse, sendSuccessResponse } from "../libs/reqres";
import { ModuleReqBody, QuizModuleReqBody } from "../Types/reqBodyTypes";
import { MulterImageFile } from "../Types/FileTypes";
import UserProgress from "../models/UserProgress";



export const listModuleByCourse = async(req:UserRequest,res:Response)=>{
    try {
        const courseId = req.params.id;
        const modules  = await Module.find({course_id:courseId}).lean();
        const userProgress = await UserProgress.findOne({course_id:courseId, user_id:req.user?.id});
        // get the latest completed module by user;
        let completedModule:number = userProgress?userProgress.latest_completed_module:0
        const responseModules = modules.map((item,index)=>{
            return{
                ...item,
                completed:item.index<=completedModule,
                unlocked:item.index<=completedModule+1,
            }
        })
        sendSuccessResponse(res,responseModules);
    } catch (error) {
        console.log("error from listModules", error);
        sendErrorResponse(res,error);
    }
}



export const addModule = async(req:UserRequest,res:Response)=>{
    try {
        const file  = req.file;
        let {name,label,description,index,course_id,level_id,type} = req.body;
       
        let content = null;
        if(!type) type = "common";
        if(type == "common"&& !file){
            sendErrorResponse(res,"please add content file with markdown format");
            return;
        }
        if(file){
            let doc = file as MulterImageFile;
            content  = doc.location;
        }

        let module = null;
        let newModuleData = {name,label,description,index,course_id,level_id,content};
        if(type  == "common"){
            module = await Module.create(newModuleData);
        }else if (type == "quiz"){
            const {question,options,correct_answer,type} = req.body as QuizModuleReqBody;
            module = await QuizModule.create({...newModuleData,question,options,correct_answer})
        }else{
            sendErrorResponse(res,"Invalid module type");
            return;
        }
        sendSuccessResponse(res,module)
        return;
    } catch (error) {
        console.log("error from add Module",error);
        sendErrorResponse(res,error);
    }
}