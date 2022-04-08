import { Pipe, PipeTransform } from '@angular/core';
import { FilterTitle } from '../loyalty/get-senarios-grid.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<FilterTitle>, title: string): Array<FilterTitle> {

    let result: Array<FilterTitle> = value;

    if (title === undefined || title === null || title === '') {

      return result;
    }

    result =
      result.filter(w => w.title.toUpperCase().match(title.toUpperCase()));

    return result;
  }

}
