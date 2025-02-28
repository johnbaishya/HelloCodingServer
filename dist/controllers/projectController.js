"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProject = void 0;
const reqres_1 = require("../libs/reqres");
const Project_1 = __importDefault(require("../models/Project"));
const addProject = (req, res) => {
    var _a;
    try {
        const { title, description, platform_id, files } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const project = Project_1.default.create({
            title, description, platform_id, files, user_id: userId,
        });
        (0, reqres_1.sendSuccessResponse)(res, project);
    }
    catch (error) {
        console.log("error frokm addProject", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
};
exports.addProject = addProject;
