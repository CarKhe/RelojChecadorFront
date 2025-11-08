import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-generic-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './generic-loader.html',
  styleUrl: './generic-loader.scss',
})
export class GenericLoader {

    /** Mostrar u ocultar el loader */
  @Input() show: boolean = false;

  /** Tipo de spinner: determinate o indeterminate */
  @Input() mode: 'determinate' | 'indeterminate' = 'indeterminate';

  /** Valor del progreso (si mode='determinate') */
  @Input() value: number = 0;

  /** Tamaño del spinner */
  @Input() diameter: number = 50;

  /** Texto opcional debajo del spinner */
  @Input() text?: string;

}
