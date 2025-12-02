import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GenericButton } from '../generic-button/generic-button';
import { ColumnasDTO, TableAction } from '../../../core/DTOs/shared/columnas.dto';
import { CustomDatePipePipe } from "../../pipes/custom-date-pipe-pipe";

@Component({
  selector: 'app-generic-table',
  imports: [CommonModule, MatTableModule,
    MatIconModule, MatButtonModule,
    GenericButton, MatPaginatorModule,
    FormsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule, CustomDatePipePipe],
  templateUrl: './generic-table.html',
  styleUrl: './generic-table.scss',
})
export class GenericTable<T= any> implements AfterViewInit {
  /** Datos a mostrar */
  @Input() set data(value: T[]) {
    this._dataSource.data = value;
  }
  get data(): T[] {
    return this._dataSource.data;
  }
  /** Definición de columnas: [{ field: 'nombre', label: 'Nombre' }] */
  @Input() columns: ColumnasDTO[] = [];
  /** Si se muestran botones de acción */
  @Input() showActions = true;
  /** Los botones de Acciones genericos */
  @Input() actions: TableAction[] = [];
  /** Mostrar paginador */
  @Input() paginador = false;

  /** Mostrar filtro */
  @Input() filtro = false;

  @Input() pageSize: number = 5;

  @Input() pageSizeOptions:number[] = [5, 10, 20];


  /** Eventos de acción */
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  /** Referencia al paginador */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /** Fuente de datos con paginación */
  _dataSource = new MatTableDataSource<T>([]);

  filtroTexto = '';

  /** Método para obtener los nombres de campo */
  get displayedColumns(): string[] {
    const cols = this.columns.map(c => c.field as string);
    return this.showActions ? [...cols, 'actions'] : cols;
  }

  ngAfterViewInit(): void {
    if (this.paginador) this._dataSource.paginator = this.paginator;
    if (this.sort) this._dataSource.sort = this.sort;
  }

  /** Aplicar filtro */
  aplicarFiltro(): void {
    this._dataSource.filter = this.filtroTexto.trim().toLowerCase();
  }
  /*Funcion encargada de dar la visibilidad a un boton o no dependiendo una condificon */
  isVisible(action: TableAction, row: any): boolean {
    // Si visible no existe → visible = true
    if (action.visible === undefined || action.visible === null) {
      return true;
    }

    // Si visible es una función → ejecutarla
    if (typeof action.visible === "function") {
      return action.visible(row);
    }

    // Si visible es boolean → usar el valor tal cual
    return action.visible;
  }


}