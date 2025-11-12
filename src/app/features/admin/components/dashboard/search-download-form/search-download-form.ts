import { Component } from '@angular/core';
import { GenericCard } from "../../../../../shared/components/generic-card/generic-card";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GenericButton } from "../../../../../shared/components/generic-button/generic-button";
import { GenericDateRange } from "../../../../../shared/components/generic-date-range/generic-date-range";
import { RangoFechasDescargaDTO } from '../../../../../core/DTOs/admin/rango-fechas-descarga.dto';
import { AdminDashboardService } from '../../../../../core/services/admin/admin-dashboard-service';
import moment from 'moment';

@Component({
  selector: 'app-search-download-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, GenericCard, GenericButton, GenericDateRange],
  templateUrl: './search-download-form.html',
  styleUrl: './search-download-form.scss',
})
export class SearchDownloadForm {
  form: FormGroup;
  constructor(private fb: FormBuilder, private  serviceDashboard: AdminDashboardService) {
    const today = moment().format('YYYY-MM-DD');
    const lastWeek = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.form = this.fb.group({
      fechaInicio: [lastWeek],
      fechaFin: [today],
    });
  }
  descargar(){
    const rangoFechas: RangoFechasDescargaDTO = {
      fechaInicio: this.form.value.fechaInicio,
      fechaFin: this.form.value.fechaFin
    };

    this.serviceDashboard.descargar(rangoFechas);
  }
  onRangeChange(range: { start: moment.Moment | null; end: moment.Moment | null }) {
    this.form.patchValue({
      fechaInicio: range.start ? range.start.format('YYYY-MM-DD') : '',
      fechaFin: range.end ? range.end.format('YYYY-MM-DD') : ''
    });
  }
}
