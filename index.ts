import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {apiRouter} from './routes';
import cors from 'cors';
import mongooseConnect from './databases/mongoose';

const app: Express = express()
dotenv.config();
const port = process.env.APP_PORT;

mongooseConnect();

app.get('/', (req: Request, res: Response) => {
  res.send('This route is not supported')
});

app.use(cors({
    origin : '*',
}));

app.use(express.json());

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
