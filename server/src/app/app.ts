import Express, {Application} from 'express';
import cors from 'cors';
import AuthRoutes from '../routes/AuthRoutes/AuthRoutes';
import ThreadRoutes from '../routes/ThreadRoutes/ThreadRoutes';

class App {
    public app: Application;
    public port: number;
    
    constructor(port: number) {
        this.app = Express();
        this.port = port;
        this.config();
        this.routes();
    }

    config() {
        this.app.use(Express.json());
        this.app.use(Express.urlencoded({extended: false}));
        this.app.use(cors());
    }

    routes() {
        console.log('Routes');
        
        this.app.use('/auth', AuthRoutes);
        this.app.use('/thread', ThreadRoutes);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default new App(5000);