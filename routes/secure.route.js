import { Router } from 'express'
//App Controllers
import { authenticate } from '../controllers/auth.controller.js'

//Router Instance
const router = Router();

/* authenticate user */
router.post('/auth', authenticate)


export default router;
