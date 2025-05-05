import { PartialType } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';
export class UpdateUser extends PartialType(User) {}
