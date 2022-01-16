import {Injectable} from '@angular/core';
import { BaseResponse } from '../../data/root/base-response.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private errorMessages: string[];
  private warningMessages: string[];
  private infoMessages: string[];
  private successMessages: string[];

  constructor() {

    this.errorMessages = [];
    this.warningMessages = [];
    this.infoMessages = [];
    this.successMessages = [];
  }

  /**
   * Alert one error message and push it
   * @param message
   */
  public error(message: string): void {

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

    window.scrollTo(0,0);
    this.errorMessages.push(message);
  }

  /**
   * Alert one warning message and push it
   * @param message
   */
  public warning(message: string): void {

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

    window.scrollTo(0,0);
    this.warningMessages.push(message);
  }

  /**
   * Alert one information message and push it
   * @param message
   */
  public info(message: string): void {

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

    window.scrollTo(0,0);
    this.infoMessages.push(message);
  }

  /**
   * Alert one success message and push it
   * @param message
   */
  public success(message: string): void {

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

    window.scrollTo(0,0);
    this.successMessages.push(message);
  }

  /**
   * Check alert type and push it's
   * @param errorMessages
   */
  public alerts(result: BaseResponse<any>): void {

    result?.errorMessages?.forEach((message, key) => {
      this.error(message);
    });

    result?.informationMessages?.forEach((message, key) => {
      this.info(message);
    });

    result?.successMessages?.forEach((message, key) => {
      this.success(message);
    });

    result?.warningMessages?.forEach((message, key) => {
      this.warning(message);
    });

  }

  /**
   * Check alert type and push it's
   * @param errorMessages
   */
  public exception(result: any): void {

    let expMessage = result['message'];

    if (typeof (expMessage) === "string" && expMessage !== undefined) {
      expMessage = 'خطا در ارتباط با سرور (500) : ' + expMessage;
      this.warning(expMessage);
      return;
    }

    this.alerts(result);
  }

  public clearErrorMessages(): void {

    this.errorMessages = [];
  }

  public clearWarningMessages(): void {

    this.warningMessages = [];
  }

  public clearInfoMessages(): void {

    this.infoMessages = [];
  }

  public clearSuccessMessages(): void {

    this.successMessages = [];
  }

  public clearAllMessages(): void {

    this.reset();
  }

  public getErrorMessages(): string[] {

    return this.errorMessages;
  }

  public getWarningMessages(): string[] {

    return this.warningMessages;
  }

  public getInfoMessages(): string[] {

    return this.infoMessages;
  }

  public getSuccessMessages(): string[] {

    return this.successMessages;
  }

  private reset() {

    this.errorMessages = [];
    this.warningMessages = [];
    this.infoMessages = [];
    this.successMessages = [];
  }
}
