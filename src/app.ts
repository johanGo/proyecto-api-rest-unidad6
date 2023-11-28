import express from "express";
import { Request,Response } from "express";
import bodyParser from "body-parser";
import connection from "./db/config";
import { urlencoded, json } from "express";
import dotenv from 'dotenv'
import cors from 'cors'

import pacientesRoutes from './routes/pacientes-routes'
import doctoresRoutes from './routes/doctores-routes'
import citasRoutes from './routes/citas-routes'
import especialidadesRoutes from './routes/especialidades-routes'
import telefonosRoutes from './routes/telefonos-routes'

dotenv.config()
const app = express()

app.use(json());
app.use(cors());
app.use(urlencoded());

//endpoint inicial
app.get('/', (req:Request, res:Response)=>{
    res.send('Api iniciada')
})

app.use('/api/pacientes', pacientesRoutes)
app.use('/api/doctores', doctoresRoutes)
app.use('/api/citas', citasRoutes)
app.use('/api/especialidades', especialidadesRoutes)
app.use('/api/telefonos', telefonosRoutes)


//error de rutas
app.use((req: Request, res: Response)=>{
    res.status(400).send('404 page not found')
})

//error de servidor
app.use((req: Request, res: Response)=>{
    res.status(500).send('500: internal server error')
})

//conexion con sequelize 
connection.sync()
.then(()=>{
    console.log('Database connected')
})
.catch((err)=>{
    console.log('Error al conectar la base de datos')
});

//iniciar el servidor
app.listen(process.env.port,()=>{
    console.log("Servidor iniciado")
})

