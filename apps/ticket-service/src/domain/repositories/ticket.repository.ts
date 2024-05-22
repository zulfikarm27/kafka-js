import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../models';

export abstract class ITicketRepository {
  abstract addTicket(ticket: CreateTicketDto): Promise<CreateTicketDto>;
  abstract editTicket(ticket: any): Promise<any>;
  abstract findById(id: number): Promise<Ticket>;
  abstract getAll(): Promise<Ticket[]>;
}
