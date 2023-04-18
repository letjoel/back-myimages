import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  // @ApiProperty({
  //   example: 'image.png',
  // })
  // readonly imageUrl: string;

  @ApiProperty({
    example: 'Big picture',
  })
  readonly title: string;
}
