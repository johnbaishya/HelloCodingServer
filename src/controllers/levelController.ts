import { Response } from "express";
import { UserRequest } from "../Types/request";
import { sendErrorResponse, sendResponseWithMessage, sendSuccessResponse } from "../libs/reqres";
import Course from "../models/Course";
import { MulterImageFile } from "../Types/FileTypes";
import Level from "../models/Level";
import { LevelReqBody } from "../Types/reqBodyTypes";
import UserProgress from "../models/UserProgress";


// 1- addLevel
// 2- list course levels
// 3- delete level
// 4 - update level
export const addlevel = async(req:UserRequest,res:Response)=>{
    try {
        const {name,label,description,index,course_id}:LevelReqBody = req.body;
        const level = await Level.create({
            name,label,description,index,course_id
        });
        sendSuccessResponse(res,level);
    } catch (error) {
        console.log("error from addLevel",error);
        sendErrorResponse(res,error); 
    }
}


export const listLevelsByCourse = async(req:UserRequest,res:Response)=>{
    try {
        const courseId = req.params.id;
        const levels = await Level.find({course_id:courseId});
       
        sendSuccessResponse(res,levels);
    } catch (error) {
        console.log("error from listLevelByCourse",error);
        sendErrorResponse(res,error);
    }
}



export const updateLevel  = async(req:UserRequest,res:Response)=>{
    try {
        const levelid = req.params.id;
        const level = await Level.findByIdAndUpdate(levelid,req.body,{new:true})
        sendSuccessResponse(res,level);
    } catch (error) {
        console.log("error from updatelevel",error);
        sendErrorResponse(res,error);
    }
}



export const deleteLevel = async(req:UserRequest,res:Response)=>{
    try {
        let levelId = req.params.id;
        await Level.findByIdAndDelete(levelId);
        sendResponseWithMessage(res,200,"level deleted successfully")
    } catch (error) {
        console.log("error from deleteLevel",error);
        sendErrorResponse(res,error);
    }
}