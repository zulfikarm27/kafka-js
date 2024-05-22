import { Body, Controller, Inject, Post, Get, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class CreateUserController {
  private readonly topic = {
    createUser: 'create-user',
    getUser: 'get-user',
    getAllUser: 'get-all-user',
  };

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {
    userClient.connect();
    userClient.subscribeToResponseOf(this.topic.createUser);
    userClient.subscribeToResponseOf(this.topic.getUser);
    userClient.subscribeToResponseOf(this.topic.getAllUser);
  }

  @Get('/user/:id')
  async getById(@Param('id') id: number) {
    const res = await firstValueFrom(
      this.userClient.send(this.topic.getUser, { id: id }),
    );
    return res;
  }

  @Get('/user')
  async getAllUser() {
    const res = await firstValueFrom(
      this.userClient.send(this.topic.getAllUser, {}),
    );
    return res;
  }

  @Post('/user')
  async createUser(@Body() body: any) {
    const res = await firstValueFrom(
      this.userClient.send(this.topic.createUser, body),
    );

    return res;
  }
}
