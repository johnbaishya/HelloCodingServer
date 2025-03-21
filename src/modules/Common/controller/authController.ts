



import User from "../../../models/User";
import {Request, Response} from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createToken } from "../../../libs/auth";
import { tokenParam } from "../../../Types/auth";
import { UserRequest } from "../../../Types/request";
import { UpdateUserReqBody } from "../../../Types/reqBodyTypes";
import { sendErrorResponse, sendResponseWithMessage, sendSuccessResponse } from "../../../libs/reqres";
import { MulterImageFile } from "../../../Types/FileTypes";





// for register=======================================================================================================


/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags: [Common]
 *     summary: User Register
 *     description: Register a user and return created user with token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: created user with token.
 *       500:
 *         description: some error.
 */
export const userRegister = async(req:Request, res:Response)=>{
     // Our register logic starts here
     try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
        // Validate user input
        if (!(email && password && first_name && last_name)) {
          res.status(400).send("All input is required");
          return;
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
           res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          first_name,
          last_name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const params:tokenParam = {
            id:user.id,
            email,
            first_name:user.first_name,
            last_name:user.last_name
        }

        const token  = createToken(params);
        
        // save user token
        let newUser  = {
            id:user.id,
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            token:token,
        };
    
        // return new user
        res.status(201).json(newUser);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
}
// register ends here ==============================================================================================



// for login  ======================================================================================================
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     operationId: userLogin
 *     tags: [Common]
 *     summary: User login
 *     description: Authenticate an employee and return a session token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: user detail with token.
 *       401:
 *         description: Invalid credentials.
 */
export const userLogin = async(req:Request,res:Response)=>{
  // Our login logic starts here
  try {
     // Get user input
     const { email, password } = req.body;
 
     // Validate user input
     if (!(email && password)) {
       res.status(400).send("All inputs are required");
     }
     // Validate if user exist in our database
     const user = await User.findOne({ email });
 
     if (user && (await bcrypt.compare(password, user.password as string))) {
       // Create token
     
     const params:tokenParam = {
         id:user.id,
         email,
         first_name:user.first_name,
         last_name:user.last_name
     }

     const token  = createToken(params);
 
       // save user token
       user.token = token;
       let newUser  = {
         id:user.id,
         first_name:user.first_name,
         last_name:user.last_name,
         email:user.email,
         token:token,
     };
 
       // user
       res.status(200).json(newUser);
     }else{
       res.status(400).send("Invalid Credentials");
     }
   } catch (err) {
     console.log(err);
   }
   // Our register logic ends here
}


/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     operationId: update user profile
 *     tags: [Common]
 *     summary: User profile update
 *     description: update the current user profile.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: updated user.
 *       401:
 *         description: Invalid credentials.
 */
export const updateUser = async(req:UserRequest,res:Response)=>{
  try {
    let {first_name,last_name}:UpdateUserReqBody = req.body;
    let newBody = {first_name,last_name}
    let userId = req.user?.id;
    if(!userId){
      sendResponseWithMessage(res,400,"user not found");
      return;
    }
    let uUser = await User.findByIdAndUpdate(userId,newBody,{new:true})
    sendSuccessResponse(res,uUser);
  } catch (error) {
    console.log("error from update User",error);
    sendErrorResponse(res,error);
  }
}

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Common]
 *     summary: user profile
 *     description: get the current user profile.
 *     responses:
 *       200:
 *         description: user.
 *       401:
 *         description: Invalid credentials.
 */
export const getUser = async(req:UserRequest,res:Response)=>{
  try {
    let userId = req.user?.id;
    if(!userId){
      sendResponseWithMessage(res,400,"user not found");
      return;
    }
    let uUser = await User.findById(userId)
    sendSuccessResponse(res,uUser);
  } catch (error) {
    console.log("error from get User",error);
    sendErrorResponse(res,error);
  }
}


/**
 * @swagger
 * /api/user/profile-pic:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags: [Common]
 *     summary: User profile picture update
 *     description: update the current user profile picture.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary # Indicates file upload in Swagger
 *     responses:
 *       200:
 *         description: updated user.
 *       401:
 *         description: Invalid credentials.
 *     
 */
export const ChangeUserProfilePicture = async(req:UserRequest,res:Response) =>{
  try {
    let userId = req.user?.id;
    if(!userId){
      sendResponseWithMessage(res,400,"user not found");
      return;
    }
    let file = req.file;
    if(!file){
      return;
    }
    let image = file as MulterImageFile;
    let uUser = await User.findByIdAndUpdate(userId,{profile_pic:image.location},{new:true})
    sendSuccessResponse(res,uUser);
  } catch (error) {
    console.log("error from changeUserProfilePicture");
    sendErrorResponse(res,error);
  }
}








// to check if the token present in the header is valid or not
/**
 * @swagger
 * /api/user/verify-token:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Common]
 *     summary: user authentication status
 *     description: check if the provided bearer token is valid
 *     responses:
 *       200:
 *         description: token is valid.
 *       401:
 *         description: Invalid token.
 */
export const verifyAuthentication = (req:UserRequest,res:Response)=>{
  try {
      sendResponseWithMessage(res,200,"token is valid");
  } catch (error) {
      sendResponseWithMessage(res,401,"invalid token");
  }
}
