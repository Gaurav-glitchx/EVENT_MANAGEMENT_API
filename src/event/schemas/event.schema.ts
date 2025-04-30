import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from '../../location/schemas/location.schema';
import { User } from '../../user/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Event extends Document {
  @ApiProperty({ description: 'Event title', example: 'Tech Conference 2024' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Event description', example: 'Annual technology conference' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Event start date', example: '2024-05-01T09:00:00Z' })
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty({ description: 'Event end date', example: '2024-05-02T18:00:00Z' })
  @Prop({ required: true })
  endDate: Date;

  @ApiProperty({ description: 'Event location', type: Location })
  @Prop({ type: Types.ObjectId, ref: 'Location', required: true })
  location: Location;

  @ApiProperty({ description: 'Event attendees', type: [User] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  attendees: User[];

  @ApiProperty({ description: 'Event organizer', type: User })
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  organizer: User;

  @ApiProperty({ required: true, minimum: 1 })
  @Prop({ required: true, min: 1 })
  capacity: number;

  @ApiProperty({ description: 'Event active status', example: true })
  @Prop({ default: true })
  isActive: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event); 



export type EventInput = Omit<Event, keyof Document> & {
  location: string;
  organizer: string;
  attendees?: string[];
};