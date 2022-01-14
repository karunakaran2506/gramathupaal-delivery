import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { OrderdetailsPage } from '../orderdetails/orderdetails.page';
import { ApiService } from '../service/api.service';

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
  selectedDate: Date;

  constructor(
    private apiservice: ApiService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.selectedDate = new Date();
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.getOrders();
  }

  getOrders() {
    this.apiservice.listordersbyDeliveryman()
      .subscribe((data: any) => {
        this.orders = data?.order;
        this.pendingOrders = data?.order?.filter((x: any) => x.isPending);
        this.deliveredOrders = data?.order?.filter((x: any) => x.isDelivered);
        this.notdeliveredOrders = data?.order?.filter((x: any) => (!x.isPending && !x.isDelivered));
      })
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
      subscriptionpack: data?.subscriptionpack
    };
    const modal = await this.modalCtrl.create({
      component: OrderdetailsPage,
      componentProps: {
        payload
      },
      cssClass: 'orderdetail-css'
    })
    return modal.present();
  }

  createEntry(subscriptionpackorder: string, isdelivered: boolean) {
    let payload = {
      subscriptionpackorder,
      isdelivered
    }
    this.apiservice.createDeliveryEntry(payload)
      .subscribe((data: any) => {
        if (data?.success) {
          this.getOrders();

          this.presenttoast(data?.message);
        } else {
          this.presenttoast(data?.message);
        }
      })
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are your sure to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            let payLoad = {
              sessiontype: 'out',
              store: localStorage.getItem('store')
            };
            this.apiservice.createSession(payLoad, localStorage.getItem('gpdeltoken'))
              .subscribe((data: any) => { })
            localStorage.clear();
            this.navCtrl.navigateRoot('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  async presenttoast(txt: string) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }

}