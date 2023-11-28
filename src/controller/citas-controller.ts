import { RequestHandler } from "express";
import { Citas } from "../models/citas-model";
import { Pacientes } from "../models/pacientes-model";
import { Doctores } from "../models/doctores-model";
import { Especialidades } from "../models/especialidades-model";
import { Telefonos } from "../models/telefonos-model";

// crear las citas
export const createCitas:RequestHandler = async(req, res)=>{
    try {
        const cita = await Citas.create(req.body)
        res.status(200).json({
            message: 'Cita creada exitosamente', 
            data : cita
        })
    } catch (error:any) {
        res.status(500).json({
            message: 'No se pudo crear la Cita',
            error: error.message
        })
    }
}

//obtener todas las citas
export const getCitas: RequestHandler = async(req, res)=>{
    try {
        const cita = await Citas.findAll({
            include:[{
                model:Pacientes,
                attributes: ['nombre', 'apellido']
            },{
                model:Doctores,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Especialidades,
                    attributes: ['nombre']
                }]
            }]
        })
        res.status(200).json({
            message: 'Las cita se trajeron exitosamente',
            data: cita
        })
    } catch (error:any) {
        res.status(500).json({
            message: 'No se pudieron traer las citas',
            error: error.message
        })
    }
}

//obtener las citas por id
export const getCitasById: RequestHandler = async(req, res)=>{
    try {
        const {doctor, paciente, fecha} = req.query
        const cita = await Citas.findOne({
            where:{
                fecha_hora:fecha,
                id_doctor:doctor,
                id_paciente:paciente
            },
            include:[{
                model:Pacientes,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Telefonos,
                    attributes: ['telefono']
                }]
            },{
                model:Doctores,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Especialidades,
                    attributes: ['nombre']
                }]
            }]
        })
        if(cita){
            res.status(200).json({
                message: 'Las cita se trajeron exitosamente por ID',
                data: cita
            })
        }else{
            res.status(404).json({
                message:'Cita no encontrada por ID'
            })
        }
    } catch (error:any) {
        res.status(500).json({
            message: 'No se pudieron traer las citas por ID',
            error: error.message
        })
    }
}

export const updateCitas: RequestHandler = async(req, res)=>{
    try {
        const {doctor, paciente, fecha} = req.query
        const cita = await Citas.findOne({
            where:{
                fecha_hora:fecha,
                id_doctor:doctor,
                id_paciente:paciente
            },
            include:[{
                model:Pacientes,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Telefonos,
                    attributes: ['telefono']
                }]
            },{
                model:Doctores,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Especialidades,
                    attributes: ['nombre']
                }]
            }]
        })
        if(cita){
            await Citas.update(req.body,{
                where:{
                    fecha_hora:fecha,
                    id_doctor:doctor,
                    id_paciente:paciente
                }
            })
            res.status(200).json({
                message: 'Las cita se actualizo exitosamente',
                data: cita
            })
        }else{
            res.status(404).json({
                message:'Cita no encontrada por ID para actualizacion'
            })
        }
    } catch (error:any) {
        res.status(500).json({
            message: 'No se pudieron traer las citas por ID',
            error: error.message
        })
    }
}


export const deleteCitas: RequestHandler = async(req, res)=>{
    try {
        const {doctor, paciente, fecha} = req.query
        const cita = await Citas.findOne({
            where:{
                fecha_hora:fecha,
                id_doctor:doctor,
                id_paciente:paciente
            },
            include:[{
                model:Pacientes,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Telefonos,
                    attributes: ['telefono']
                }]
            },{
                model:Doctores,
                attributes: ['nombre', 'apellido'],
                include:[{
                    model:Especialidades,
                    attributes: ['nombre']
                }]
            }]
        })
        if(cita){
            await Citas.destroy({
                where:{
                    fecha_hora:fecha,
                    id_doctor:doctor,
                    id_paciente:paciente
                }
            })
            res.status(200).json({
                message: 'Las cita se elimino exitosamente',
                data: cita
            })
        }else{
            res.status(404).json({
                message:'Cita no encontrada por ID'
            })
        }
    } catch (error:any) {
        res.status(500).json({
            message: 'No se pudieron eliminar las citas por ID',
            error: error.message
        })
    }
}



