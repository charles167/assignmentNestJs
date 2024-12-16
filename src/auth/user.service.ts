import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';  // Your schema
import * as bcrypt from 'bcryptjs'; // Optional for hashing passwords

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Method to create a new user
  async createUser(username: string, password: string) {
    // Validate if both username and password are present
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Optional: hash the password
    const newUser = new this.userModel({ username, password: hashedPassword });
    return await newUser.save();
  }

  // Method to validate user login and generate JWT
  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { username: user.username, sub: user._id }; // Token payload
      const token = this.jwtService.sign(payload);  // Generate the JWT token
      return { user, token };  // Return user data and token
    }
    return null;
  }

  // Method to fetch all users
  async findAllUsers() {
    return this.userModel.find().exec();
  }
}
