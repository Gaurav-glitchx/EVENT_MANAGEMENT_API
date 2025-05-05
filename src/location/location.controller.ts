import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './schemas/location.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/schemas/user.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('Locations')
@ApiBearerAuth()
@Controller('locations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @Roles(UserRole.EVENT_MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: 201, description: 'Location created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Conference Center' },
        address: { type: 'string', example: '123 Main St' },
        city: { type: 'string', example: 'New York' },
        state: { type: 'string', example: 'NY' },
        country: { type: 'string', example: 'USA' },
        zipCode: { type: 'string', example: '10001' },
        capacity: { type: 'number', example: 500 },
        description: {
          type: 'string',
          example: 'Modern conference center with state-of-the-art facilities',
        },
      },
    },
  })
  async create(@Body() locationData: Partial<Location>): Promise<Location> {
    return this.locationService.create(locationData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: 200, description: 'Return all locations' })
  async findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  @ApiResponse({ status: 200, description: 'Return location by ID' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async findById(@Param('id') id: string): Promise<Location> {
    return this.locationService.findById(id);
  }

  @Put(':id')
  @Roles(UserRole.EVENT_MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update location by ID' })
  @ApiResponse({ status: 200, description: 'Location updated successfully' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async update(
    @Param('id') id: string,
    @Body() locationData: Partial<Location>,
  ): Promise<Location> {
    return this.locationService.update(id, locationData);
  }

  @Delete(':id')
  @Roles(UserRole.EVENT_MANAGER, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete location by ID' })
  @ApiResponse({ status: 200, description: 'Location deleted successfully' })
  @ApiResponse({ status: 404, description: 'Location not found' })
  async delete(@Param('id') id: string): Promise<Location> {
    return this.locationService.delete(id);
  }
}
