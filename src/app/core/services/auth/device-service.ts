import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly KEY = 'deviceUUID';

  getOrCreateDeviceUUID(): string {
    let uuid = localStorage.getItem(this.KEY);

    if (!uuid) {
      uuid = crypto.randomUUID();  
      localStorage.setItem(this.KEY, uuid);
    }

    return uuid;
  }

  getUUID(): string {
    return this.getOrCreateDeviceUUID();
  }
  
}
