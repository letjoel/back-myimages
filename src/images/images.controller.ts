import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/files.helper';
import { Response } from 'express';

@Controller('images')
@ApiTags('image') 

export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

    

  // @Post('/upload')
  // uploadFile(@UploadedFile() file : Express.Multer.File) {

  //   if (!file) {
  //     throw new BadRequestException('Make sure file extension is valid')
  //   }

  //   const secureUrl = `${process.env.HOST_API}/images/upload/${file.filename}`;

  //   return { secureUrl };
  // }

  @Get('/:imageName')
  async findImage(
    @Res() res: Response,
    @Param('imageName') imageName: string){
      const path = await this.imagesService.getStaticImage(imageName);
      res.sendFile(path);
      
  }


  @Post()
  @UseInterceptors(
    FileInterceptor(
      'file',
      {
        storage : diskStorage({
            destination : './static/uploads',
            filename : renameImage
        }),
        fileFilter : fileFilter
      }
    )
  )
  create(@Body() createImageDto: CreateImageDto, @UploadedFile() file : Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure file has been correctly loaded')
    }

    const secureUrl = `${process.env.HOST_API}/api/v1/images/${file.filename}`;

    return this.imagesService.create(createImageDto, secureUrl);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
