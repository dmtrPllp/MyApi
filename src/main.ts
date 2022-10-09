import { App } from './app';
import { ExceptionFilter } from './errors/exception-filter';
import { LoggerService } from './logger/logger_service';
import { UserController } from './users/users-controller';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger-interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception-filter-interface';
import 'reflect-metadata';
import { IUser } from './users/user-interface';

export interface IBootstrapReturn {
	appConteiner: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUser>(TYPES.UserController).to(UserController);
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
