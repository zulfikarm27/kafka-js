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

  async editTicket(ticket: any): Promise<any> {
    const result = await this.prismaService.ticket.update({
      where: { id: Number(ticket.id) },
      data: { ...ticket },
    });

    return result;
  }

  async getAll(): Promise<Ticket[]> {
    const result = await this.prismaService.ticket.findMany();

    return result;
  }

  async findById(id: number): Promise<Ticket> {
    const result = await this.prismaService.ticket.findUnique({
      where: { id: Number(id) },
    });

    return result;
  }
}
