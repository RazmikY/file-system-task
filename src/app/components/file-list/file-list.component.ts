import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreService } from 'src/app/services/core.service';
import { FileData } from 'src/app/shared/models/filedData';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit {
    fileData$: Observable<FileData[]>;
    constructor(private coreService: CoreService) {}

    ngOnInit(): void {
        this.getFileData();
    }

    getFileData(): void {
        this.fileData$ = this.coreService.getData();
    }
}
