import { NativeDateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

export class CustomDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.length === 10) {
      const [day, month, year] = value.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    return super.parse(value);
  }

  override format(date: Date, displayFormat: string): string {
    return formatDate(date, 'dd/MM/yyyy', this.locale);
  }
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy',
  }
};
