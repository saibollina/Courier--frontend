import { Router} from 'express';
import { login,logout } from '../controller/auth.controller.js';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/logout',  logout);
