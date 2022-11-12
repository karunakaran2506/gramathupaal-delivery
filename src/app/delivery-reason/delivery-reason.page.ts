import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-delivery-reason',
  templateUrl: './delivery-reason.page.html',
  styleUrls: ['./delivery-reason.page.scss'],
})
export class DeliveryReasonPage implements OnInit {
  deliveryReasonForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private apiservice: ApiService,
    private toastCtrl: ToastController
  ) {}

  @Input() payload: any;

  ngOnInit() {
    this.deliveryReasonForm = new FormGroup({
      reason: new FormControl('', Validators.compose([Validators.required])),
      subscriptionpackorder: new FormControl(
        this.payload?.subscriptionpackorder
      ),
      isdelivered: new FormControl(this.payload?.isdelivered),
    });
  }

  validation_messages = {
    reason: [{ type: 'required', message: 'Reason is required' }],
  };

  onSubmit(value: any) {
    if (this.deliveryReasonForm.status === 'VALID') {
      this.apiservice.createDeliveryEntry(value).subscribe((data: any) => {
        if (data?.success) {
          this.modalCtrl.dismiss();
          this.presenttoast(data?.message);
        } else {
          this.presenttoast(data?.message);
        }
      });
    } else {
      this.presenttoast('Provide all valid values');
    }
  }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500,
    });
    toast.present();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
