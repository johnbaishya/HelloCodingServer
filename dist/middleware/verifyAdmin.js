"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqres_1 = require("../libs/reqres");
const verifyAdmin = (req, res, next) => {
    var _a;
    let isAdmin = false;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) == "admin") {
        isAdmin = true;
    }
    ;
    if (isAdmin) {
        return next();
    }
    else {
        (0, reqres_1.sendResponseWithMessage)(res, 401, "only admin is authorized for this rooute");
        return;
    }
};
exports.default = verifyAdmin;
