import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  // Endpoint to create a new user
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.userService.createUser(username, password);
    return { message: 'User registered successfully', user };
  }

  // Endpoint to login
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const result = await this.userService.validateUser(username, password);

    if (!result) {
      return { message: 'Invalid username or password' };
    }

    // Return only the JWT token
    return { message: 'Login successful', token: result.token };
  }

  // Endpoint to fetch all users
  @Get('users')
  async getAllUsers() {
    return this.userService.findAllUsers();
  }
}
