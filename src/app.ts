import express, { Express } from "express";
import { Server } from "http";
import { ExceptionFilter } from "./errors/exception-filter";
import { ILogger } from "./logger/logger-interface";
import { LoggerService } from "./logger/logger_service";
import { UserController } from "./users/users-controller";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    userRoutes: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(logger: ILogger, userControllerParam: UserController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 5000;
        this.logger = logger;
        this.userRoutes = userControllerParam;
        this.exceptionFilter = exceptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userRoutes.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`http://localhost:${this.port}`)
    }
}