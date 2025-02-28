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
exports.deletePlatform = exports.listPlatform = exports.addPlatform = void 0;
const reqres_1 = require("../libs/reqres");
const Platform_1 = __importDefault(require("../models/Platform"));
const addPlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, label, description } = req.body;
        const platform = yield Platform_1.default.create({
            name, label, description
        });
        (0, reqres_1.sendSuccessResponse)(res, platform);
    }
    catch (error) {
        console.log("error from addplatform", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.addPlatform = addPlatform;
const listPlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platforms = yield Platform_1.default.find();
        (0, reqres_1.sendSuccessResponse)(res, platforms);
    }
    catch (error) {
        console.log("error from listPlatforms", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.listPlatform = listPlatform;
const deletePlatform = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let platformId = req.params.id;
        yield Platform_1.default.findByIdAndDelete(platformId);
        (0, reqres_1.sendResponseWithMessage)(res, 200, "platform deleted successfully");
    }
    catch (error) {
        console.log("error from deletePlatform", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.deletePlatform = deletePlatform;
