import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToMinutes',
  standalone: true,
})
export class TimeDiffInMinutes implements PipeTransform {
  transform(value: Date): number {
    let now = new Date();
    let timeDiff = now.getTime() - new Date(value).getTime();
    let minutes = Math.floor(timeDiff / 60000);
    return minutes;
  }
}
