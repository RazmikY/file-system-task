import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
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
    @Input() selected: boolean;
    @Output() getNestedData = new EventEmitter();
    @Output() selectCurrentData = new EventEmitter();
    constructor() {}

    ngOnInit(): void {}

    openItem(): void {
        this.getNestedData.emit();
    }

    selectItem() {
        this.selectCurrentData.emit();
    }
}
