import { Response } from "express";
import { UserRequest } from "../Types/request";
import Language from "../models/Language";
import { sendErrorResponse, sendResponseWithMessage, sendSuccessResponse } from "../libs/reqres";
import { LanguageReqBody } from "../Types/reqBodyTypes";


export const addLanguage = async(req:UserRequest,res:Response)=>{
    try {
        const {name,label,description}:LanguageReqBody = req.body;
        const language = await Language.create({
            name,label,description
        });
        sendSuccessResponse(res,language);
    } catch (error) {
        console.log("error from add language",error);
        sendErrorResponse(res,error); 
    }
}


export const listLanguage = async(req:UserRequest,res:Response)=>{
    try {
        const languages = await Language.find();
        sendSuccessResponse(res,languages);
    } catch (error) {
        console.log("error from listLanguages",error);
        sendErrorResponse(res,error);
    }
}


export const deleteLanguage = async(req:UserRequest,res:Response)=>{
    try {
        let languageId = req.params.id;
        await Language.findByIdAndDelete(languageId);
        sendResponseWithMessage(res,200,"language deleted successfully")
    } catch (error) {
        console.log("error from deleteLangauge",error);
        sendErrorResponse(res,error);
    }
}