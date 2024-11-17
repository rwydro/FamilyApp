import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../../users/db/schemas/user.schema';
import mongoose from 'mongoose';

@Schema()
export class Task extends Document{

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', isRequired: true })
  reporter: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', isRequired: true })
  assignee: User;

  @Prop({isRequired: true})
  title: string;

  @Prop({isRequired: true})
  description: string;

  @Prop({isRequired: true})
  creationDate: Date;

  @Prop({isRequired: true})
  deadline: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task)