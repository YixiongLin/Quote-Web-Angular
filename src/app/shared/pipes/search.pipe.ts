import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any {
    if (!items)return [];
    if (!value)return items;

    return items.filter(function(item){
      return item[field].toLowerCase().includes(value.toLowerCase());
    });
  }

}
