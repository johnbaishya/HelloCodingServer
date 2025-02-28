import express,{ Router,Request,Response } from "express";
import clockMeRoutes from "./modules/ClockMe/routes";
import getMealRoutes from "./modules/GetMeal/routes";
import verifyToken from "./middleware/auth";
import commonRoutes from "./modules/Common/routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { userLogin, userRegister } from "./controllers/authController";
import { addCourse, listCourse } from "./controllers/CourseController";
import { addlevel, listLevelsByCourse } from "./controllers/LevelController";
import verifyAdmin from "./middleware/verifyAdmin";
import { addLanguage, listLanguage } from "./controllers/languageController";
import { addPlatform, listPlatform } from "./controllers/PlatformController";
import uploadMdFile from "./middleware/uploadMdFile";
import { uploadImage } from "./services/ImageHandler";
import { addModule, listModuleByCourse } from "./controllers/moduleController";
// const router  = Router();


const authRouter = Router();
const protectedRouter = Router();
const adminRouter = Router();


authRouter.post("/login", userLogin)
authRouter.post("/register",userRegister)

// authorized routes
protectedRouter.use(verifyToken);
protectedRouter.get("/course",listCourse);
protectedRouter.get("/platform",listPlatform);
protectedRouter.get("/language",listLanguage)
protectedRouter.get("/course/:id/module",listModuleByCourse);
protectedRouter.get("/course/:id/level",listLevelsByCourse);

// admin routes
adminRouter.use([verifyToken,verifyAdmin]);
adminRouter.post("/course",uploadImage.single("image"),addCourse);
adminRouter.post("/language",addLanguage);
adminRouter.post("/platform",addPlatform);
adminRouter.post("/level",addlevel);
adminRouter.post("/module",uploadMdFile.single("file"),addModule);



// router.use("/clockme",verifyToken,clockMeRoutes)
// router.use("/getmeal",getMealRoutes )
// router.use("/",commonRoutes)

const appRoutes = Router();
appRoutes.use(authRouter)
appRoutes.use(protectedRouter)
appRoutes.use(adminRouter)


// response for unidentified routes
// appRoutes.use((req, res) => {
//     res.status(404).json({ message: "Route not found" });
// });


export default authRouter;