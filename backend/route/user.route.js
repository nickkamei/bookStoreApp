import express from 'express';
import { login, signup } from '../controller/user.controller.js';

const router = express.Router();

// Define your routes for signup and login
router.post('/signup', signup);
router.post('/login', login);

export default router;
