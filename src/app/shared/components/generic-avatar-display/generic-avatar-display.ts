import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-generic-avatar-display',
  imports: [MatIcon],
  templateUrl: './generic-avatar-display.html',
  styleUrl: './generic-avatar-display.scss',
})
export class GenericAvatarDisplay {
  /** Imagen del usuario o logo */
  @Input() src: string = 'rrlogo.jpg';

  /** Texto alternativo */
  @Input() alt: string = 'Avatar';

  /** Nombre opcional debajo del avatar */
  @Input() name: string = '';

  /** Tamaño del avatar (px o rem) */
  @Input() size: string = '80px';

  /** Color de fondo por defecto si no hay imagen */
  @Input() backgroundColor: string = '#e0e0e0';

  /** Color del ícono o texto cuando no hay imagen */
  @Input() iconColor: string = '#616161';
}
