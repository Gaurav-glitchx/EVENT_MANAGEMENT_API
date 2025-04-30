import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { Event, EventInput } from './schemas/event.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/schemas/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UpdateEventDto } from './dto/update.dto';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @Roles(UserRole.EVENT_MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Tech Conference 2024' },
        description: { type: 'string', example: 'Annual technology conference' },
        startDate: { type: 'string', format: 'date-time', example: '2024-05-01T09:00:00Z' },
        endDate: { type: 'string', format: 'date-time', example: '2024-05-02T18:00:00Z' },
        location: { type: 'string', example: '507f1f77bcf86cd799439011' },
        capacity: { type: 'number', example: 100 },
      },
    },
  })
  async create(@Body() eventData: EventInput, @Req() req: any): Promise<Event> {
    return this.eventService.create({ ...eventData, organizer: req.user.userId });
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Return all events' })
  async findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'Return event by ID' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findById(@Param('id') id: string): Promise<Event> {
    return this.eventService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.EVENT_MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update event by ID' })
  @ApiResponse({ status: 200, description: 'Event updated successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async update(
    @Param('id') id: string,
    @Body() eventData: UpdateEventDto,
  ): Promise<Event> {
    return this.eventService.update(id, eventData);
  }

  @Delete(':id')
  @Roles(UserRole.EVENT_MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete event by ID' })
  @ApiResponse({ status: 200, description: 'Event deleted successfully' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async delete(@Param('id') id: string): Promise<Event> {
    return this.eventService.delete(id);
  }

  @Post(':id/register')
  @ApiOperation({ summary: 'Register for an event' })
  @ApiResponse({ status: 200, description: 'Registration successful' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  @ApiResponse({ status: 400, description: 'Event is full or user already registered' })
  async registerAttendee(@Param('id') id: string, @Req() req: any): Promise<Event> {
    return this.eventService.registerAttendee(id, req.user.userId);
  }

  @Get(':id/attendees')
  @ApiOperation({ summary: 'Get event attendees' })
  @ApiResponse({ status: 200, description: 'Return list of attendees' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async getAttendees(@Param('id') id: string): Promise<any[]> {
    return this.eventService.getAttendees(id);
  }
} 