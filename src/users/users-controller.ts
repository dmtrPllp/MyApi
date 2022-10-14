import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base-controller';
import { HTTPError } from '../errors/http-error';
import { ILogger } from '../logger/logger-interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './user-interface';
import { UserLoginDto } from './dto/user-login_dto';
import { UserRegisterDto } from './dto/user-register_dto';
import { UserService } from './users_service';
import { ValidateMiddleware } from '../common/validate_middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
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
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Such user is already exist'));
		}
		this.ok(res, { email: result.email });
	}
}
