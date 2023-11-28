import { Router } from "express";
import { createCitas, getCitas, getCitasById, updateCitas, deleteCitas } from "../controller/citas-controller";
const router = Router()
router.get('/', getCitas)
router.get('/id', getCitasById)
router.post('/', createCitas)
router.put('/id', updateCitas)
router.delete('/id', deleteCitas)


export default router