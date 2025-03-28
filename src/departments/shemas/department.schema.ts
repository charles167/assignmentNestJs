import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
  @Prop({ required: true })
  departmentName: string;

  @Prop({ type: [String], default: [] })
  subDepartments: string[];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
