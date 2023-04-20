import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { CreateImageDto } from './dto/create-image.dto';
import { FullImageUpdateDto } from './dto/full-image-update.dto';
import { Image, ImageDocument } from './schemas/image.schema';


@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async create(createImageDto: CreateImageDto, imageUrl: string): Promise<Image> {

    const image = {
      title: createImageDto.title,
      id: Number(createImageDto.id),
      imageUrl
    }

    return this.imageModel.create(image);
  }

async fullUpdate(updateImageDto: FullImageUpdateDto, imageUrl: string, id:number): Promise<string> {

  const filter = { id };
  const update = { 
    title: updateImageDto.title, 
    imageUrl 
  };

  const options = { new: true }; 

  const updatedImage = await this.imageModel.findOneAndUpdate(filter, update, options);

  if (updatedImage) {
    return `Image with id ${id} updated`;
  } else {
    throw new NotFoundException(`Image with id ${id} not found`);
  }
}

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async findOne(id: number): Promise<Image> {
    return this.imageModel.findOne({ id: id }).exec();
  }

async updateTitle(id: number, titledto: {title:string}): Promise<Image> {
  return this.imageModel.findOneAndUpdate({ id: id }, { title: titledto.title }, {
    new: true,
  });
}

  async remove(id: number) {
    await this.imageModel.deleteOne({ id: id });
    return { deleted: true };
  }
  


  async getStaticImage(imageName:string) {
        const path = join(__dirname, '../../static/uploads',imageName);
        if (!existsSync(path)){
            throw new BadRequestException('No image found in this directory')
        }
        return path;
    }

  

    


}
