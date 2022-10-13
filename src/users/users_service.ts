import { injectable } from 'inversify';
import { UserRegisterDto } from './dto/user-register_dto';
import { IUserService } from './IUserService';
import { User } from './user-entity';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		return newUser;
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean> {
		return true;
	}
}
