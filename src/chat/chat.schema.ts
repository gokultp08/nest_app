import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Chat extends Document {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true, unique: true })
  receiver: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  images: string[];

  @Prop({ default: false })
  seen: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
