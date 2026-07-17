import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
  standalone: true
})
export class CurrencySymbolPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD'): string {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'INR': '₹'
    };
    
    const symbol = symbols[currency] || '$';
    return `${symbol}${value.toFixed(2)}`;
  }
}