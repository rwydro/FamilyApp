import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop({require: true})
  email: string

  @Prop({require: true})
  password: string

  @Prop({require: true})
  name: string

  @Prop()
  description: string
}

export const UserSchema = SchemaFactory.createForClass(User)