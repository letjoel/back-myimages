import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    example: '442353465',
  })
  readonly id: string;

  @ApiProperty({
    example: 'Big picture',
  })
  readonly title: string;
}
