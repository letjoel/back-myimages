import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({
    example: 'http://www.server.com/image.png',
  })
  readonly imageUrl: string;

  @ApiProperty({
    example: 'Big picture',
  })
  readonly title: string;
}
