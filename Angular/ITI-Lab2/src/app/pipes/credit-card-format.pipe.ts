import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCreditCardFormat',
  standalone: true,
})
export class CreditCardFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length !== 16) return value; // validation

    // Format like '0000-0000-0000-0000' and hide all but last 4
    const masked = '****-****-****-' + value.substring(12);
    return masked;
  }
}
