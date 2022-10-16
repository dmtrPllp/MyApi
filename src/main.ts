import { App } from './app';
import { ExceptionFilter } from './errors/exception-filter';
import { LoggerService } from './logger/logger_service';
import { UserController } from './users/UserController';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger-interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception-filter-interface';
import 'reflect-metadata';
import { IUserController } from './users/IUserController';
import { IUserService } from './users/IUserService';
import { UserService } from './users/UserService';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config_service';
import { PrismaService } from './database/prisma_service';
import { IUserRepository } from './users/IRep';
import { UserRepository } from './users/Repository';

export interface IBootstrapReturn {
	appConteiner: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appConteiner = new Container();
	appConteiner.load(appBindings);
	const app = appConteiner.get<App>(TYPES.Application);
	app.init();
	return { appConteiner, app };
}

export const { app, appConteiner } = bootstrap();
