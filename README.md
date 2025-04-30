# Event Management API

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

A comprehensive event management system built with NestJS featuring multi-role access, email notifications, and Redis caching.

## Features

- **User Roles**:
  - Admin: Full system access
  - Event Manager: Manage events and attendees
  - Attendee: Register for events
- **Core Functionality**:
  - Event CRUD operations with location mapping
  - User registration/management
  - Event registration system
  - Attendee tracking
- **Advanced Features**:
  - JWT Authentication
  - Redis caching for performance
  - Email notifications (registration/updates)
  - Request logging middleware
  - Input validation
  - Swagger API documentation
  - SonarQube integration

## Technologies

- **Backend Framework**: NestJS
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis
- **Email Service**: Nodemailer
- **Authentication**: JWT, Passport
- **Tools**: Swagger, class-validator

## Installation

# Clone repository
git clone https://github.com/yourusername/event-management-api.git
cd event-management-api

# Install dependencies
npm install

# Set up environment
cp .env.example .env

Configuration
Update .env file with your credentials:

ini
# Application
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/event-management

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=1h

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Email (Mailtrap example)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_user
MAIL_PASS=your_mailtrap_pass
MAIL_FROM=noreply@eventapp.com
API Endpoints
Method	Endpoint	Description	Access
POST	/api/auth/register	User registration	Public
POST	/api/auth/login	User login	Public
GET	/api/events	List all events	All Roles
POST	/api/events	Create new event	Event Manager+
PUT	/api/events/{id}	Update event	Event Manager+
POST	/api/events/{id}/register	Register for event	Attendee+
GET	/api/users	List all users	Admin
Full API Documentation: http://localhost:3000/api/docs

Running the Application
bash
# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod

# Testing
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Test coverage
Project Structure
tree
src/
├── auth/
│   ├── strategies/       # Authentication strategies
│   ├── auth.service.ts   # Auth business logic
│   └── auth.controller.ts
├── events/
│   ├── entities/         # Event and Attendee entities
│   ├── dtos/             # Data transfer objects
│   ├── events.service.ts
│   └── events.controller.ts
├── users/
│   ├── entities/         # User entity
│   └── users.controller.ts
├── locations/            # Location management
├── common/
│   ├── decorators/       # Custom decorators
│   ├── guards/           # Auth guards
│   ├── interfaces/       # Type definitions
│   └── middleware/       # Request logging
└── main.ts               # Application entry
Code Examples
Role-based Access Control:

typescript
// roles.decorator.ts
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler()
    );
    // Authorization logic
  }
}
Event Registration Email:

typescript
async sendRegistrationEmail(user: User, event: Event) {
  await this.mailerService.sendMail({
    to: user.email,
    subject: 'Event Registration Confirmation',
    template: 'event-registration',
    context: {
      name: user.name,
      event: event.title,
      date: event.date.toLocaleDateString()
    }
  });
}
# License
This project is licensed under the MIT License.