import {
    Component,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';

import { FileItemComponent } from './file-item/file-item.component';
import { SortFilesPipe } from '@shared/pipes';
import { FileData, SortData } from '@shared/models';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FileItemComponent, SortFilesPipe],
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
