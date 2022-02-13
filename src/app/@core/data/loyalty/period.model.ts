import { Validators } from "@angular/forms";

export interface Period
{
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const periodInit: Period = {
  year: 0,
  month: 0,
  day: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
};

export const createPeriodFormGroup = (periodMin: Period): { [key: string]: any; } =>
{
  return {
    year: [periodMin.year, [Validators.required]],
    month: [periodMin.month, [Validators.required]],
    day: [periodMin.day, [Validators.required]],
    hours: [periodMin.hours, [Validators.required]],
    minutes: [periodMin.minutes, [Validators.required]],
    seconds: [periodMin.seconds, [Validators.required]]
  };
};
