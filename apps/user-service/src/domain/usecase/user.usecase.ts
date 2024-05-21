import { UserResponseDto } from 'src/presentation/dto';
import { CreateUserDto } from '../models';
import { IUserRepository } from '../repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async addUser(user: CreateUserDto): Promise<CreateUserDto> {
    return this.userRepository.addUser(user);
  }

  async findById(id: number): Promise<UserResponseDto> {
    try {
      const result = await this.userRepository.findById(id);

      return {
        ...result,
      };
    } catch (err) {
      throw new BadRequestException('User Not Found');
    }
  }
}
