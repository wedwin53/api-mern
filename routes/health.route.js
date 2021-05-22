import { Router } from 'express'
//App Controllers
import healthCheck from '../controllers/health.controller.js'

//Router Instance
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('It Works');
});

/* Health check. */
router.get('/check', healthCheck)


export default router;
