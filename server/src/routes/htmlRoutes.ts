import path from 'node:path';
import { Router, Request, Response } from 'express';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// TODO: Define route to serve index.html
//VERIFY ROUTE PATH TO index.html!!
router.get('*', (_req: Request, res: Response) => {
    if (process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, '../../../client/dist/index.html')); 
    } else {
        res.status(404).send('Not Found - Development Mode');
    }
});

export default router;
