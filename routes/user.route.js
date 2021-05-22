import { Router } from 'express'
//App Controllers
import { createUser } from '../controllers/users.controller.js'

//Router Instance
const router = Router();

/* Create new User */
router.post('/create', createUser)


export default router;
