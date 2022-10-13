import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base-controller';
import { HTTPError } from '../errors/http-error';
import { ILogger } from '../logger/logger-interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUser } from './user-interface';
import { UserLoginDto } from './dto/user-login_dto';
import { UserRegisterDto } from './dto/user-register_dto';
import { User } from './user-entity';

@injectable()
export class UserController extends BaseController implements IUser {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'ошибка авторизации', 'login'));
		//this.ok<string>(res,'login is OK!');
	}
	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		this.ok(res, newUser);
	}
}
