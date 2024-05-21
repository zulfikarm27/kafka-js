import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUserRepository } from 'src/domain/repositories';
import { PrismaService } from '../services';
import { CreateUserDto } from 'src/domain/models';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addUser(user: CreateUserDto): Promise<CreateUserDto> {
    const result = await this.prismaService.user.create({
      data: {
        ...user,
      },
    });

    return result;
  }

  async findById(id: number): Promise<User> {
    try {
      const result = await this.prismaService.user.findUniqueOrThrow({
        where: { id },
      });

      return { ...result, id };
    } catch (err) {
      throw new BadRequestException('User Not Found');
    }
  }
}
