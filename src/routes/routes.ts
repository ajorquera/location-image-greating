import {Router} from 'express';
import helloWorld from '../controllers/helloWorld';

const routes = Router();

routes.get('/', helloWorld);

export default routes;