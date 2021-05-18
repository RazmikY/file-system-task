import { Pipe, PipeTransform } from '@angular/core';
import { FileType } from '../../models/filedData';

@Pipe({
    name: 'fileType',
})
export class FileTypePipe implements PipeTransform {
    transform(value: FileType): string {
        return value === 'folder' ? 'File Folder' : 'Text Document';
    }
}
