import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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

  async getAll(): Promise<User[]> {
    const result = await this.prismaService.user.findMany();

    return result;
  }

  async findById(id: number): Promise<User> {
    const result = await this.prismaService.user.findUnique({
      where: { id: id },
    });

    return result;
  }
}
