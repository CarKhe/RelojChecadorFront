import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  get isHandset$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(map(result => result.matches), shareReplay(1));
  }

  get isTablet$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Tablet)
      .pipe(map(result => result.matches), shareReplay(1));
  }

  get isWeb$(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Web)
      .pipe(map(result => result.matches), shareReplay(1));
  }
}
