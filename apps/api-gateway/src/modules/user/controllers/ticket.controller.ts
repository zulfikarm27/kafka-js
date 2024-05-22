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
    getAllTicket: 'get-all-ticket',
  };

  constructor(
    @Inject('TICKET_SERVICE') private readonly ticketClient: ClientKafka,
  ) {
    ticketClient.connect();
    ticketClient.subscribeToResponseOf(this.topic.createTicket);
    ticketClient.subscribeToResponseOf(this.topic.editTicket);
    ticketClient.subscribeToResponseOf(this.topic.getTicket);
    ticketClient.subscribeToResponseOf(this.topic.getAllTicket);
  }

  @Get('/ticket/:id')
  async getById(@Param('id') id: number) {
    const res = await firstValueFrom(
      this.ticketClient.send(this.topic.getTicket, { id: id }),
    );

    return res;
  }

  @Get('/ticket')
  async getAll() {
    const res = await firstValueFrom(
      this.ticketClient.send(this.topic.getAllTicket, {}),
    );

    return res;
  }

  @Post('/ticket')
  async createTicket(@Body() body: any) {
    const res = await firstValueFrom(
      this.ticketClient.send(this.topic.createTicket, body),
    );

    return res;
  }
  @Put('/ticket/:id')
  async editTicket(@Param('id') id: number, body: any) {
    const res = await firstValueFrom(
      this.ticketClient.send(this.topic.editTicket, { id, body }),
    );

    return res;
  }
}
