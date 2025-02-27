import { NextFunction, Request,Response } from "express";
import {UserRequest } from "../Types/request";
import { sendResponseWithMessage } from "../libs/reqres";




const verifyAdmin = (req:UserRequest, res:Response, next:NextFunction) => {
  let isAdmin = false;
  if(req.user?.role == "admin"){
    isAdmin = true;
  };

  if(isAdmin){
    return next();
  }else{
    sendResponseWithMessage(res,401,"only admin is authorized for this rooute");
    return;
  }
};

export default verifyAdmin;


