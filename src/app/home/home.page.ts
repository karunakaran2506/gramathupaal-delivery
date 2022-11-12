import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loginForm: FormGroup;
  hide: Boolean = false;

  constructor(
    private apiservice: ApiService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ])),
      password: new FormControl('', Validators.required)
    })
  }

  validation_messages = {
    phone: [
      { type: 'required', message: 'Phone number is required' },
      { type: 'minLength', message: 'Enter valid phone number' },
      { type: 'maxLength', message: 'Enter valid phone number' }
    ],
    password: [
      { type: 'required', message: 'Password is required' }
    ]
  }

  onSubmit(value: any) {
    if (this.loginForm.status === 'VALID') {
      this.apiservice.userLogin(value)
        .subscribe((data: any) => {
          if (data.success) {
            this.presenttoast(data.message);
            localStorage.setItem('gpdeltoken', data?.token);
            localStorage.setItem('userDetails', JSON.stringify(data?.user));
            localStorage.setItem('store', data?.user?.store);
            localStorage.setItem('userid', data?.user?.id);
            let payLoad = {
              sessiontype: 'in',
              store: data?.user?.store
            };
            this.apiservice.createSession(payLoad, data?.token)
              .subscribe((data: any) => { })
            this.navCtrl.navigateForward('dashboard');
          }
          else {
            this.presenttoast(data.message);
          }
        })
    }
    else {
      this.presenttoast("Provide all valid values");
    }
  }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500
    });
    toast.present();
  }

}
