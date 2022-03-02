import {Router} from 'express';
import greetings from '../controllers/greetings';

const routes = Router();

routes.get('/greatings', greetings);

export default routes;