"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const languageSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, default: "" },
}, {
    timestamps: true,
});
const Language = mongoose_1.default.models.Language || mongoose_1.default.model("Language", languageSchema);
exports.default = Language;
