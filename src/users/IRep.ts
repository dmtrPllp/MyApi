import { UserModel } from '@prisma/client';
import { User } from './entity';

export interface IUserRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
