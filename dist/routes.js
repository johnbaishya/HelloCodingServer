"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./middleware/auth"));
const authController_1 = require("./controllers/authController");
const courseController_1 = require("./controllers/courseController");
const levelController_1 = require("./controllers/levelController");
const verifyAdmin_1 = __importDefault(require("./middleware/verifyAdmin"));
const languageController_1 = require("./controllers/languageController");
const platformController_1 = require("./controllers/platformController");
const uploadMdFile_1 = __importDefault(require("./middleware/uploadMdFile"));
const ImageHandler_1 = require("./services/ImageHandler");
const moduleController_1 = require("./controllers/moduleController");
// const router  = Router();
const authRouter = (0, express_1.Router)();
const protectedRouter = (0, express_1.Router)();
const adminRouter = (0, express_1.Router)();
authRouter.post("/login", authController_1.userLogin);
authRouter.post("/register", authController_1.userRegister);
// authorized routes
protectedRouter.use(auth_1.default);
protectedRouter.get("/course", courseController_1.listCourse);
protectedRouter.get("/platform", platformController_1.listPlatform);
protectedRouter.get("/language", languageController_1.listLanguage);
protectedRouter.get("/course/:id/module", moduleController_1.listModuleByCourse);
protectedRouter.get("/course/:id/level", levelController_1.listLevelsByCourse);
// admin routes
adminRouter.use([auth_1.default, verifyAdmin_1.default]);
adminRouter.post("/course", ImageHandler_1.uploadImage.single("image"), courseController_1.addCourse);
adminRouter.post("/language", languageController_1.addLanguage);
adminRouter.post("/platform", platformController_1.addPlatform);
adminRouter.post("/level", levelController_1.addlevel);
adminRouter.post("/module", uploadMdFile_1.default.single("file"), moduleController_1.addModule);
// router.use("/clockme",verifyToken,clockMeRoutes)
// router.use("/getmeal",getMealRoutes )
// router.use("/",commonRoutes)
const appRoutes = (0, express_1.Router)();
appRoutes.use(authRouter);
appRoutes.use(protectedRouter);
appRoutes.use(adminRouter);
// response for unidentified routes
appRoutes.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
exports.default = appRoutes;
