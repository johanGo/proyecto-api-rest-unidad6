import { RequestHandler } from "express";
import { Especialidades } from "../models/especialidades-model";

export const createEspecialidades:RequestHandler = async(req, res)=>{
    try {
        const especialidades = await Especialidades.create(req.body)
        res.status(200).json({
            message: 'Especialidad creada exitosamente',
            data: especialidades
        })
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo crear la especialidad',
            error: error.message
        })
    }
}

export const getEspecialidades:RequestHandler = async(req, res)=>{
    try {
        const especialidades = await Especialidades.findAll()
        res.status(200).json({
            message:'Especialidades obtenidas exitosamente',
            data: especialidades
        })
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo traer las especialidades',
            error: error.message
        })
    }
}

export const getEspecialidadesById:RequestHandler = async(req, res)=>{
    try {
        const especialidades = await Especialidades.findByPk(req.params.id)
        if (especialidades) {
            res.status(200).json({
                message:'Especialidades obtenidas exitosamente',
                data: especialidades
            })
        }else{
            res.status(404).json({
                message:'No se encontro la especialidad por ID'
            })
        }
        
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo traer las especialidades por ID',
            error: error.message
        })
    }
}

export const updateEspecialidades:RequestHandler = async (req, res)=>{
    try {
        const especialidades = await Especialidades.findByPk(req.params.id)
        if(especialidades){
            await Especialidades.update(req.body,{
                where:{
                    id_especialidad: req.params.id
                }
            })
            res.status(200).json({
                message:'Especialidad actualizada exitosamente'
            })
        }else{
            res.status(404).json({
                message:'No se encontro la especialidad por ID'
            }) 
        }
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo actualizar las especialidades por ID',
            error: error.message
        })
    }
}

export const deleteEspecialidades:RequestHandler = async (req, res)=>{
    try {
        const especialidades = await Especialidades.findByPk(req.params.id)
        if(especialidades){
            await Especialidades.destroy({
                where:{
                    id_especialidad: req.params.id
                }
            })
            res.status(200).json({
                message:'Especialidad eliminada exitosamente',
                data : especialidades
            })
        }else{
            res.status(404).json({
                message:'No se encontro la especialidad por ID'
            }) 
        }
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo eliminar las especialidades por ID',
            error: error.message
        })
    }
}