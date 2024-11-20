import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Document, Types } from 'mongoose';
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

@Schema()
export class Task extends Document{

  @Prop({type: Types.ObjectId, ref: 'User', isRequired: true })
  reporter: User;

  @Prop({type: Types.ObjectId, ref: 'User', isRequired: true })
  assignee: User;

  @Prop({isRequired: true})
  title: string;

  @Prop({isRequired: true})
  description: string;

  @Prop({isRequired: true})
  creationDate: Date;

  @Prop({isRequired: true})
  deadline: Date;

  @Prop({default: TaskStatus.OPEN})
  taskStatus: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task)