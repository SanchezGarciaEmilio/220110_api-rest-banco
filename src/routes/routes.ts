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
let explicacion = '<p>Para más información: <a href="https://github.com/SanchezGarciaEmilio/220110_api-rest-banco">Github</a></p>'
let html = title + explicacion