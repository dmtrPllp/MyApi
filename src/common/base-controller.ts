import { Router, Response, Request, NextFunction } from "express";
import { LoggerService } from "../logger/logger_service";
import { IControllerRoute } from "./IRoute";
export { Router } from 'express';

export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }
    public send<T>(res: Response, code: number, message: T) {
        return res.status(code).json(message);
    }
    public ok<T>(res: Response, message: T) {
        this.send<T>(res, 200, message);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this.router[route.method](route.path, handler);
        }
    }
}