import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schemas/image.schema';
import { Model } from 'mongoose';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async create(createImageDto: CreateImageDto, filename: string): Promise<Image> {

    const image = {
      title: createImageDto.title,
      imageUrl: filename
    }

    return this.imageModel.create(image);
  }

  async findAll(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async findOne(id: string): Promise<Image> {
    return this.imageModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateImageDto: UpdateImageDto): Promise<Image> {
    return this.imageModel.findOneAndUpdate({ _id: id }, updateImageDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.imageModel.findByIdAndRemove({ _id: id }).exec();
  }


  async getStaticImage(imageName:string) {
        const path = join(__dirname, '../../static/uploads',imageName);
        if (!existsSync(path)){
            throw new BadRequestException('No image found in this directory')
        }
        return path;
    }


}
