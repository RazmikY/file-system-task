import { Pipe, PipeTransform } from '@angular/core';
import { FileData } from '../../models/filedData';

@Pipe({
    name: 'sortFiles',
    standalone: true,
})
export class SortFilesPipe implements PipeTransform {
    transform(
        value: FileData[],
        fieldName: string,
        dir: 'desc' | 'asc'
    ): FileData[] {
        const condition = typeof value?.[0]?.[fieldName];
        return value.sort((a, b) => {
            const start = dir === 'asc' ? a : b;
            const end = dir === 'asc' ? b : a;

            return condition === 'string'
                ? start[fieldName]?.localeCompare(end[fieldName])
                : start[fieldName] - end[fieldName];
        });
    }
}
