import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService implements OnInit {
  public orders = new BehaviorSubject({});

  constructor() {}

  ngOnInit() {}

  public updateOrders(message: any) {
    this.orders.next(message);
  }
}
