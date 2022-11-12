import { Pipe, PipeTransform } from '@angular/core';
import { FileData } from '../../models/filedData';

@Pipe({
    name: 'sortFiles',
})
export class SortFilesPipe implements PipeTransform {
    transform(
        value: FileData[],
        fieldName: string,
        dir: 'desc' | 'asc'
    ): FileData[] {
        const condition = typeof value?.[0]?.[fieldName];
        if (dir === 'asc') {
            return value.sort((a, b) => {
                return condition === 'string'
                    ? a[fieldName]?.localeCompare(b[fieldName])
                    : a[fieldName] - b[fieldName];
            });
        } else {
            return value?.sort((a, b) => {
                return condition === 'string'
                    ? b[fieldName]?.localeCompare(a[fieldName])
                    : b[fieldName] - a[fieldName];
            });
        }
    }
}
