import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString()
  image: string;
}
