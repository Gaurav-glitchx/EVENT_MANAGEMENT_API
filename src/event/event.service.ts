import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventInput } from './schemas/event.schema';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';
import { Location } from 'src/location/schemas/location.schema';

interface PopulatedAttendee {
  _id: Types.ObjectId;
  email: string;
  name: string;
  [key: string]: unknown;
}

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  async create(eventData: EventInput): Promise<Event> {
    const location = await this.locationModel
      .findById(eventData.location)
      .lean<{ capacity: number }>();
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    //checking_capacity
    if (eventData.capacity > location.capacity) {
      throw new ConflictException(
        `Event capacity (${eventData.capacity}) exceeds location capacity (${location.capacity})`,
      );
    }
    const event = new this.eventModel(eventData);
    return event.save();
  }

  async findAll(): Promise<Event[]> {
    const allEvent = await this.eventModel
      .find()
      .populate('location')
      .populate('attendees')
      .populate('organizer')
      .exec();
    return allEvent;
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventModel
      .findById(id)
      .populate('location')
      .populate('attendees')
      .populate('organizer')
      .exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async update(id: string, eventData: Partial<Event>): Promise<Event> {
    const event = await this.eventModel
      .findByIdAndUpdate(id, eventData, { new: true })
      .populate('location')
      .populate('attendees')
      .populate('organizer')
      .exec();

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const changes = Object.keys(eventData).join(', ');

    if (Array.isArray(event.attendees)) {
      for (const attendee of event.attendees) {
        if (
          typeof attendee !== 'object' ||
          attendee === null ||
          !('email' in attendee) ||
          !('name' in attendee)
        ) {
          continue;
        }

        const populatedAttendee = attendee as unknown as PopulatedAttendee;

        if (
          typeof populatedAttendee.email === 'string' &&
          typeof populatedAttendee.name === 'string'
        ) {
          try {
            await this.emailService.sendEventUpdateEmail(
              populatedAttendee.email,
              populatedAttendee.name,
              event.title,
              changes,
            );
          } catch (error) {
            console.error(`Failed to send update email to ${populatedAttendee.email}:`, error);
          }
        }
      }
    }

    return event;
  }

  async delete(id: string): Promise<Event> {
    const event = await this.eventModel.findByIdAndDelete(id).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async registerAttendee(eventId: string, userId: string): Promise<Event> {
    const event = await this.findById(eventId);
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (event.attendees.length >= event.capacity) {
      throw new Error('Event is at full capacity');
    }

    if (
      event.attendees.some((attendee) => {
        const attendeeId =
          attendee instanceof Types.ObjectId ? attendee : (attendee as { _id: Types.ObjectId })._id;
        return attendeeId.toString() === userId;
      })
    ) {
      throw new Error('User is already registered for this event');
    }

    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(eventId, { $push: { attendees: userId } }, { new: true })
      .populate('location')
      .populate('attendees')
      .populate('organizer')
      .exec();

    if (!updatedEvent) {
      throw new NotFoundException('Event not found after update');
    }

    await this.emailService.sendEventRegistrationEmail(
      user.email,
      user.name,
      event.title,
      event.startDate.toLocaleDateString(),
    );

    return updatedEvent;
  }

  async getAttendees(eventId: string): Promise<unknown[]> {
    const event = await this.findById(eventId);
    return event.attendees;
  }
}
