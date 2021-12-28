import { Request, Response, Router } from 'express'


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

    misRutas() {
        this._router.get('/', this.index)

    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router

//Construccion del index
let title = '<h1>API Banco</h1><br>'
let explicacion = '<p>Esta API trata sobre un banco genérico. Para usarla es necesarior registrarse con las credenciales correctas.</p>'
let lista = '<br><ul><li><a href="localhost:3000/crearCliente">Crear cliente</a></li><li>Borrar cliente</li><li><a href="localhost:3000/salario">Calcular salario</a></li></ul>'
let html = title + explicacion + lista