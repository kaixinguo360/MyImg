import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FileService } from './file.service';
import { PreferenceService } from './preference.service';
import { Order } from './order';

class OrderMenuItem {
  title: string;
  isSelected: boolean;
  order: Order;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = '';
  public Orders: OrderMenuItem[];

  back(): void {
    this.fileService.stopAll();
    window.stop();
    this.location.back();
  }

  reload(): void {
    location.reload();
  }

  changeOrder(order: Order): void {
    this.preference.setOrder(order);
    this.reload();
  }

  constructor(
    private location: Location,
    private fileService: FileService,
    private preference: PreferenceService
  ) {
    const currentOrder = preference.getOrder();
    this.Orders  = [
      { title: 'Time ↓', isSelected: (currentOrder === Order.TIME_DESC) , order: Order.TIME_DESC },
      { title: 'Time ↑', isSelected: (currentOrder === Order.TIME_ASC) , order: Order.TIME_ASC },
      { title: 'Name ↓', isSelected: (currentOrder === Order.NAME_DESC) , order: Order.NAME_DESC },
      { title: 'Name ↑', isSelected: (currentOrder === Order.NAME_ASC) , order: Order.NAME_ASC },
      { title: 'Random', isSelected: (currentOrder === Order.RANDOM) , order: Order.RANDOM }
    ];
  }

  ngOnInit() { }
}
