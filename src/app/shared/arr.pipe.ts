import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arr'
})
export class ArrPipe implements PipeTransform {

  transform(value: {name: string, description: string, id: any} [], args?: any): any {
    if (value) {
      return value.map(x => x.name).join(', ');
    }
    return value;
  }

}
