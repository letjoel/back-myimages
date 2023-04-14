import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Image, ImageDocument } from './schemas/image.schema';
import { Model } from 'mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    return this.imageModel.create(createImageDto);
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
}
