import { Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../libs/reqres";
import Project from "../models/Project";
import { UserRequest } from "../Types/request";



export const addProject = (req:UserRequest,res:Response)=>{
    try {
        const {title,description,platform_id,files} = req.body;
        const userId = req.user?.id;
        const project = Project.create({
            title,description,platform_id,files,user_id:userId,
        });
        sendSuccessResponse(res,project)
    } catch (error) {
        console.log("error frokm addProject",error);
        sendErrorResponse(res,error);
    }
}