import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from './helpers/files.helper';
import { Response } from 'express';
import { FullImageUpdateDto } from './dto/full-image-update.dto';

@Controller('images')
@ApiTags('image') 

export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  

  @Get('/:imageName')
  async findImageByFilename(
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

  @Patch('/fullupdate/:id')
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
  fullUpdate(@Body() updateImageDto: FullImageUpdateDto, @UploadedFile() file : Express.Multer.File, @Param('id') id: string) {
    if (!file) {
      throw new BadRequestException('Make sure file has been correctly loaded')
    }

    const secureUrl = `${process.env.HOST_API}/api/v1/images/${file.filename}`;

    return this.imagesService.fullUpdate(updateImageDto, secureUrl, +id);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() titledto: {title:string}) {
    return this.imagesService.updateTitle(+id, titledto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.imagesService.remove(id);
  }
}
