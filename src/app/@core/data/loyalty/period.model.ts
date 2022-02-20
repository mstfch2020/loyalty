import { FormBuilder, FormGroup, Validators } from "@angular/forms";


export interface PeriodModel
{
  min: Period;
  max: Period;
}
export interface Period
{
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  full: string;
}

export const periodInit: Period = {
  year: 0,
  month: 0,
  day: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  full: ''
};

export const createPeriodFormGroup = (periodMin: Period, formBuilder: FormBuilder): FormGroup =>
{
  if (!periodMin)
  {
    periodMin = periodInit;
  }
  return formBuilder.group({
    year: [periodMin.year, [Validators.required]],
    month: [periodMin.month, [Validators.required]],
    day: [periodMin.day, [Validators.required]],
    hours: [periodMin.hours, [Validators.required]],
    minutes: [periodMin.minutes, [Validators.required]],
    seconds: [periodMin.seconds, [Validators.required]]
  });
};
