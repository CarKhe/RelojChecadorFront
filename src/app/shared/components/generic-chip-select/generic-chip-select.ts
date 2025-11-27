import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { ChipItem } from '../../DTOs/chip-item.dto';



@Component({
  selector: 'app-generic-chip-select',
  imports: [MatChipsModule],
  templateUrl: './generic-chip-select.html',
  styleUrl: './generic-chip-select.scss',
})
export class GenericChipSelect {
  
  @Input() label?: string;
  @Input() items: ChipItem[] = [];        // Lista de chips a mostrar
  @Input() selected: number[] = [];       // IDs seleccionados
  @Output() selectedChange = new EventEmitter<number[]>(); // Emisor

  toggleSelection(id: number) {
    const exists = this.selected.includes(id);

    this.selected = exists
      ? this.selected.filter(x => x !== id) // quitar
      : [...this.selected, id];             // agregar

    this.selectedChange.emit(this.selected);
  }
}
