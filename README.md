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

- **Node.js** v18.x or higher
- **NPM** v9.x or higher
- **Backend Framework**: NestJS
- **Database**: MongoDB (Mongoose)
- **Cache**: Redis
- **Email Service**: Nodemailer
- **Authentication**: JWT, Passport
- **Tools**: Swagger, class-validator

## Screenshots

### 1. Swagger API Documentation

![Screenshot from 2025-04-30 15-19-33](https://github.com/user-attachments/assets/084c977a-8343-46ad-abda-4b410d81bb36)
![Screenshot from 2025-04-30 15-17-00](https://github.com/user-attachments/assets/6084789f-7a09-4b8c-b650-510cf08c55de)
_Interactive API documentation with testing capabilities_

### 2. Authentication Flow

![Screenshot from 2025-04-30 15-21-44](https://github.com/user-attachments/assets/2fc629ed-4dd8-4ba7-8ccf-ce4fe38d9b10)
_User registration and JWT token generation process_

### 3. Email Notification Example

![Screenshot_20250430_152311_Gmail](https://github.com/user-attachments/assets/099d1569-da19-44fe-9b3a-55424ec5fda2)
_Sample event registration confirmation email_

### 4. SonarQube Report

![Screenshot from 2025-04-30 15-34-28](https://github.com/user-attachments/assets/0efe45ba-9921-4c34-a7af-37cf38abcd68)
_Static code analysis and test coverage report_

# Installation

### Clone repository

- https://github.com/Gaurav-glitchx/EVENT_MANAGEMENT_API.git
- cd event-management-api

### Install dependencies

- npm install

### Set up environment

- cp .env.example .env

## Configuration

```
Update .env file with your credentials:

PORT=3000
NODE_ENV=development

// Database
MONGODB_URI=mongodb://localhost:27017/event-management

// Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=1h

// Redis
REDIS_HOST=localhost
REDIS_PORT=6379

// Email (Mailtrap example)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mailtrap_user
MAIL_PASS=your_mailtrap_pass
MAIL_FROM=noreply@eventapp.com

```

## API Endpoints

```
Method	Endpoint	Description	Access
POST	/api/auth/register	User registration	Public
POST	/api/auth/login	User login	Public
GET	/api/events	List all events	All Roles
POST	/api/events	Create new event	Event Manager+
PUT	/api/events/{id}	Update event	Event Manager+
POST	/api/events/{id}/register	Register for event	Attendee+
GET	/api/users	List all users	Admin
```

Full API Documentation: http://localhost:3000/api/docs

# Running the Application

bash

### Development mode

- npm run start:dev

# Project Structure

```
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

```
