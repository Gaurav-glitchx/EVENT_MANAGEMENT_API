import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponse } from './interface/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginUserDto): Promise<User | null> {
    const user = await this.userService.findByEmail(credentials.email);
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return user;
    }
    return null;
  }

  login(user: User): LoginResponse {
    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
    };

    return {
      message: 'Login Successfull',
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: CreateUserDto): Promise<Partial<User>> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.userService.create({
      ...userData,
      password: hashedPassword,
    });
    return user;
  }
}
