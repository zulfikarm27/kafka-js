import { Controller, Get, Param, Post, Body, HttpStatus } from '@nestjs/common';
import { TicketUseCase } from 'src/domain/usecase/ticket.usecase';
import { CreateTicketDto } from 'src/domain/models';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketResponseDto } from '../dto';

@Controller()
export class TicketController {
  constructor(private readonly ticketUseCase: TicketUseCase) {}

  @MessagePattern('get-ticket')
  async getById(@Param('id') id: number): Promise<TicketResponseDto> {
    return await this.ticketUseCase.findById(id);
  }

  @MessagePattern('create-ticket')
  async createTicket(
    @Payload() message: CreateTicketDto,
  ): Promise<TicketResponseDto> {
    const data = await this.ticketUseCase.addTicket(message);

    return { ...data };
  }
}
