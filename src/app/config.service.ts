import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiURL = '/api';
  fileURLRoot = '/file';
  loadingImageURL = '/loading.gif';

  getApiURL(): string {
    return this.apiURL;
  }

  getFileURLRoot(): string {
    return this.fileURLRoot;
  }

  getLoadingImageURL(): string {
    return this.loadingImageURL;
  }

  constructor() { }
}
