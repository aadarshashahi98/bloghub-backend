import { IsEmail, IsOptional, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  firstName: string

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string

  @IsEmail()
  email: string

  @IsString()
  password: string
}