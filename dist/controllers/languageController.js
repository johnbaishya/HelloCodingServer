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
exports.deleteLanguage = exports.listLanguage = exports.addLanguage = void 0;
const Language_1 = __importDefault(require("../models/Language"));
const reqres_1 = require("../libs/reqres");
const addLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, label, description } = req.body;
        const language = yield Language_1.default.create({
            name, label, description
        });
        (0, reqres_1.sendSuccessResponse)(res, language);
    }
    catch (error) {
        console.log("error from add language", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.addLanguage = addLanguage;
const listLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const languages = yield Language_1.default.find();
        (0, reqres_1.sendSuccessResponse)(res, languages);
    }
    catch (error) {
        console.log("error from listLanguages", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.listLanguage = listLanguage;
const deleteLanguage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let languageId = req.params.id;
        yield Language_1.default.findByIdAndDelete(languageId);
        (0, reqres_1.sendResponseWithMessage)(res, 200, "language deleted successfully");
    }
    catch (error) {
        console.log("error from deleteLangauge", error);
        (0, reqres_1.sendErrorResponse)(res, error);
    }
});
exports.deleteLanguage = deleteLanguage;
