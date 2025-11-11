import { Component } from '@angular/core';
import { TimeClock } from "../../components/time-clock/time-clock";

@Component({
  selector: 'app-time-clock-module',
  imports: [TimeClock],
  templateUrl: './time-clock-module.html',
  styleUrl: './time-clock-module.scss',
})
export class TimeClockModule {


}
