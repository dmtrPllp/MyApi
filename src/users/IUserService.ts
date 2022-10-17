import { UserModel } from '@prisma/client';
import { UserLoginDto } from './dto/user-login_dto';
import { UserRegisterDto } from './dto/user-register_dto';
import { User } from './entity';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
