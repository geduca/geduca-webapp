import { DatePipe } from '@angular/common';

export class DateBrPipe extends DatePipe {

  public transform(value): any {
    return super.transform(value, 'dd/MM/yyyy');
  }

}
