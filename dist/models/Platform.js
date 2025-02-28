"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const platformSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, default: "" },
}, {
    timestamps: true,
});
const Platform = mongoose_1.default.models.Platform || mongoose_1.default.model("Platform", platformSchema);
exports.default = Platform;
