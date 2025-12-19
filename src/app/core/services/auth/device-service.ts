import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private readonly KEY = 'deviceUUID';

  /**
   * Generates a UUID v4 using crypto.randomUUID() if available,
   * otherwise falls back to a custom implementation.
   */
  private generateUUID(): string {
    // Use native crypto.randomUUID() if available (modern browsers)
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback: Generate UUID v4 manually
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getOrCreateDeviceUUID(): string {
    let uuid = localStorage.getItem(this.KEY);

    if (!uuid) {
      uuid = this.generateUUID();
      localStorage.setItem(this.KEY, uuid);
    }

    return uuid;
  }

  getUUID(): string {
    return this.getOrCreateDeviceUUID();
  }
  
}
