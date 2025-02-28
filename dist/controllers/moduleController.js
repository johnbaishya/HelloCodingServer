"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModule = exports.listModuleByCourse = void 0;
const Module_1 = require("../models/Module");
const reqres_1 = require("../libs/reqres");
const UserProgress_1 = __importDefault(require("../models/UserProgress"));
const listModuleByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const courseId = req.params.id;
        const modules = yield Module_1.Module.find({ course_id: courseId }).lean();
        const userProgress = yield UserProgress_1.default.findOne({ course_id: courseId, user_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        // get the latest completed module by user;
        let completedModule = userProgress ? userProgress.latest_completed_module : 0;
        const responseModules = modules.map((item, index) => {
            return Object.assign(Object.assign({}, item), { completed: item.index <= completedModule, unlocked: item.index <= completedModule + 1 });
        });
        (0, reqres_1.sendSuccessResponse)(res, responseModules);
    }
    catch (error) {
        console.log("error from listModules", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.listModuleByCourse = listModuleByCourse;
const addModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        let { name, label, description, index, course_id, level_id, type } = req.body;
        let content = null;
        if (!type)
            type = "common";
        if (type == "common" && !file) {
            (0, reqres_1.sendErrorResponse)(res, "please add content file with markdown format");
            return;
        }
        if (file) {
            let doc = file;
            content = doc.location;
        }
        let module = null;
        let newModuleData = { name, label, description, index, course_id, level_id, content };
        if (type == "common") {
            module = yield Module_1.Module.create(newModuleData);
        }
        else if (type == "quiz") {
            const { question, options, correct_answer, type } = req.body;
            module = yield Module_1.QuizModule.create(Object.assign(Object.assign({}, newModuleData), { question, options, correct_answer }));
        }
        else {
            (0, reqres_1.sendErrorResponse)(res, "Invalid module type");
            return;
        }
        (0, reqres_1.sendSuccessResponse)(res, module);
        return;
    }
    catch (error) {
        console.log("error from add Module", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.addModule = addModule;
