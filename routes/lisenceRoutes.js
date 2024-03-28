import express from 'express'
import { getLisences, getLisenceById, createLisence, updateLisence, deleteLisence } from '../controllers/lisence.js'

const router = express.Router()

router.get('/lisences', getLisences)
router.get('/lisences/:id', getLisenceById)
router.post('/lisences', createLisence)
router.put('/lisences/:id', updateLisence)
router.delete('/lisences/:id', deleteLisence)

export default router