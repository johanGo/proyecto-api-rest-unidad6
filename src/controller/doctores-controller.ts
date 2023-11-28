import { RequestHandler } from "express";
import { Doctores } from "../models/doctores-model";
import { Especialidades } from "../models/especialidades-model";
import { Citas } from "../models/citas-model";
import { Pacientes } from "../models/pacientes-model";

export const createDoctores:RequestHandler = async(req, res)=>{
    try {
        const doctores = await Doctores.create(req.body)
        res.status(200).json({
            message:'El doctor se creo exitosamente',
            data:doctores
        })
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo crear el doctor',
            error:error.message
        })
    }
}

export const getDoctores:RequestHandler = async(req, res)=>{
    try {
        const doctor = await Doctores.findAll({
            include:[{
                model: Especialidades,
                attributes:['nombre']
            }]
        })
        res.status(200).json({
            message:'Operacion exitosa al traer los doctores',
            data: doctor
        })
    }catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer los doctores',
            error: err.message
        })
    }
}

export const getDoctoresCitas:RequestHandler = async(req, res)=>{
    try {
        const doctor = await Doctores.findAll({
            include:[{
                model: Especialidades,
                attributes:['nombre']
            },{
                model: Citas,
                attributes: ['fecha_hora'],
                include:[{
                    model: Pacientes,
                    attributes: ['nombre', 'apellido']
                }]
            }]
        })
        res.status(200).json({
            message:'Operacion exitosa al traer los doctores',
            data: doctor
        })
    }catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer los doctores',
            error: err.message
        })
    }
}

export const getDoctoresById:RequestHandler = async(req, res)=>{
    try {
        const doctor = await Doctores.findByPk(req.params.id,{
            include:[{
                model: Especialidades,
                attributes:['nombre']
            }]
        })
        if (doctor) {
            res.status(200).json({
                message:'Operacion exitosa al traer el doctor por ID',
                data:doctor
            })
        }else{
            res.status(404).json({
                message:'Doctor no encontrado por ID'
            })      
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el doctor por ID',
            error: err.message
        })
    }
}

export const getDoctoresByIdCitas:RequestHandler = async(req, res)=>{
    try {
        const doctor = await Doctores.findByPk(req.params.id,{
            include:[{
                model: Especialidades,
                attributes:['nombre']
            },{
                model: Citas,
                attributes: ['fecha_hora'],
                include:[{
                    model: Pacientes,
                    attributes: ['nombre', 'apellido']
                }]
            }]
        })
        if (doctor) {
            res.status(200).json({
                message:'Operacion exitosa al traer el doctor por ID',
                data:doctor
            })
        }else{
            res.status(404).json({
                message:'Doctor no encontrado por ID'
            })      
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el doctor por ID',
            error: err.message
        })
    }
}


export const updateDoctores:RequestHandler = async(req, res)=>{
    try {
        const doctor = await Doctores.findByPk(req.params.id)
        if (doctor) {
            await Doctores.update(req.body,{
                where:{
                    id_doctor : req.params.id
                }
            })
            res.status(200).json({
                message:'Doctor actualizado',
                data: doctor
            })
        }else{
            res.status(404).json({
                message:'Doctor no encontrado por ID para la actualizacion'
            })    
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el doctor por ID',
            error: err.message
        })
    }
}

export const deleteDoctor:RequestHandler = async(req, res)=>{
    try {
        const doctor = await Doctores.findByPk(req.params.id)
        if (doctor) {
            await Doctores.destroy({
                where:{
                    id_doctor : req.params.id
                }
            })
            res.status(200).json({
                message:'Doctor eliminado',
                data: doctor
            })
        }else{
            res.status(404).json({
                message:'Doctor no encontrado por ID para la eliminacion'
            })  
        }
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: 'Error al traer el doctor por ID',
            error: err.message
        })
    }
}