import { Router } from "express";
import { createDoctores, getDoctores, getDoctoresById, updateDoctores, deleteDoctor, getDoctoresCitas, getDoctoresByIdCitas } from "../controller/doctores-controller";
const router = Router()

router.post('/', createDoctores)
router.get('/', getDoctores )
router.get('/citas', getDoctoresCitas )
router.get('/:id', getDoctoresById )
router.get('/citas/:id', getDoctoresByIdCitas )
router.put('/:id', updateDoctores )
router.delete('/:id', deleteDoctor )

export default router