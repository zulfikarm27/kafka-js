import { TicketResponseDto } from 'src/presentation/dto';
import { CreateTicketDto } from '../models';
import { ITicketRepository } from '../repositories';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class TicketUseCase {
  constructor(private ticketRepository: ITicketRepository) {}

  async addTicket(ticket: CreateTicketDto): Promise<CreateTicketDto> {
    return this.ticketRepository.addTicket({
      ...ticket,
      date: new Date().toDateString(),
    });
  }

  async editTicket(ticket: any): Promise<any> {
    return this.ticketRepository.editTicket({
      id: ticket.id,
      ...ticket,
      date: new Date().toDateString(),
    });
  }

  async getAll(): Promise<TicketResponseDto[]> {
    try {
      const result = await this.ticketRepository.getAll();

      return [...result];
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findById(id: number): Promise<TicketResponseDto> {
    try {
      const result = await this.ticketRepository.findById(id);

      return {
        ...result,
      };
    } catch (err) {
      throw new BadRequestException('Ticket Not Found');
    }
  }
}
