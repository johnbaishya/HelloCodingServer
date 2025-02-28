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
exports.deleteLevel = exports.updateLevel = exports.listLevelsByCourse = exports.addlevel = void 0;
const reqres_1 = require("../libs/reqres");
const Level_1 = __importDefault(require("../models/Level"));
// 1- addLevel
// 2- list course levels
// 3- delete level
// 4 - update level
const addlevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, label, description, index, course_id } = req.body;
        const level = yield Level_1.default.create({
            name, label, description, index, course_id
        });
        (0, reqres_1.sendSuccessResponse)(res, level);
    }
    catch (error) {
        console.log("error from addLevel", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.addlevel = addlevel;
const listLevelsByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const levels = yield Level_1.default.find({ course_id: courseId });
        (0, reqres_1.sendSuccessResponse)(res, levels);
    }
    catch (error) {
        console.log("error from listLevelByCourse", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.listLevelsByCourse = listLevelsByCourse;
const updateLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levelid = req.params.id;
        const level = yield Level_1.default.findByIdAndUpdate(levelid, req.body, { new: true });
        (0, reqres_1.sendSuccessResponse)(res, level);
    }
    catch (error) {
        console.log("error from updatelevel", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.updateLevel = updateLevel;
const deleteLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let levelId = req.params.id;
        yield Level_1.default.findByIdAndDelete(levelId);
        (0, reqres_1.sendResponseWithMessage)(res, 200, "level deleted successfully");
    }
    catch (error) {
        console.log("error from deleteLevel", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.deleteLevel = deleteLevel;
