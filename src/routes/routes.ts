import { Request, Response, Router } from 'express'
import { db } from '../database/database'
import { Cli, tCliente2 } from '../model/cliente'
import { Emp } from '../model/empleado'
import { Reg, tRegistro } from '../model/registro'
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

    private mediaGanancia = async (req: Request, res: Response) => {
        await db.conectarBD()

        const id = req.params.id
        let tmpPersona: Persona
        let tmpComercial: Comercial
        const query = await Cli.findOne({ _id: id })

        if (query._tipoObjeto == "Personal") {
            tmpPersona = new Persona(query._id,
                                    query._nombre,
                                    query._telefono,
                                    query._direccion,
                                    query._capital,
                                    query._ingresos,
                                    query._comercial)

            let query2 = await Emp.findOne({ _id: tmpPersona.comercial })
            tmpComercial = new Comercial(query2._id,
                query2._nombre,
                query2._telefono,
                query2._direccion,
                query2._iban,
                query2._sueldo,
                query2._fecha,
                query2._horas)

            let renta = tmpPersona.renta()
            let salario = tmpComercial.salario()
            let total = (renta - salario).toString()
            res.send(total)
            
        } else if (query._tipoObjeto == "Empresarial") {
            res.send('Solo se permiten clientes personales.')
        }
        await db.desconectarBD()
    }

    private crearPrestamo = async (req: Request, res: Response) => {
        await db.conectarBD()

        const dniCli = req.params.id
        const prestamo = parseInt(req.params.prestamo)
        let tmpCliente: Cliente
        let dCliente: tCliente2
        let interes: number
        let fecha: Date = new Date()
        let plazo: Date
        let query: any = await Cli.find({ _id: dniCli })

        let sSchema: any
        let sSchemaReg: tRegistro = {
            _idComercial: null,
            _idCliente: null,
            _capitalCliente: null,
            _prestamo: null,
            _interes: null,
            _plazo: null,
        }

        for (dCliente of query) {
            if (dCliente._tipoObjeto == "Personal") {
                tmpCliente = new Persona(dCliente._id,
                                        dCliente._nombre,
                                        dCliente._telefono,
                                        dCliente._direccion,
                                        dCliente._capital,
                                        dCliente._ingresos,
                                        dCliente._comercial)

                if (prestamo < 10000) {
                    interes = 0.05
                    fecha.setMonth(fecha.getMonth() + 6)
                    plazo = fecha

                } else if (prestamo < 50000) {
                    interes = 0.07
                    fecha.setFullYear(fecha.getFullYear() + 2)
                    plazo = fecha

                } else {
                    interes = 0.09
                    fecha.setFullYear(fecha.getFullYear() + 10)
                    plazo = fecha
                }

                sSchemaReg._idComercial = dCliente._comercial
                sSchemaReg._idCliente = dCliente._id
                sSchemaReg._capitalCliente = dCliente._capital
                sSchemaReg._prestamo = prestamo
                sSchemaReg._interes = interes
                sSchemaReg._plazo = plazo

                sSchema = new Reg(sSchemaReg)
                await sSchema.save()
                .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
                .catch((err: any) => res.send('Error: ' + err))
                }
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
        this._router.post('/ganancia/:id', this.mediaGanancia)
        this._router.post('/prestamo/:id/:prestamo', this.crearPrestamo)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router

//Construccion del index
let title = '<h1>API Banco</h1><br>'
let explicacion = '<p>Para más información: <a href="https://github.com/SanchezGarciaEmilio/220110_api-rest-banco">Github</a></p>'
let html = title + explicacion  