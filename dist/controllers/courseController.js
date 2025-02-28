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
exports.deleteCourse = exports.getCourseDetail = exports.listCourse = exports.addCourse = void 0;
const reqres_1 = require("../libs/reqres");
const Course_1 = __importDefault(require("../models/Course"));
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, label, description } = req.body;
        let file = req.file;
        let imagePath = null;
        if (file) {
            let image = file;
            imagePath = image.location;
        }
        const course = yield Course_1.default.create({
            name, label, description, image: imagePath,
        });
        (0, reqres_1.sendSuccessResponse)(res, course);
    }
    catch (error) {
        console.log("error from addCourse", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.addCourse = addCourse;
const listCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find();
        (0, reqres_1.sendSuccessResponse)(res, courses);
    }
    catch (error) {
        console.log("error from listCourse", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.listCourse = listCourse;
const getCourseDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const course = yield Course_1.default.findById(courseId);
        (0, reqres_1.sendSuccessResponse)(res, course);
    }
    catch (error) {
        console.log("error from getCourseDetail", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.getCourseDetail = getCourseDetail;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courseId = req.params.id;
        yield Course_1.default.findByIdAndDelete(courseId);
        (0, reqres_1.sendResponseWithMessage)(res, 200, "course deleted successfully");
    }
    catch (error) {
        console.log("error from deleteCourse", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.deleteCourse = deleteCourse;
