import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class User {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  subTopic: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}