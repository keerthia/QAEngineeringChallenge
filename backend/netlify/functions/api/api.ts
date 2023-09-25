import express, {Router} from 'express';
import serverless from 'serverless-http';
import {getMachineHealth} from '../../../machineHealth';

const api = express();

// Middleware to parse JSON request bodies
api.use(express.json());

const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));
router.post('/machine-health', (req, res) => {
  const result = getMachineHealth(req);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');//have modified this
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});




api.use('/api/', router);

export const handler = serverless(api);
