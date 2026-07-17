import { Pipe, PipeTransform } from '@angular/core';

// PIPES EXAMPLE: Custom pipe for data transformation
@Pipe({
  name: 'balanceColor',
  standalone: true
})
export class BalanceColorPipe implements PipeTransform {
  transform(value: number): string {
    if (value > 0) {
      return 'text-success'; // You owe money
    } else if (value < 0) {
      return 'text-danger'; // Others owe you
    } else {
      return 'text-muted'; // Settled up
    }
  }
}