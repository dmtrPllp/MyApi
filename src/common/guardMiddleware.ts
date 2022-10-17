import { IMiddleWare } from './IMiddleware';
import { NextFunction, Request, Response } from 'express';

export class GuardMiddleware implements IMiddleWare {
	execute({ user }: Request, res: Response, next: NextFunction): void {
		if (user) {
			return next();
		}
		res.status(401).send({ error: 'You are not authorized' });
	}
}
