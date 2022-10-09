import { App } from "./app";
import { ExceptionFilter } from "./errors/exception-filter";
import { LoggerService } from "./logger/logger_service";
import { UserController } from "./users/users-controller";
import { Container } from 'inversify';
import { ILogger } from "./logger/logger-interface";
import { TYPES } from "./types";
import { IExceptionFilter } from "./errors/exception-filter-interface";
import 'reflect-metadata';


const appConteiner = new Container();
appConteiner.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appConteiner.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appConteiner.bind<UserController>(TYPES.UserController).to(UserController);
appConteiner.bind<App>(TYPES.Application).to(App);
const app = appConteiner.get<App>(TYPES.Application);
app.init();

export {app, appConteiner};