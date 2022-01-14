import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.page.html',
  styleUrls: ['./orderdetails.page.scss'],
})
export class OrderdetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() payload: any;

  customer: any;
  customeraddress: any;
  subscriptionpack: any;
  isPending : boolean;
  isDelivered : boolean;

  ngOnInit() {
    this.customer = this.payload?.customer;
    this.customeraddress = this.payload?.customeraddress;
    this.subscriptionpack = this.payload?.subscriptionpack;
    this.isPending = this.payload?.isPending;
    this.isDelivered = this.payload?.isDelivered;
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
