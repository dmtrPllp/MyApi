import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/user-register_dto';
import { User } from './entity';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserRegisterDto) => Promise<boolean>;
}
