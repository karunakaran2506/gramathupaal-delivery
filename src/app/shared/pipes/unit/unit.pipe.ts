import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unit'
})
export class UnitPipe implements PipeTransform {

  transform(value: string) {
    switch (value) {
      case 'millilitre':
        return 'ml';
      case 'kilogram':
        return 'ml';
      case 'gram':
        return 'g';
      case 'litre':
        return 'l';
      case 'piece':
        return 'piece';

      default:
        break;
    }
  }
}