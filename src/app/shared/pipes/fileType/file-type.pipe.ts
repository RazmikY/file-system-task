import { Pipe, PipeTransform } from '@angular/core';
import { FileType } from '../../enums';

@Pipe({
    name: 'fileType',
    standalone: true,
})
export class FileTypePipe implements PipeTransform {
    transform(value: FileType): string {
        return value === FileType.file ? 'File Folder' : 'Text Document';
    }
}
