import { Controller, Get, Param, Post, Body, HttpStatus } from '@nestjs/common';
import { UserUseCase } from 'src/domain/usecase/user.usecase';
import { UserResponseDto } from '../dto';
import { CreateUserDto } from 'src/domain/models';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @MessagePattern('get-user')
  async getById(@Payload('id') id: number): Promise<UserResponseDto> {
    const data = await this.userUseCase.findById(id);

    return { ...data };
  }

  @MessagePattern('get-all-user')
  async getAllUser(): Promise<UserResponseDto[]> {
    const data = await this.userUseCase.getAll();

    return [...data];
  }

  @MessagePattern('create-user')
  async createUser(
    @Payload() message: CreateUserDto,
  ): Promise<UserResponseDto> {
    const data = await this.userUseCase.addUser(message);

    return { ...data };
  }
}
