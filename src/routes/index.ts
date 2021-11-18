import config from '../config';
import api from './api';

import { Router } from "express";
const router = Router();

// API Routes
router.use(config.api.prefix, api);

export default router;