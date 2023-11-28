import { RequestHandler } from "express";
import { Telefonos } from "../models/telefonos-model";
import { Pacientes } from "../models/pacientes-model";

export const createTelefonos:RequestHandler = async(req, res)=>{
    try {
        const telefonos = await Telefonos.create(req.body)
        res.status(200).json({
            message:'Se creo el numero de telefono',
            data: telefonos
        })
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo crear el telefono',
            error:error.message
        })        
    }
}

export const getTelefonos:RequestHandler = async(req, res)=>{
    try {
        const telefonos = await Telefonos.findAll()
        res.status(200).json({
            message:'Se trajeron todos los telefenos exitosamente',
            data: telefonos
        })
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo traer los telefono',
            error:error.message
        })  
    }
}

export const getTelefonosById:RequestHandler = async(req, res)=>{
    try {
        const telefonos = await Telefonos.findByPk(req.params.id)
        if(telefonos){
            res.status(200).json({
                message:'Se trajeron todos los telefonos exitosamente por Id',
                data: telefonos
            })
        }else{
            res.status(404).json({
                message:'No existe el ID digitado'
            })
        }
        
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo traer los telefono por ID',
            error:error.message
        })  
    }
}

export const updateTelefonos:RequestHandler = async (req, res)=>{
    try {
        const telefonos = await Telefonos.findByPk(req.params.id)
        if(telefonos){
            await Telefonos.update(req.body,{
                where:{
                    id_telefono : req.params.id
                }
            })
            res.status(200).json({
                message:'Se actualizo los datos',
                data: telefonos
            })
        }else{
            res.status(404).json({
                message:'No existe el ID digitado'
            })
        }
        
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo actualizar el telefono',
            error:error.message
        })  
    }
}

export const deleteTelefonos:RequestHandler = async (req, res)=>{
    try {
        const telefonos = await Telefonos.findByPk(req.params.id)
        if(telefonos){
            await Telefonos.destroy({
                where:{
                    id_telefono : req.params.id
                }
            })
            res.status(200).json({
                message:'Se elimino el telefono',
                data: telefonos
            })
        }else{
            res.status(404).json({
                message:'No existe el ID digitado'
            })
        }
        
    } catch (error:any) {
        res.status(500).json({
            message:'No se pudo eliminar el telefono',
            error:error.message
        })  
    }
}