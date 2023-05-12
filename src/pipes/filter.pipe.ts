import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filterValue: string, filterProperty: string): any[] {
    if (!items || !filterProperty || !filterValue) {
      return items;
    }

    filterValue = filterValue.toLowerCase();
    return items.filter(item => item[filterProperty].toLowerCase().includes(filterValue));
  }
}
