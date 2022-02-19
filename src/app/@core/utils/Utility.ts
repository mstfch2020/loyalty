import * as moment from 'jalali-moment';
import { Period } from "../data/loyalty/period.model";

export class Utility
{
  static getFullDateTimeFromPeriodInPersion(period: Period): any
  {
    if (!period || period.year < 1300) { return new Date().valueOf(); }
    const date = moment.from(`${ period.year }/${ period.month }/${ period.day } ${ period.hours }:${ period.minutes }:${ period.seconds }`, 'fa', 'YYYY/M/D HH:mm:ss')
      .format('jYYYY/jMM/jDD HH:mm:ss');
    return date.valueOf();
  }

  static dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;

  public static getFullDateTimeFromPeriod(period: Period): number
  {
    if (period.year < 1300) { return new Date().valueOf(); }
    const date = moment.from(`${ period.year }/${ period.month }/${ period.day } ${ period.hours }:${ period.minutes }:${ period.seconds }`, 'fa', 'YYYY/M/D HH:mm:ss')
      .toDate();
    return date.valueOf();
  }

  public static leftPad(value: string, char: string = '0', num: number = 2): string
  {
    for (let i = 0; i < num; i++)
    {
      value = char + value;
    }
    return value.slice((num * -1));
  }

  public static isBlank(str: string): boolean
  {
    return (!str || /^\s*$/.test(str));
  }

  static getDateInFormat(interDate: string): string
  {
    if (!Utility.isBlank(interDate))
    {
      const date = new Date(interDate);
      return this.leftPad(date.getDate() + '') + '.' + this.leftPad((date.getMonth() + 1) + '')
        + '.' + date.getFullYear() + ' '
        + this.leftPad(date.getHours() + '') + ':' + this.leftPad(date.getMinutes() + '') + ':' + this.leftPad(date.getSeconds() + '');
    } else
    {
      return '';
    }
  }

  static getDateInFormatWithMiliSecond(interDate: string): string
  {
    if (!Utility.isBlank(interDate))
    {
      const date = new Date(interDate);
      return this.leftPad(date.getDate() + '') + '.' + this.leftPad((date.getMonth() + 1) + '')
        + '.' + date.getFullYear() + ' '
        + this.leftPad(date.getHours() + '') + ':' + this.leftPad(date.getMinutes() + '') + ':' + this.leftPad(date.getSeconds() + '')
        + '.' + date.getMilliseconds();
    } else
    {
      return '';
    }
  }

  static getTimeInFormat(duration: number): string
  {
    const milliseconds = Math.floor((duration % 1000) / 100);
    let seconds: string | number = Math.floor((duration / 1000) % 60);
    let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60);
    let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  }

  static isNullOrEmpty(value: any): boolean
  {
    return value === '' || value === null || value === 'null' || value === undefined || value === 'undefined';
  }

  static validateDateArray(date: string[]): boolean
  {
    return !!(date[0] + '-' + date[1] + '-' + date[2]).match(Utility.dateReg);
  }


  public static pad = (i: number): string => i < 10 ? `0${ i }` : `${ i }`;

  static validateDateTime(interDate: string): boolean
  {
    try
    {
      if (this.isNullOrEmpty(interDate))
      {
        return false;
      }
      const date = new Date(interDate);
      if (date.getFullYear() === 1)
      {
        return false;
      }
    } catch {
    }
    return true;
  }

  static getToISODate(date: string): string
  {
    const splitDate = date.split('T');
    const dateObject = new Date(splitDate[0]);
    const time = splitDate[1].split(':');
    dateObject.setHours(parseInt(time[0], 0));
    dateObject.setMinutes(parseInt(time[1], 0));
    dateObject.setSeconds(parseInt(time[2], 0));
    return dateObject.toISOString();
  }

  /**
  * Check Digit number when input value
  * @param event
  */
  public static CheckDigit(event: any): boolean
  {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
      return false;
    }

    return true;
  }

}
