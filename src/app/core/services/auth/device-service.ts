import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly KEY = 'deviceUUID';

  getOrCreateDeviceUUID(): string {
    let uuid = localStorage.getItem(this.KEY);

    if (!uuid) {
      uuid = this.generateUUID();
      localStorage.setItem(this.KEY, uuid);
    }

    return uuid;
  }

  private generateUUID(): string {
    if (crypto?.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback compatible
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
