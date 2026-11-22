
import express, {Router} from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface Options {
    port: number,
    routes: Router; 
    public_path?: string,
}


export class Server{

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        // * Middleware
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) ); //x-www-formurlencoded

        // * Public folder
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        this.app.use( express.static( this.publicPath ));

        // * Routes
        this.app.use( this.routes );


        // * Spa
        this.app.get('/{*splat}', (req, res) => {
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
            console.log(__dirname);
            res.sendFile(indexPath);
            
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }

}

