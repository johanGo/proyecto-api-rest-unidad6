import { Router } from "express";
import { createPacientes, getPacientes, getPacientesCitas, getPacientesById,getPacientesByIdCitas, updatePacientes, deletePacientes } from "../controller/pacientes-contoller";

const router= Router();
router.post('/', createPacientes)
router.get('/', getPacientes)
router.get('/citas', getPacientesCitas)
router.get('/:id', getPacientesById)
router.get('/citas/:id', getPacientesByIdCitas)
router.put('/:id',updatePacientes)
router.delete('/:id', deletePacientes)

export default router

