import { Injectable } from '@angular/core';

import { appConfig } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  isEnabled: boolean = appConfig.enableLogger;

  public log(message?: any): void {
    if (this.isEnabled) {
      console.log(message);
    }
  }

  constructor() { }
}
