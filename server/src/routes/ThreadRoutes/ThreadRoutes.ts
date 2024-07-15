import { Router } from "express";
import { Request, Response } from "express";
import intializeFirebase from "../../FirebaseConfig/FirebaseConfig"
import { FirebaseApp } from "firebase/app";
import {Database, getDatabase, ref, set, onValue} from 'firebase/database';

class ThreadRoutes {
    public router: Router;
    constructor() {
        const app: FirebaseApp = intializeFirebase();
        this.router = Router();
        this.routes();
    }
 
    routes() {
        this.router.get('', this.hello);
        this.router.post('/create', this.createThread);
    }

    hello(req: Request, res: Response) {
        res.status(200).json({message: 'Thread Routes'});
    }

    createThread(req: Request, res: Response) {
        const threadData = req.body;
        const db = getDatabase();

        const generateId = () => {
            let id = "";
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 10; i++) {
                id += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return id;
        }

        const threadId: string = generateId();
        const threadRef = ref(db, 'threads/' + threadId);

        set(threadRef, threadData)

        threadData.id = threadId;

        res.status(200).json({message: 'Thread Created', thread: threadData});
    }
    
    getThreads(req: Request, res: Response) {
        const db = getDatabase();
        const user = req.body.email;
        const threads = [];
        const threadsRef = ref(db, 'threads/');
        onValue(threadsRef, (snapshot) => {
            const data =  snapshot.val();
            console.log(data);
            
        });
    }
}

export default new ThreadRoutes().router;