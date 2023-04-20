import { ApiProperty } from '@nestjs/swagger';

export class FullImageUpdateDto {
  @ApiProperty({
    example: 'Big picture',
  })
  readonly title: string;
}