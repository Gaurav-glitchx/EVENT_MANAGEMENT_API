import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  ATTENDEE = 'attendee',
  EVENT_MANAGER = 'event_manager',
  ADMIN='admin'
}

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ description: 'User role', enum: UserRole, example: UserRole.ATTENDEE })
  @Prop({ type: String, enum: UserRole, default: UserRole.ATTENDEE })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User); 
