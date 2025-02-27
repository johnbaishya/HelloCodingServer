import { Response } from "express";
import { UserRequest } from "../Types/request";
import UserProgress from "../models/UserProgress";
import { sendErrorResponse, sendSuccessResponse } from "../libs/reqres";
import { UserProgressReqBody } from "../Types/reqBodyTypes";



export const recordUserProgress = async(req:UserRequest,res:Response)=>{
    try {
        let {course_id,latest_completed_module,latest_module_id}:UserProgressReqBody = req.body;
        const userId = req.user?.id;
        const oldRecord = await UserProgress.findOne({user_id:userId,course_id:course_id});
        // check if user doesnt have any progress with this course
        if(!oldRecord){
            let progress = await UserProgress.create({user_id:userId,...req.body});
            sendSuccessResponse(res,progress);
            return;
        }


        // check if user has reattemped previously completed module
        if(oldRecord.latest_completed_module<latest_completed_module){
            const updatedRecord  = await UserProgress.findByIdAndUpdate(oldRecord.id,req.body,{new:true});
            sendSuccessResponse(res,updatedRecord);
            return;
        }

    } catch (error) {
        console.log("error from recorduserProgress",error);
        sendErrorResponse(res,error);
    }
}