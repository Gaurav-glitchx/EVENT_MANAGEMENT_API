import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/schemas/user.schema';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    role: UserRole;
    [key: string]: unknown;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user || !request.user.role) {
      return false;
    }

    const userRole = request.user.role;
    if (!Object.values(UserRole).includes(userRole)) {
      return false;
    }

    return requiredRoles.includes(userRole);
  }
}
