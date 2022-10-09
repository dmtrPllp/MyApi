import { Router, Response, Request, NextFunction } from "express";
import { injectable } from "inversify";
import { ILogger } from "../logger/logger-interface";
import { IControllerRoute } from "./IRoute";
export { Router } from 'express';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: ILogger) {
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