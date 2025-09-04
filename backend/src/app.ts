import express, { json, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import tableRouter from "./routes/tablesRoute.js"
import devRouter from "./routes/devRoute.js"
import queryRouter from "./routes/queryRoute.js"

const app = express();

app.use(cors());
app.use(json());
app.use(express.json());

app.use('/tables', tableRouter);
app.use('/query', queryRouter);
app.use('/dev', devRouter);

app.use('/test', (req : Request, res : Response) => {
    res.json({ message: 'Hello from the test route!' });
});

app.use((req : Request, res : Response) => {
    res.status(404).json({ message: 'Route Not Found' });
});

app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' , error : err.message });
});

export default app;