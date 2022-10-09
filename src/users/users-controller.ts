import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base-controller";
import { HTTPError } from "../errors/http-error";
import { ILogger } from "../logger/logger-interface";
import { TYPES } from "../types";
import 'reflect-metadata';
import { IUser } from "./user-interface";

@injectable()
export class UserController extends BaseController implements IUser {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            { path: '/login', method: 'post', func: this.login },
            { path: '/register', method: 'post', func: this.register }
        ])
    }


    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'ошибка авторизации', 'login'));
        //this.ok<string>(res,'login is OK!');
    }
    register(req: Request, res: Response, next: NextFunction) {
        this.ok<string>(res, 'reg is OK!');
    }
}