import { Request, Response, Router } from 'express'
import { db } from '../database/database'
import { Cli } from '../model/cliente'
import { Emp } from '../model/empleado'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router() {
        return this._router
    }

    private index = async (req: Request, res: Response) => {
        res.send(html)
    }

    private buscarComercial = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Emp.aggregate(
                    [{ $match: { _id: valor } }]
                );
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private crearCliente = async (req: Request, res: Response) => {
        const { id,  tipoObjeto,  nombre,  telefono, direccion, capital, ingresos} = req.body
        await db.conectarBD()
                const dSchema = {
                    _id: id,
                    _tipoObjeto: tipoObjeto,
                    _nombre: nombre,
                    _telefono: telefono,
                    _direccion: direccion,
                    _capital: capital,
                    _ingresos: ingresos,
                    _comercial: null,
                }
                const oSchema = new Cli(dSchema)
                await oSchema.save()
                .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
                .catch((err: any) => res.send('Error: ' + err))
            
            db.desconectarBD()
    }

    private actualizarCliente = async (req: Request, res: Response) => {
        await db.conectarBD()
                const id = req.params.id
                const comercial = req.params.comercial
                await Cli.findOneAndUpdate(
                    { _id: id },
                    {
                        _comercial: comercial,
                    },
                    {
                        runValidators: true
                    }
                )
                .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
                .catch((err: any) => res.send('Error: ' + err))
            
        await db.desconectarBD()
    }

    misRutas() {
        this._router.get('/', this.index)
        this._router.get('/buscar/:id', this.buscarComercial)
        this._router.post('/crearCliente', this.crearCliente)
        this._router.put('/actualizar/:id/:comercial', this.actualizarCliente)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router

//Construccion del index    
let title = '<h1>API Banco</h1><br>'
let explicacion = '<p>Para más información: <a href="https://github.com/SanchezGarciaEmilio/220110_api-rest-banco">Github</a></p>'
let html = title + explicacion  