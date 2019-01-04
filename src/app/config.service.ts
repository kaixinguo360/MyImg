import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiURL = '/api';
  fileURLRoot = '/file';
  loadingImageURL = '/loading.gif';
  mobileWidth = 640;
  columnWidth = 250;

  getApiURL(): string {
    return this.apiURL;
  }

  getFileURLRoot(): string {
    return this.fileURLRoot;
  }

  getLoadingImageURL(): string {
    return this.loadingImageURL;
  }

  getMobileWidth(): number {
    return this.mobileWidth;
  }

  getColumnWidth(): number {
    return this.columnWidth;
  }

  constructor() { }
}
