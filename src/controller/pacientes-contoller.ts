import { Pacientes } from "../models/pacientes-model";
import { RequestHandler } from "express";
import { Telefonos } from "../models/telefonos-model";
import { Citas } from "../models/citas-model";
import { Doctores } from "../models/doctores-model";

export const createPacientes:RequestHandler = async (req, res)=>{
    try {
        const paciente = await Pacientes.create(req.body)
        res.status(200).json({
            message:'Paciente creado exitosamente',
            data: paciente
        })
    } catch (error:any) {
        res.status(500).json({
            message: 'El paciente no fue creado',
            error: error.message
        })
    }
}

export const getPacientes:RequestHandler = async(req, res)=>{
    try {
        const paciente = await Pacientes.findAll({
            include:[{
                model:Telefonos,
                attributes:['telefono']
            }]
        })
        res.status(200).json({
            message:'Operacion exitosa al traer los pacientes',
            data: paciente
        })
    }catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer los pacientes',
            error: err.message
        })
    }
}

export const getPacientesCitas:RequestHandler = async(req, res)=>{
    try {
        const paciente = await Pacientes.findAll({
            include:[{
                model:Telefonos,
                attributes:['telefono']
            },{
                model:Citas,
                attributes: ['fecha_hora'],
                include:[{
                    model:Doctores,
                    attributes:['nombre', 'apellido']
                }]
            }]
        })
        res.status(200).json({
            message:'Operacion exitosa al traer los pacientes',
            data: paciente
        })
    }catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer los pacientes',
            error: err.message
        })
    }
}

export const getPacientesById:RequestHandler = async(req, res)=>{
    try {
        const paciente = await Pacientes.findByPk(req.params.id,{
            include:[{
                model:Telefonos,
                attributes:['telefono']
            }]
        })
        if (paciente) {
            res.status(200).json({
                message:'Operacion exitosa al traer el paciente por ID',
                data: paciente
            })
        }else{
            res.status(404).json({
                message:'Paciente no encontrado por ID'
            })      
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el paciente por ID',
            error: err.message
        })
    }
}

export const getPacientesByIdCitas:RequestHandler = async(req, res)=>{
    try {
        const paciente = await Pacientes.findByPk(req.params.id,{
            include:[{
                model:Telefonos,
                attributes:['telefono']
            },{
                model:Citas,
                attributes: ['fecha_hora'],
                include:[{
                    model:Doctores,
                    attributes:['nombre', 'apellido']
                }]
            }]
        })
        if (paciente) {
            res.status(200).json({
                message:'Operacion exitosa al traer el paciente por ID',
                data: paciente
            })
        }else{
            res.status(404).json({
                message:'Paciente no encontrado por ID'
            })      
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el paciente por ID',
            error: err.message
        })
    }
}


export const updatePacientes:RequestHandler = async(req, res)=>{
    try {
        const paciente = await Pacientes.findByPk(req.params.id)
        if (paciente) {
            await Pacientes.update(req.body,{
                where:{
                    id_paciente : req.params.id
                }
            })
            res.status(200).json({
                message:'Paciente actualizado',
                data: paciente
            })
        }else{
            res.status(404).json({
                message:'Paciente no encontrado por ID para la actualizacion'
            })    
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el paciente por ID',
            error: err.message
        })
    }
}

export const deletePacientes:RequestHandler = async(req, res)=>{
    try {
        const paciente = await Pacientes.findByPk(req.params.id)
        if (paciente) {
            await Pacientes.destroy({
                where:{
                    id_paciente : req.params.id
                }
            })
            res.status(200).json({
                message:'Paciente eliminado',
                data: paciente
            })
        }else{
            res.status(404).json({
                message:'Paciente no encontrado por ID para la eliminacion'
            })  
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el paciente por ID',
            error: err.message
        })
    }
}