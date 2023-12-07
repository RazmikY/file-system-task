import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { FileType } from '@shared/enums';


@Component({
    selector: 'app-file-icon',
    templateUrl: './file-icon.component.html',
    styleUrls: ['./file-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class FileIconComponent {
    @Input() type: FileType;
}
