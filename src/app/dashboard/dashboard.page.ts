import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { DeliveryReasonPage } from '../delivery-reason/delivery-reason.page';
import { OrderdetailsPage } from '../orderdetails/orderdetails.page';
import { ApiService } from '../service/api.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userDetails: any;
  activeSegment: string = 'pending';
  orders: Array<any> = [];
  pendingOrders: Array<any> = [];
  deliveredOrders: Array<any> = [];
  notdeliveredOrders: Array<any> = [];
  totalA1milk: number = 0;
  totalA2milk: number = 0;
  totalBuffalomilk: number = 0;
  totalA1MilkTaken: number = 0;
  totalA2MilkTaken: number = 0;
  totalBuffaloMilkTaken: number = 0;
  selectedDate: Date;

  constructor(
    private apiservice: ApiService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private commonservice: CommonService
  ) {}

  ngOnInit() {
    this.selectedDate = new Date();
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getOrders();
  }

  getOrders() {
    this.apiservice.listordersbyDeliveryman().subscribe((data: any) => {
      this.orders = data?.order;

      this.pendingOrders = this.orders?.filter((x: any) => x.isPending);
      this.deliveredOrders = this.orders?.filter((x: any) => x.isDelivered);
      this.notdeliveredOrders = this.orders?.filter(
        (x: any) => !x.isPending && !x.isDelivered
      );
      let totalA1milk = 0;
      let totalA2milk = 0;
      let totalBuffalomilk = 0;
      this.orders.map((order: any) => {
        const product = order?.subscriptionpack?.product;
        if (product?.milktype === 'a1milk') {
          totalA1milk =
            totalA1milk +
            (product?.unit === 'millilitre'
              ? product?.quantity / 1000
              : product?.quantity);
        } else if (product?.milktype === 'a2milk') {
          totalA2milk =
            totalA2milk +
            (product?.unit === 'millilitre'
              ? product?.quantity / 1000
              : product?.quantity);
        } else if (product?.milktype === 'buffalomilk') {
          totalBuffalomilk =
            totalBuffalomilk +
            (product?.unit === 'millilitre'
              ? product?.quantity / 1000
              : product?.quantity);
        }
        this.totalA1milk = totalA1milk;
        this.totalA2milk = totalA2milk;
        this.totalBuffalomilk = totalBuffalomilk;
      });

      this.apiservice.getTodayMilkSupply().subscribe((data: any) => {
        let totalA1MilkTaken = 0;
        let totalA2MilkTaken = 0;
        let totalBuffaloMilkTaken = 0;
        data?.entry?.map((entry: any) => {
          const product = entry?.product;
          if (product?.milktype === 'a1milk') {
            totalA1MilkTaken = totalA1MilkTaken + entry?.quantity;
          } else if (product?.milktype === 'a2milk') {
            totalA2MilkTaken = totalA2MilkTaken + entry?.quantity;
          } else if (product?.milktype === 'buffalomilk') {
            totalBuffaloMilkTaken = totalBuffaloMilkTaken + entry?.quantity;
          }
        });
        this.totalA1MilkTaken = totalA1MilkTaken;
        this.totalA2MilkTaken = totalA2MilkTaken;
        this.totalBuffaloMilkTaken = totalBuffaloMilkTaken;
      });
    });
  }

  segmentChanged(event: any) {
    this.activeSegment = event.target.value;
  }

  async openOrderDetails(data: any) {
    let payload = {
      customer: data?.customer,
      customeraddress: data?.customeraddress,
      isPending: data?.isPending,
      isDelivered: data?.isDelivered,
      subscriptionpack: data?.subscriptionpack,
    };
    const modal = await this.modalCtrl.create({
      cssClass: 'orderdetail',
      component: OrderdetailsPage,
      componentProps: {
        payload,
      },
    });
    return modal.present();
  }

  async createDeliveredEntry(
    subscriptionpackorder: string,
    isdelivered: boolean
  ) {
    const alert = await this.alertController.create({
      cssClass: 'logout',
      message: 'Are your sure to make this action ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            const payload = {
              subscriptionpackorder,
              isdelivered,
            };
            this.apiservice
              .createDeliveryEntry(payload)
              .subscribe((data: any) => {
                if (data?.success) {
                  this.getOrders();
                  this.presenttoast(data?.message);
                } else {
                  this.presenttoast(data?.message);
                }
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async createnotDeliveredEntry(
    subscriptionpackorder: string,
    isdelivered: boolean
  ) {
    const alert = await this.alertController.create({
      cssClass: 'logout',
      message: 'Are your sure to make this action ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: async () => {
            const payload = {
              subscriptionpackorder,
              isdelivered,
            };
            const modal = await this.modalCtrl.create({
              cssClass: 'deliveryreason',
              component: DeliveryReasonPage,
              componentProps: {
                payload,
              },
            });
            modal.onDidDismiss().then(() => {
              this.getOrders();
            });
            modal.present();
          },
        },
      ],
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'logout',
      message: 'Are your sure to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Yes',
          handler: () => {
            let payLoad = {
              sessiontype: 'out',
              store: localStorage.getItem('store'),
            };
            this.apiservice
              .createSession(payLoad, localStorage.getItem('gpdeltoken'))
              .subscribe((data: any) => {});
            localStorage.clear();
            this.navCtrl.navigateRoot('/home');
          },
        },
      ],
    });
    await alert.present();
  }

  async presenttoast(txt: string) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500,
      position: 'top',
    });
    toast.present();
  }

  gotoPage(){
    this.navCtrl.navigateForward('/active-subscriptions');
  }
}
