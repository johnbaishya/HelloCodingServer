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
exports.recordUserProgress = void 0;
const UserProgress_1 = __importDefault(require("../models/UserProgress"));
const reqres_1 = require("../libs/reqres");
const recordUserProgress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let { course_id, latest_completed_module, latest_module_id } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const oldRecord = yield UserProgress_1.default.findOne({ user_id: userId, course_id: course_id });
        // check if user doesnt have any progress with this course
        if (!oldRecord) {
            let progress = yield UserProgress_1.default.create(Object.assign({ user_id: userId }, req.body));
            (0, reqres_1.sendSuccessResponse)(res, progress);
            return;
        }
        // check if user has reattemped previously completed module
        if (oldRecord.latest_completed_module < latest_completed_module) {
            const updatedRecord = yield UserProgress_1.default.findByIdAndUpdate(oldRecord.id, req.body, { new: true });
            (0, reqres_1.sendSuccessResponse)(res, updatedRecord);
            return;
        }
    }
    catch (error) {
        console.log("error from recorduserProgress", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.recordUserProgress = recordUserProgress;
