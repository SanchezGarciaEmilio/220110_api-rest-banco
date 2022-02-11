import { Request, Response, Router } from 'express'
import { db } from '../database/database'
import { Cli, tCliente2 } from '../model/cliente'
import { Emp } from '../model/empleado'
import { Reg, tRegistro, tRenta } from '../model/registro'
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
        res.send("API Banco")
    }

    private listarEmpleados = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                console.log(mensaje)
                const query = await Emp.find();
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private listarDirectivos = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Emp.find({ _tipoObjeto: { $eq: "Directivo" } });
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private listarLimpiadores = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Emp.find({ _tipoObjeto: { $eq: "Limpiador" } });
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private listarComerciales = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Emp.find({ _tipoObjeto: { $eq: "Comercial" } });
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private buscarEmpleado = async (req: Request, res: Response) => {
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

    private listarEmpresas = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Cli.find({ _tipoObjeto: { $eq: "Empresarial" } });
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private listarPersonas = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Cli.find({ _tipoObjeto: { $eq: "Personal" } });
                console.log('then')
                res.json(query)
                
            })
            .catch((mensaje) => {
                console.log('catch')
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private buscarClientes = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async (mensaje) => {
                const valor = req.params.id
                console.log(mensaje)
                const query = await Cli.aggregate(
                    [{ $match: { _id: valor } }]
                );
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })

        db.desconectarBD()
    }

    private registrarDirectivo = async (req: Request, res: Response) => {
        const { id, nombre, movil, fijo, calle, numero, iban, sueldo, fecha, nivel } = req.body
        await db.conectarBD()
        const dSchema = {
            _id: id,
            _tipoObjeto: "Directivo",
            _nombre: nombre,
            _telefono: { movil: movil, fijo: fijo },
            _direccion: { calle: calle, numero: numero },
            _iban: iban,
            _sueldo: sueldo,
            _fecha: fecha,
            _nivel: nivel,
        }
        const oSchema = new Emp(dSchema)
        await oSchema.save()
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        db.desconectarBD()
    }

    private registrarLimpiador = async (req: Request, res: Response) => {
        const { id, nombre, movil, fijo, calle, numero, iban, sueldo, fecha, empresa } = req.body
        await db.conectarBD()
        const dSchema = {
            _id: id,
            _tipoObjeto: "Limpiador",
            _nombre: nombre,
            _telefono: { movil: movil, fijo: fijo },
            _direccion: { calle: calle, numero: numero },
            _iban: iban,
            _sueldo: sueldo,
            _fecha: fecha,
            _empresa: empresa,
        }
        const oSchema = new Emp(dSchema)
        await oSchema.save()
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        db.desconectarBD()
    }

    private registrarComercial = async (req: Request, res: Response) => {
        const { id, nombre, movil, fijo, calle, numero, iban, sueldo, fecha, horas } = req.body
        await db.conectarBD()
        const dSchema = {
            _id: id,
            _tipoObjeto: "Comercial",
            _nombre: nombre,
            _telefono: { movil: movil, fijo: fijo },
            _direccion: { calle: calle, numero: numero },
            _iban: iban,
            _sueldo: sueldo,
            _fecha: fecha,
            _horas: horas,
        }
        const oSchema = new Emp(dSchema)
        await oSchema.save()
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        db.desconectarBD()
    }

    private registrarPersona = async (req: Request, res: Response) => {
        const { id, nombre, telefono, calle, numero, capital, ingresos, comercial } = req.body
        await db.conectarBD()
        const dSchema = {
            _id: id,
            _tipoObjeto: "Personal",
            _nombre: nombre,
            _telefono: telefono,
            _direccion: { calle: calle, numero: numero },
            _capital: capital,
            _ingresos: ingresos,
            _comercial: comercial,
        }
        console.log(dSchema)
        const oSchema = new Cli(dSchema)
        await oSchema.save()
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        db.desconectarBD()
    }

    private registrarEmpresa = async (req: Request, res: Response) => {
        const { id, nombre, telefono, calle, numero, capital, ingresos, plan } = req.body
        await db.conectarBD()
        const dSchema = {
            _id: id,
            _tipoObjeto: "Empresarial",
            _nombre: nombre,
            _telefono: telefono,
            _direccion: { calle: calle, numero: numero },
            _capital: capital,
            _ingresos: ingresos,
            _plan: plan,
        }
        const oSchema = new Cli(dSchema)
        await oSchema.save()
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        db.desconectarBD()
    }

    private actualizarEmpleado = async (req: Request, res: Response) => {
        await db.conectarBD()
        const id = req.params.id
        const { nombre, movil, fijo, calle, numero, iban, sueldo, fecha, nivel, empresa, horas } = req.body
        await Emp.findOneAndUpdate(
            { _id: id },
            {
                _nombre: nombre,
                _telefono: { movil: movil, fijo: fijo },
                _direccion: { calle: calle, numero: numero },
                _iban: iban,
                _sueldo: sueldo,
                _fecha: fecha,
                _nivel: nivel,
                _empresa: empresa,
                _horas: horas
            },
            {
                new: true,
                runValidators: true
            }
        )
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        await db.desconectarBD()
    }

    private actualizarCliente = async (req: Request, res: Response) => {
        await db.conectarBD()
        const id = req.params.id
        const { nombre, telefono, calle, numero, capital, ingresos, comercial, plan } = req.body
        await Cli.findOneAndUpdate(
            { _id: id },
            {
                _nombre: nombre,
                _telefono: telefono,
                _direccion: { calle: calle, numero: numero },
                _capital: capital,
                _ingresos: ingresos,
                _comercial: comercial,
                _plan: plan
            },
            {
                new: true,
                runValidators: true
            }
        )
            .then((doc: any) => res.send('Has guardado el archivo:\n' + doc))
            .catch((err: any) => res.send('Error: ' + err))

        await db.desconectarBD()
    }

    private eliminarEmpleado = async (req: Request, res: Response) => {
        await db.conectarBD()

        const id = req.params.id
        await Emp.findOneAndDelete({ _id: id })
            .then((doc: any) => res.send('Eliminado correctamente.'))
            .catch((err: any) => res.send('Error: ' + err))

        await db.desconectarBD()
    }

    private eliminarCliente = async (req: Request, res: Response) => {
        await db.conectarBD()

        const id = req.params.id
        await Cli.findOneAndDelete({ _id: id })
            .then((doc: any) => res.send('Eliminado correctamente.'))
            .catch((err: any) => res.send('Error: ' + err))

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
        console.log('test')
        await db.conectarBD()
            .then(async (mensaje) => {
                let tmpCliente: Cliente
                let dCliente: tCliente2
                let arrayRenta: Array<tRenta> = []
                const query = await Cli.find({})

                for (dCliente of query) {
                    if (dCliente._tipoObjeto == "Personal") {
                        tmpCliente = new Persona(dCliente._id,
                            dCliente._nombre,
                            dCliente._telefono,
                            dCliente._direccion,
                            dCliente._capital,
                            dCliente._ingresos,
                            dCliente._comercial)
                    } else {
                        tmpCliente = new Empresa(dCliente._id,
                            dCliente._nombre,
                            dCliente._telefono,
                            dCliente._direccion,
                            dCliente._capital,
                            dCliente._ingresos,
                            dCliente._plan)
                    }
                    console.log(tmpCliente)

                    let rentaT: number = 0
                    rentaT = tmpCliente.renta()

                    let dRenta: tRenta = {
                        _id: null,
                        _nombre: null,
                        _renta: null
                    }
                    
                    dRenta._id = tmpCliente.id
                    dRenta._nombre = tmpCliente.nombre
                    dRenta._renta = rentaT
                    arrayRenta.push(dRenta)
                }

                res.json(arrayRenta)
            })
            .catch((mensaje) => {
                console.log('test')
                res.send(mensaje)
            })

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


    misRutas() {

        //Función básica
        this._router.get('/', this.index)

        //Funciones de búsqueda
        this._router.get('/empleados', this.listarEmpleados)
        this._router.get('/empleados/directivo', this.listarDirectivos)
        this._router.get('/empleados/limpiador', this.listarLimpiadores)
        this._router.get('/empleados/comercial', this.listarComerciales)
        this._router.get('/empleados/:id', this.buscarEmpleado)
        this._router.get('/clientes/persona', this.listarPersonas)
        this._router.get('/clientes/renta', this.calcularRenta)
        this._router.get('/clientes/empresa', this.listarEmpresas)
        this._router.get('/clientes/:id', this.buscarClientes)

        //Funciones de creación
        this._router.post('/empleados/registrarDirectivo', this.registrarDirectivo)
        this._router.post('/empleados/registrarLimpiador', this.registrarLimpiador)
        this._router.post('/empleados/registrarComercial', this.registrarComercial)
        this._router.post('/clientes/registrarPersona', this.registrarPersona)
        this._router.post('/clientes/registrarEmpresa', this.registrarEmpresa)

        //Funciones de actualización
        this._router.put('/empleados/actualizar/:id', this.actualizarEmpleado)
        this._router.put('/clientes/actualizar/:id', this.actualizarCliente)

        //Funciones de borrado
        this._router.delete('/empleados/eliminar/:id', this.eliminarEmpleado)
        this._router.delete('/clientes/eliminar/:id', this.eliminarCliente)

        //Funciones con operaciones

        this._router.get('/empleados/salario/:id', this.calcularSalario)
        this._router.get('/ganancia/:id', this.mediaGanancia)

    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router