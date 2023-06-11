import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  bio: string;

  mapToDto: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.mapToDto = function (password: string): UserDto {
  return {
    userId: this._id,
    name: this.name,
    email: this.email,
    password: this.password,
    image: this.image,
    bio: this.bio,
  };
};
