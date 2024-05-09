import { IsNumber, IsString } from '@nestjs/class-validator';

export class CreateSongDto {
  @IsString()
  title: string;
  @IsNumber()
  duration: number;
  @IsString()
  year: string;
  @IsNumber()
  artistId: number;
  @IsString()
  genre: string;
}
