import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogManagerService {

  private errorMessages: string[];
  private warningMessages: string[];
  private informationMessages: string[];
  private debugMessages: string[];

  constructor() {

    this.errorMessages=[];
    this.warningMessages=[];
    this.informationMessages=[];
    this.debugMessages=[];
  }

  public logHidden(message: string): void {

    if (message === undefined) {

      return;

    }

    if (message === null) {

      return;

    }

    message = message.trim();

    if (message === '') {

      return;

    }

    console.log(message);

  }

  public logError(message: string): void {

    if (message === undefined) {

      return;

    }

    if (message === null) {

      return;

    }

    message = message.trim();

    if (message === '') {

      return;

    }

    let currentDate: Date = new Date();

    let now =
      currentDate.getFullYear() +
      '/' +
      currentDate.getMonth() +
      '/' +
      currentDate.getDay() +
      ' - ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();

    message = '[' + now + '] - ' + message;

    this.errorMessages.push(message);


  }

  public logWarning(message: string): void {

    if (message === undefined) {

      return;

    }

    if (message === null) {

      return;

    }

    message = message.trim();

    if (message === '') {

      return;

    }

    let currentDate: Date = new Date();

    let now =
      currentDate.getFullYear() +
      '/' +
      currentDate.getMonth() +
      '/' +
      currentDate.getDay() +
      ' - ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();

    message = '[' + now + '] - ' + message;

    this.warningMessages.push(message);


  }

  public logInformation(message: string): void {

    if (message === undefined) {

      return;

    }

    if (message === null) {

      return;

    }

    message = message.trim();

    if (message === '') {

      return;

    }

    let currentDate: Date = new Date();

    let now =
      currentDate.getFullYear() +
      '/' +
      currentDate.getMonth() +
      '/' +
      currentDate.getDay() +
      ' - ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();

    message = '[' + now + '] - ' + message;

    this.informationMessages.push(message);


  }

  public logDebug(message: string): void {

    if (message === undefined) {

      return;

    }

    if (message === null) {

      return;

    }

    message = message.trim();

    if (message === '') {

      return;

    }

    let currentDate: Date = new Date();

    let now =
      currentDate.getFullYear() +
      '/' +
      currentDate.getMonth() +
      '/' +
      currentDate.getDay() +
      ' - ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();

    message = '[' + now + '] - ' + message;

    this.debugMessages.push(message);


  }

  public clearErrorLogs(): void {

    this.errorMessages = [];

  }

  public clearWarningLogs(): void {

    this.warningMessages = [];

  }

  public clearInformationLogs(): void {

    this.informationMessages = [];

  }

  public clearDebugLogs(): void {

    this.debugMessages = [];

  }

  public clearAllLogs(): void {

    this.reset();

  }

  public getErrorMessages(): string[] {

    return this.errorMessages;

  }

  public getWarningMessages(): string[] {

    return this.warningMessages;

  }

  public getInformationMessages(): string[] {

    return this.informationMessages;

  }

  public getDebugMessages(): string[] {

    return this.debugMessages;

  }

  private reset() {

    this.errorMessages = [];
    this.warningMessages = [];
    this.informationMessages = [];
    this.debugMessages = [];

  }

}
