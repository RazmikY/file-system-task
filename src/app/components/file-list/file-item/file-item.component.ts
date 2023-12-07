import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';

import { FileIconComponent } from '../file-icon/file-icon.component';
import { FileData } from '@shared/models';
import { FileTypePipe } from '@shared/pipes';

@Component({
    selector: 'app-file-item',
    templateUrl: './file-item.component.html',
    styleUrls: ['./file-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FileIconComponent, NgIf, DatePipe, FileTypePipe],
})
export class FileItemComponent {
    @Input() fileData: FileData | undefined;
    @Input() selected!: boolean;
    @Output() getNestedData = new EventEmitter();
    @Output() selectCurrentData = new EventEmitter();
    constructor() {}

    openItem(): void {
        this.getNestedData.emit();
    }

    selectItem() {
        this.selectCurrentData.emit();
    }
}
