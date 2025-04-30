import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Location extends Document {
  @ApiProperty({ description: 'Location name', example: 'Conference Center' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Location address', example: '123 Main St' })
  @Prop({ required: true })
  address: string;

  @ApiProperty({ description: 'Location city', example: 'New York' })
  @Prop({ required: true })
  city: string;

  @ApiProperty({ description: 'Location state', example: 'NY' })
  @Prop({ required: true })
  state: string;

  @ApiProperty({ description: 'Location country', example: 'USA' })
  @Prop({ required: true })
  country: string;

  @ApiProperty({ description: 'Location zip code', example: '10001' })
  @Prop({ required: true })
  zipCode: string;

  @ApiProperty({ description: 'Location capacity', example: 500 })
  @Prop()
  capacity: number;

  @ApiProperty({ description: 'Location description', example: 'Modern conference center with state-of-the-art facilities' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Location active status', example: true })
  @Prop({ default: true })
  isActive: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location); 