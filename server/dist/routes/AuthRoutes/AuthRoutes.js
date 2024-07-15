"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("firebase/auth");
const FirebaseConfig_1 = __importDefault(require("../../FirebaseConfig/FirebaseConfig"));
class AuthRoutes {
    constructor() {
        const app = (0, FirebaseConfig_1.default)();
        this.router = (0, express_1.Router)();
        this.auth = (0, auth_1.getAuth)();
        this.routes();
    }
    routes() {
        this.router.get('/login', this.hello);
        this.router.post('/login', this.loginUser);
    }
    hello(req, res) {
        res.status(200).json({ message: 'Hello World' });
    }
    loginUser(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        (0, auth_1.signInWithEmailAndPassword)(this.auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json({ user });
        })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.status(400).json({ errorCode, errorMessage });
        });
    }
}
exports.default = new AuthRoutes().router;
