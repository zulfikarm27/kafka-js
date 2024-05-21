import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Name Is Required' })
  @IsString({ message: 'Name Not Valid' })
  name!: string;

  @IsOptional()
  @IsString({ message: 'ProfilePic Not Valid' })
  profilePic!: string;

  @IsDefined({ message: 'Email Is Required' })
  @IsEmail({}, { message: 'Email Not Valid' })
  @IsString({ message: 'Email Not Valid' })
  email!: string;
}
