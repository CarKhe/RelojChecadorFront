import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatLabel, MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatDateRangeInput, MatDatepickerToggle, MatDatepickerModule } from "@angular/material/datepicker";
import moment from 'moment';
import 'moment/locale/es-mx';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

moment.locale('es-mx');

@Component({
  selector: 'app-generic-date-range',
  imports: [MatFormFieldModule,MatLabel, MatFormField,
              MatDateRangeInput, MatDatepickerToggle,
              MatDatepickerModule,ReactiveFormsModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
  templateUrl: './generic-date-range.html',
  styleUrl: './generic-date-range.scss',
})
export class GenericDateRange {
  @Input() label: string = 'Rango de fechas';
  @Input() startLabel: string = 'Desde';
  @Input() endLabel: string = 'Hasta';

  @Output() rangeChange = new EventEmitter<{ start: moment.Moment | null; end: moment.Moment | null }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    const today = moment();
    const lastWeek = moment().subtract(7, 'days');
    this.form = this.fb.group({
      start: [lastWeek],
      end: [today]
    });

    // Emitir cada vez que cambie el rango
    this.form.valueChanges.subscribe(value => this.rangeChange.emit(value));
  }
}
