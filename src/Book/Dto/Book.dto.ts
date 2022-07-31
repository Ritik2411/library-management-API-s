import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class BookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsPositive()
  @Min(1)
  @Max(20)
  quantity: number;

  @ApiProperty()
  @IsPositive()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsPositive()
  @Max(1000)
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(600)
  description: string;
}
