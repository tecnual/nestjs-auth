import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema()
/**
 * Mongoose User Schema
 */
export class User {

  @Prop({type: String, required: true, unique: true})
  username: string;

  @Prop({type: String})
  name: string;

  @Prop({type: String, select: false})
  password?: string;

  @Prop({type: String, required: true, unique: true})
  email?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ '$**': 'text' });