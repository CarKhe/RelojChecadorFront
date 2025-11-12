import { Component } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { GenericDate } from "../../../../../shared/components/generic-date/generic-date";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { GenericDateRange } from "../../../../../shared/components/generic-date-range/generic-date-range";

@Component({
  selector: 'app-search-download-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, GenericCard, GenericButton, GenericDateRange],
  templateUrl: './search-download-form.html',
  styleUrl: './search-download-form.scss',
})
export class SearchDownloadForm {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fechaInicio: [''],
      fechaFin: [''],
    });
  }
  descargar(){
    console.log(this.form.value);
  }
  onRangeChange(range: { start: moment.Moment | null; end: moment.Moment | null }) {
    this.form.patchValue({
      fechaInicio: range.start ? range.start.format('YYYY-MM-DD') : '',
      fechaFin: range.end ? range.end.format('YYYY-MM-DD') : ''
    });
  }
}
