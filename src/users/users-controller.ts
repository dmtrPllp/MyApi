import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base-controller";
import { HTTPError } from "../errors/http-error";
import { LoggerService } from "../logger/logger_service";

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
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
         this.ok<string>(res,'reg is OK!');
    }
}