import { Body, Controller, Inject, Post, Get, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class CreateUserController {
  private readonly topic = {
    createUser: 'create-user',
    getUser: 'get-user',
  };

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {
    userClient.connect();
    userClient.subscribeToResponseOf(this.topic.createUser);
    userClient.subscribeToResponseOf(this.topic.getUser);
  }

  @Get('/user/:id')
  async getById(@Param('id') id: number) {
    return await this.userClient.send(this.topic.getUser, id);
  }

  @Post('/user')
  async createUser(@Body() body: any) {
    const res = await firstValueFrom(
      this.userClient.send(this.topic.createUser, body),
    );

    return res;
  }
}
