import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
} from '@angular/core';

import { FileType } from 'src/app/shared/models/filedData';

@Component({
    selector: 'app-file-icon',
    templateUrl: './file-icon.component.html',
    styleUrls: ['./file-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileIconComponent implements OnInit {
    @Input() type: FileType;
    constructor() {}

    ngOnInit(): void {}
}
