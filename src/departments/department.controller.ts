import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './create-department.dto';
import { Department } from './shemas/department.schema';

@Controller('departments') // This will handle requests to /departments
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.update(id, createDepartmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Department> {
    return this.departmentService.remove(id);
  }
}

