import express from 'express'

import { buyLisence } from '../controllers/transaction.js'
import { verifyUser } from '../middleware/verify.js'

const router = express.Router()

router.post('/lisences/:id', verifyUser, buyLisence)

export default router