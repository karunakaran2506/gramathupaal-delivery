import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditLocationPage } from '../edit-location/edit-location.page';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-active-subscriptions',
  templateUrl: './active-subscriptions.page.html',
  styleUrls: ['./active-subscriptions.page.scss'],
})
export class ActiveSubscriptionsPage implements OnInit {
  subscriptions = [];
  constructor(
    private modalCtrl: ModalController,
    private apiservice: ApiService
  ) {}

  ngOnInit() {
    this.apiservice
      .activeSubscriptions({
        deliveryman: localStorage.getItem('userid'),
      })
      .subscribe((data: any) => {
        this.subscriptions = data?.order;
      });
  }

  async editLocation(addressId:string) {
    this.apiservice.addressId = addressId;
    console.log('addressId', this.apiservice.addressId);
    const modal = await this.modalCtrl.create({
      cssClass: 'editlocation',
      component: EditLocationPage,
    });
    modal.present();
  }
}
