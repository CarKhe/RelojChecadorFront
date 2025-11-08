import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ElementRef, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-generic-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './generic-card.html',
  styleUrl: './generic-card.scss',
})
export class GenericCard implements AfterContentInit {
  /** Título del card */
  @Input() title?: string;

  /** Subtítulo opcional */
  @Input() subtitle?: string;

  /** Ancho máximo opcional (ej: '600px', '100%', etc.) */
  @Input() maxWidth: string = '500px';

  /** Si es centrado horizontalmente */
  @Input() centered = true;

  /** Si se aplica padding interno */
  @Input() padded = true;

  @ContentChild('cardBotones', { read: ElementRef }) botonesSlot?: ElementRef;
  hasBotones = false;

  ngAfterContentInit() {
    this.hasBotones = !!this.botonesSlot;
  }
}