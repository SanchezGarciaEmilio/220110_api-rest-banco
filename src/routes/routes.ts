import { Request, Response, Router } from 'express'
import { db } from '../database/database'
import { Cli } from '../model/cliente'
import { Emp } from '../model/empleado'
import { Empleado } from "../classes/empleados/empleado";
import { Directivo } from "../classes/empleados/directivo";
import { Limpiador } from "../classes/empleados/limpiador";
import { Comercial } from "../classes/empleados/comercial";
import { Cliente } from '../classes/clientes/cliente';
import { Persona } from "../classes/clientes/persona";
import { Empresa } from "../classes/clientes/empresa";

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
        const { id, tipoObjeto, nombre, telefono, direccion, capital, ingresos } = req.body
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

    private borrarCliente = async (req: Request, res: Response) => {
        await db.conectarBD()

        const id = req.params.id
        await Cli.findOneAndDelete({ _id: id })
            .then(() => console.log('\nEliminado Correctamente'))
            .catch((err: any) => console.log('\nError: ' + err))

        await db.desconectarBD()
    }

    private calcularSalario = async (req: Request, res: Response) => {
        await db.conectarBD()

        const id = req.params.id
        let tmpEmpleado: Empleado
        const query = await Emp.findOne({ _id: id })
        
        if (query._tipoObjeto == "Directivo") {
            tmpEmpleado = new Directivo(query._id,
                query._nombre,
                query._telefono,
                query._direccion,
                query._iban,
                query._sueldo,
                query._fecha,
                query._nivel)
            let salario = tmpEmpleado.salario().toString()
            res.send(salario)

        } else if (query._tipoObjeto == "Limpiador") {
            tmpEmpleado = new Limpiador(query._id,
                query._nombre,
                query._telefono,
                query._direccion,
                query._iban,
                query._sueldo,
                query._fecha,
                query._empresa)
            let salario = tmpEmpleado.salario().toString()
            res.send(salario)

        } else if (query._tipoObjeto == "Comercial") {
            tmpEmpleado = new Comercial(query._id,
                query._nombre,
                query._telefono,
                query._direccion,
                query._iban,
                query._sueldo,
                query._fecha,
                query._horas)
            let salario = tmpEmpleado.salario().toString()
            res.send(salario)
        }
        await db.desconectarBD()
    }

    private calcularRenta = async (req: Request, res: Response) => {
        await db.conectarBD()

        const id = req.params.id
        let tmpCliente: Cliente
        const query = await Cli.findOne({ _id: id })

        if (query._tipoObjeto == "Personal") {
            tmpCliente = new Persona(query._id,
                                    query._nombre,
                                    query._telefono,
                                    query._direccion,
                                    query._capital,
                                    query._ingresos,
                                    query._comercial)
            let renta = tmpCliente.renta().toString()
            res.send(renta)

        } else if (query._tipoObjeto == "Empresarial") {
            tmpCliente = new Empresa(query._id,
                                    query._nombre,
                                    query._telefono,
                                    query._direccion,
                                    query._capital,
                                    query._ingresos,
                                    query._plan)
            let renta = tmpCliente.renta().toString()
            res.send(renta)
        }

        await db.desconectarBD()
    }

    misRutas() {
        this._router.get('/', this.index)
        this._router.get('/buscar/:id', this.buscarComercial)
        this._router.post('/crearCliente', this.crearCliente)
        this._router.put('/actualizar/:id/:comercial', this.actualizarCliente)
        this._router.delete('/borrar/:id', this.borrarCliente)
        this._router.post('/salario/:id', this.calcularSalario)
        this._router.post('/renta/:id', this.calcularRenta)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router

//Construccion del index    
let title = '<h1>API Banco</h1><br>'
let explicacion = '<p>Para más información: <a href="https://github.com/SanchezGarciaEmilio/220110_api-rest-banco">Github</a></p>'
let html = title + explicacion  