import express,{Application,Request,Response,NextFunction} from 'express';
import samochodRouter from './routes/samochodRoutes';
import wypozyczalniaRouter from './routes/wypozyczalniaRoutes'
const app: Application = express();

const add = (a: number, b: number):number => a + b;

app.use(express.json());
app.use('/samochod', samochodRouter);
app.use('/wypozyczalnia', wypozyczalniaRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        message: 'hi!'
    });
})

app.listen(5000, () => console.log('Server running'));