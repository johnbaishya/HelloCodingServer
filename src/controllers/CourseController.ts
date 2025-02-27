import { Response } from "express";
import { UserRequest } from "../Types/request";
import Language from "../models/Language";
import { sendErrorResponse, sendResponseWithMessage, sendSuccessResponse } from "../libs/reqres";
import Course from "../models/Course";
import { MulterImageFile } from "../Types/FileTypes";
import { CourseReqBody } from "../Types/reqBodyTypes";


export const addCourse = async(req:UserRequest,res:Response)=>{
    try {
        const {name,label,description}:CourseReqBody = req.body;
        let file = req.file;
        let imagePath = null;
        if(file){
           let image = file as MulterImageFile;
           imagePath  = image.location;
        }
        const course = await Course.create({
            name,label,description,image:imagePath,
        });
        sendSuccessResponse(res,course);
    } catch (error) {
        console.log("error from addCourse",error);
        sendErrorResponse(res,error); 
    }
}


export const listCourse = async(req:UserRequest,res:Response)=>{
    try {
        const courses = await Course.find();
        sendSuccessResponse(res,courses);
    } catch (error) {
        console.log("error from listCourse",error);
        sendErrorResponse(res,error);
    }
}


export const getCourseDetail = async(req:UserRequest,res:Response)=>{
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        sendSuccessResponse(res,course);
    } catch (error) {
        console.log("error from getCourseDetail",error);
        sendErrorResponse(res,error);
    }
}


export const deleteCourse = async(req:UserRequest,res:Response)=>{
    try {
        let courseId = req.params.id;
        await Course.findByIdAndDelete(courseId);
        sendResponseWithMessage(res,200,"course deleted successfully")
    } catch (error) {
        console.log("error from deleteCourse",error);
        sendErrorResponse(res,error);
    }
}