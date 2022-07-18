import { SchoolType } from '../enums.model';

export interface Teacher
{
  area: string,
  level: string;
  grade: string;
  lesson: string;
  school: string,
  schoolType: SchoolType;
}
