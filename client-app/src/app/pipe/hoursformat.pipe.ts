import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursformat',
  standalone: true
})
export class Hoursformat implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}