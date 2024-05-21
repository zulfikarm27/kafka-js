import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class CreateTicketController {
  private readonly topic = {
    createTicket: 'create-ticket',
    editTicket: 'edit-ticket',
    getTicket: 'get-ticket',
  };

  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketClient: ClientKafka,
  ) {
    ticketClient.connect();
    ticketClient.subscribeToResponseOf(this.topic.createTicket);
    ticketClient.subscribeToResponseOf(this.topic.editTicket);
    ticketClient.subscribeToResponseOf(this.topic.getTicket);
  }

  @Get('/ticket/:id')
  async getById(@Param('id') id: number) {
    return await this.ticketClient.send(this.topic.getTicket, id);
  }
  // @Get('/ticket')
  // async getAll(@Param()) {
  //   return await this.ticketClient.send(this.topic.getTicket,{});
  // }

  @Post('/ticket')
  async createTicket(@Body() body: any) {
    const res = await firstValueFrom(
      this.ticketClient.send(this.topic.createTicket, body),
    );

    return res;
  }
  @Put('/ticket/:id')
  async editTicket(@Body() body: any) {
    const res = await firstValueFrom(
      this.ticketClient.send(this.topic.createTicket, body),
    );

    return res;
  }
}
