import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location } from './schemas/location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
  ) {}

  async create(locationData: Partial<Location>): Promise<Location> {
    const location = new this.locationModel(locationData);
    return location.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findById(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async update(id: string, locationData: Partial<Location>): Promise<Location> {
    const location = await this.locationModel.findByIdAndUpdate(id, locationData, { new: true }).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async delete(id: string): Promise<Location> {
    const location = await this.locationModel.findByIdAndDelete(id).exec();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }
} 