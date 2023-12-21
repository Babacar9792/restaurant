import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYearDate'
})
export class MonthYearDatePipe implements PipeTransform {

  mois : string[] = [
    'janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'
  ]

  transform(value: Date): unknown {
    return  this.mois[value.getMonth()]+' '+value.getFullYear();
  }

}
