import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly KEY = 'deviceUUID';

  getOrCreateDeviceUUID(): string {
    let uuid = localStorage.getItem(this.KEY);

    if (!uuid) {
      uuid = uuidv4(); 
      localStorage.setItem(this.KEY, uuid);
    }

    return uuid;
  }
  
  getUUID(): string {
    return this.getOrCreateDeviceUUID();
  }
  
}







