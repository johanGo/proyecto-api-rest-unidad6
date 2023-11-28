import { Router } from "express";
import { createEspecialidades, getEspecialidades, getEspecialidadesById, updateEspecialidades, deleteEspecialidades } from "../controller/especialidades-controllers";
import { deleteTelefonos } from "../controller/telefonos-controller";

const router = Router()
router.post('/', createEspecialidades)
router.get('/', getEspecialidades)
router.get('/:id', getEspecialidadesById)
router.put('/:id', updateEspecialidades)
router.delete('/:id', deleteEspecialidades)
export default router