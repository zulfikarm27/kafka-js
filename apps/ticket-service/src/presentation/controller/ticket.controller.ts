import { Controller } from '@nestjs/common';
import { TicketUseCase } from 'src/domain/usecase/ticket.usecase';
import { CreateTicketDto } from 'src/domain/models';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TicketResponseDto } from '../dto';

@Controller()
export class TicketController {
  constructor(private readonly ticketUseCase: TicketUseCase) {}

  @MessagePattern('get-ticket')
  async getById(@Payload('id') id: number): Promise<any> {
    const data = await this.ticketUseCase.findById(id);

    return { ...data };
  }

  @MessagePattern('get-all-ticket')
  async getAllUser(): Promise<TicketResponseDto[]> {
    const data = await this.ticketUseCase.getAll();

    return [...data];
  }

  @MessagePattern('create-ticket')
  async createTicket(
    @Payload() message: CreateTicketDto,
  ): Promise<TicketResponseDto> {
    const data = await this.ticketUseCase.addTicket(message);

    return { ...data };
  }

  @MessagePattern('edit-ticket')
  async editTicket(@Payload() message: any): Promise<TicketResponseDto> {
    const data = await this.ticketUseCase.editTicket(message);

    return { ...data };
  }
}
