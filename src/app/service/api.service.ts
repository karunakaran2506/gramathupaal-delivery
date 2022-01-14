import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.url + 'api/';

  // User functions

  userLogin(data: any) {
    return this.http.post(this.baseUrl + 'deliveryLogin', data, {})
  }

  createSession(data: any, token: string) {
    return this.http.post(this.baseUrl + 'createSession', data, {
      headers: {
        token: token
      }
    })
  }

  listordersbyDeliveryman() {
    return this.http.get(this.baseUrl + 'listordersbyDeliveryman', {
      headers: {
        token: localStorage.getItem('gpdeltoken')
      }
    })
  }

  createDeliveryEntry(data: any) {
    return this.http.post(this.baseUrl + 'createDeliveryEntry', data, {
      headers: {
        token: localStorage.getItem('gpdeltoken')
      }
    })
  }
}
