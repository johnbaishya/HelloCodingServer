import { Response } from "express";
import { UserRequest } from "../Types/request";
import { sendErrorResponse, sendResponseWithMessage, sendSuccessResponse } from "../libs/reqres";
import Platform from "../models/Platform";
import { PlatformReqBody } from "../Types/reqBodyTypes";


export const addPlatform = async(req:UserRequest,res:Response)=>{
    try {
        const {name,label,description}:PlatformReqBody = req.body;
        const platform = await Platform.create({
            name,label,description
        });
        sendSuccessResponse(res,platform);
    } catch (error) {
        console.log("error from addplatform",error);
        sendErrorResponse(res,error); 
    }
}


export const listPlatform = async(req:UserRequest,res:Response)=>{
    try {
        const platforms = await Platform.find();
        sendSuccessResponse(res,platforms);
    } catch (error) {
        console.log("error from listPlatforms",error);
        sendErrorResponse(res,error);
    }
}


export const deletePlatform = async(req:UserRequest,res:Response)=>{
    try {
        let platformId = req.params.id;
        await Platform.findByIdAndDelete(platformId);
        sendResponseWithMessage(res,200,"platform deleted successfully")
    } catch (error) {
        console.log("error from deletePlatform",error);
        sendErrorResponse(res,error);
    }
}