import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

import { FileData } from 'src/app/shared/models/filedData';

@Component({
    selector: 'app-file-item',
    templateUrl: './file-item.component.html',
    styleUrls: ['./file-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileItemComponent implements OnInit {
    @Input() fileData: FileData;
    constructor() {}

    ngOnInit(): void {}

    openItem(): void {
        console.log('object');
    }

    selectItem() {
        console.log('item');
    }
}
