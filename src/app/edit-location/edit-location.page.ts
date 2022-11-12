import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {
  locationForm: FormGroup;
  constructor(
    private apiservice: ApiService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.locationForm = new FormGroup({
      latitude: new FormControl('7676', Validators.required),
      longitude: new FormControl('8787', Validators.required),
    });
  }

  validation_messages = {
    latitude: [{ type: 'required', message: 'Latitude is required' }],
    longitude: [{ type: 'required', message: 'Longitude is required' }],
  };

  onSubmit(value) {
    console.log('addressId', this.apiservice.addressId);
    if (this.locationForm.status === 'VALID') {
      this.apiservice
        .editCustomerLocation({ addressId : this.apiservice.addressId, ...value})
        .subscribe((data: any) => {
          if (data.success) {
            this.presenttoast(data?.message);
            this.modalCtrl.dismiss();
          } else {
            this.presenttoast(data?.message);
          }
        });
    } else {
      this.presenttoast('Provide all valid values');
    }
  }

  async presenttoast(txt: string) {
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
