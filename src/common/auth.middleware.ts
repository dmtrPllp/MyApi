import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { IMiddleWare } from './IMiddleware';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secretKey: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secretKey, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					req.user = (payload as JwtPayload).email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
