import { User } from '@prisma/client';
import { CreateUserDto } from '../models';

export abstract class IUserRepository {
  abstract addUser(user: CreateUserDto): Promise<CreateUserDto>;
  abstract findById(id: number): Promise<User>;
  abstract getAll(): Promise<User[]>;
}
