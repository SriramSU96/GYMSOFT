import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], key: string, value: any): any[] {
        if (!items) return [];
        if (!key || value === undefined || value === null) return items;
        return items.filter(item => item[key] === value);
    }
}
