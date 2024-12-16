import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from './shemas/department.schema';
import { CreateDepartmentDto } from './create-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<DepartmentDocument>,
  ) {}

  // Create a new department
  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    return createdDepartment.save();
  }

  // Get all departments
  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().exec();
  }

  // Get department by ID
  async findOne(id: string): Promise<Department> {
    return this.departmentModel.findById(id).exec();
  }

  // Update a department
  async update(id: string, createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentModel.findByIdAndUpdate(id, createDepartmentDto, { new: true }).exec();
  }

  // Delete a department
  async remove(id: string): Promise<Department> {
    return this.departmentModel.findByIdAndDelete(id).exec();
  }
}
