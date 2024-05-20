import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AuthControllerV1 {
  private readonly topic = {
    login: 'user.auth.login.student.v1',
  };

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka
  ) {
    userClient.connect();
    userClient.subscribeToResponseOf(this.topic.login);
  }

  @Post('/auth/login')
  async login(@Body() body: any) {
    const res = await firstValueFrom(
      this.userClient.send(this.topic.login, body)
    );

    return res;
  }
}
