import { Router } from "express";
import { Request, Response } from "express";
import {Auth, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import intializeFirebase from "../../FirebaseConfig/FirebaseConfig"
import { FirebaseApp } from "firebase/app";
import JWT from "../../utils/jwt";

class AuthRoutes {
    public router: Router;
    constructor() {
        const app: FirebaseApp = intializeFirebase();
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/login', this.hello);
        this.router.post('/login', this.loginUser);
    }

    hello(req: Request, res: Response) {
        res.status(200).json({message: 'Hello World'});
    }

    loginUser(req: Request, res: Response) {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email, password);
        

        signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(!user.email) return;
            const userToken = JWT.sign(user.email);
            res.status(200).send({user: userToken})
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error;
            console.log(errorCode, errorMessage);
            
            res.status(400).json({error: "could not log in" });
        });
            
    }

}

export default new AuthRoutes().router;