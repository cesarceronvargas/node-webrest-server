
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface Options {
    port: number,
    public_path?: string
}


export class Server{

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options){
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start(){

        // * Middleware


        // * Public folder
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        this.app.use( express.static( this.publicPath ));

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

