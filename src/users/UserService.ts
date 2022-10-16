import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/user-register_dto';
import { IUserService } from './IUserService';
import { User } from './entity';
import { IUserRepository } from './IRep';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		const isExist = await this.userRepository.find(email);
		if (!isExist) {
			await newUser.setPassword(password, salt);
			return await this.userRepository.create(newUser);
		} else {
			return null;
		}
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean> {
		return true;
	}
}
