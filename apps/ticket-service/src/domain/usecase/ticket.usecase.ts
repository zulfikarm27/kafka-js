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
