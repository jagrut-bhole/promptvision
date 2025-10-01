import {Router} from 'express'
import {generateImage} from '../controllers/image.controller.js'

const router = Router();

router.route('/generate').post(generateImage)

export default router;