import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolePlLang',
  standalone: true,
})
export class RolePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'ADMIN':
        return 'Administrator';
      case 'CHEF':
        return 'Kucharz';
      case 'WAITER':
        return 'Kelner';
      default:
        return value;
    }
  }
}
