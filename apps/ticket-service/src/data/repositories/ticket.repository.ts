import { BadRequestException, Injectable } from '@nestjs/common';
import { ITicketRepository } from 'src/domain/repositories';
import { Ticket } from '@prisma/client';
import { PrismaService } from '../services';
import { CreateTicketDto } from 'src/domain/models';

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addTicket(ticket: CreateTicketDto): Promise<CreateTicketDto> {
    const result = await this.prismaService.ticket.create({
      data: {
        ...ticket,
      },
    });

    return result;
  }

  async findById(id: number): Promise<Ticket> {
    try {
      const result = await this.prismaService.ticket.findUniqueOrThrow({
        where: { id },
      });

      return { ...result, id };
    } catch (err) {
      throw new BadRequestException('Ticket Not Found');
    }
  }
}
