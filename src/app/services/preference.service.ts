import { Injectable } from '@angular/core';

import { Order } from '../order';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  defaultOrderBy = this.config.getDefaultOrder();

  public getOrder(): Order {
    const order = this.getPreference('order', this.defaultOrderBy);
    switch (order) {
      case Order.TIME_DESC:
        return Order.TIME_DESC;
      case Order.TIME_ASC:
        return Order.TIME_ASC;
      case Order.NAME_DESC:
        return Order.NAME_DESC;
      case Order.NAME_ASC:
        return Order.NAME_ASC;
      case Order.RANDOM:
        return Order.RANDOM;
      default:
        this.setPreference('order', this.defaultOrderBy);
        return this.defaultOrderBy;
    }
  }

  public setOrder(order: Order): void {
    if (order == null) {
      this.setPreference('order', this.defaultOrderBy);
    } else {
      this.setPreference('order', order);
    }
  }

  private getPreference(key: string, defaultValue: string): string {
    const value = localStorage.getItem(key);
    if (value == null) {
      this.setPreference(key, defaultValue);
      return defaultValue;
    } else {
      return value;
    }
  }

  private setPreference(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  constructor(
    private config: ConfigService
  ) { }
}
