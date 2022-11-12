import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';

import { FileData } from 'src/app/shared/models/filedData';
import { SortData } from 'src/app/shared/models/header.model';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent {
    @Input() fileData!: FileData[];
    @Input() sortData!: SortData;
    @Output() getNestedData = new EventEmitter<FileData>();
    selectedItemIndex = -1;

    selectCurrentData(index: number): void {
        this.selectedItemIndex = index;
    }

    openItem(item: FileData): void {
        this.getNestedData.emit(item);
    }
}
