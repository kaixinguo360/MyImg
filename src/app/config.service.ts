import { Injectable } from '@angular/core';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiURL = '/api';
  fileURLRoot = '/file';
  loadingImageURL = '/loading.gif';

  mobileWidth = 640;
  columnWidth = 250;

  defaultOrder = Order.TIME_ASC;

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

  getDefaultOrder(): Order {
    return this.defaultOrder;
  }

  constructor() { }
}
