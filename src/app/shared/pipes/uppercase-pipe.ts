import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercasePipe'
})
export class UppercasePipePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    return value ? value.toUpperCase() : '';
  }
}
