import express from 'express'
const router = express.Router();

import {insertData,signIn} from '../Controllers/controllers.js'

router.post("/send",insertData);
router.post("/signin",signIn)

export default router;