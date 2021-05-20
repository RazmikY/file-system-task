import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
} from '@angular/core';

import { HeaderData, SortData } from 'src/app/shared/models/header.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Output() sendSortData = new EventEmitter<SortData>();
    prevValueId = -1;
    headerData: HeaderData[] = [
        { name: 'Name', id: 1, dir: '', toggle: false, value: 'path' },
        {
            name: 'Date Modified',
            id: 2,
            dir: '',
            toggle: false,
            value: 'modificationDate',
        },
        { name: 'Type', id: 3, dir: '', toggle: false, value: 'type' },
        { name: 'Size', id: 4, dir: '', toggle: false, value: 'size' },
    ];

    sortBy(item: HeaderData) {
        this.onDirChange(item, this.headerData);
    }

    onDirChange(item: HeaderData, collection: HeaderData[]): void {
        if (this.prevValueId !== -1 && item?.id !== this.prevValueId) {
            this.deleteOldItemValue(collection);
        }
        this.changeDirAndToggle(item);
        this.prevValueId = item.id;
    }

    private changeDirAndToggle(item: HeaderData): void {
        const condition = item?.dir !== '' && item?.dir === 'desc';
        item.toggle = condition ? true : false;
        item.dir = condition ? 'asc' : 'desc';
        this.sendSortData.emit({
            sortFieldName: item.value,
            sortDir: item.dir,
        });
    }

    private deleteOldItemValue(collection: HeaderData[]): void {
        const findedItem = collection.find((i) => i?.id === this.prevValueId);
        if (findedItem) {
            findedItem.dir = '';
            findedItem.toggle = false;
        }
    }
}
