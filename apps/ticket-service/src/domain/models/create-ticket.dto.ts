import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsDefined({ message: 'title Is Required' })
  @IsString({ message: 'title Not Valid' })
  title!: string;

  @IsString({ message: 'description Not Valid' })
  description!: string;

  @IsDefined({ message: 'date Is Required' })
  @IsString({ message: 'date Not Valid' })
  date!: string;
}
