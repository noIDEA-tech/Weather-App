import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = path.dirname(__filename);  

const router = Router();

// TODO: Define route to serve index.html
router.get('*', (_req, res) => {
    if (process.env.NODE_ENV === 'production') {
      res.sendFile(path.join(__dirname, '../../../client/dist/index.html')); //VERIFY ROUTE PATH TO index.html!!
    } else {
      res.status(404).send('Not found');
    }
  });

export default router;


//determines current file's name/directory in Node.js env using ES modules, njw
// const __filename = fileURLToPath(import.meta.url); //converts 'import.meta.url(url string representing current module's location) to a file path. 'fileURLToPath' function from url module that converst URL to a file path
// const __dirname = path.dirname(__filename); //'__filename' holds the absolute path of current file 'const__dirname = path.dirname'