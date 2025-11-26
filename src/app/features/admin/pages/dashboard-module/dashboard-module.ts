import { Component } from '@angular/core';
import { SearchDownloadForm } from "../../components/dashboard/search-download-form/search-download-form";
import { LastRegistersTable } from "../../components/dashboard/last-registers-table/last-registers-table";


@Component({
  selector: 'app-dashboard-module',
  imports: [SearchDownloadForm, LastRegistersTable],
  templateUrl: './dashboard-module.html',
  styleUrl: './dashboard-module.scss',
})
export class DashboardModule {



}
