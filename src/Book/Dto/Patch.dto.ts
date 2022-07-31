import { ApiProperty } from '@nestjs/swagger';

export class PatchDto {
  @ApiProperty()
  valid_field: any;
}
