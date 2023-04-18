import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  imageUrl: string;

  @Prop()
  title: string;

  @Prop()
  id: number; 
}
export const ImageSchema = SchemaFactory.createForClass(Image);
