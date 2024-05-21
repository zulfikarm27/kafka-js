import { Ticket } from '@prisma/client';
import { CreateTicketDto } from '../models';

export abstract class ITicketRepository {
  abstract addTicket(user: CreateTicketDto): Promise<CreateTicketDto>;
  abstract findById(id: number): Promise<Ticket>;
}
