import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiURL = '/api';
  fileURLRoot = '/file';

  getApiURL(): string {
    return this.apiURL;
  }

  getFileURLRoot(): string {
    return this.fileURLRoot;
  }

  constructor() { }
}
