import { PartialType } from '@nestjs/swagger';
import { Event } from '../schemas/event.schema';

export class UpdateEventDto extends PartialType(Event) {}