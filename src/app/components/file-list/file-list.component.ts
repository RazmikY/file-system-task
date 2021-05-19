import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { CoreService } from 'src/app/services/core.service';
import { FileData } from 'src/app/shared/models/filedData';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileListComponent implements OnInit, OnDestroy {
    fileData: FileData[];
    selectedItemIndex = -1;
    private sub = new Subscription();

    constructor(private coreService: CoreService, private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getFileData();
    }

    getFileData(): void {
        this.sub.add(
            this.coreService
                .getData()
                .pipe(
                    map((data): FileData[] =>
                        this.getCurrentDirectoryData(data)
                    )
                )
                .subscribe((data) => {
                    this.fileData = data
                    this.cd.detectChanges();
                })
        );
    }

    getCurrentDirectoryData(data: FileData[]): FileData[] {
        const currentDirectory = this.coreService.currentDirectory$.getValue();
        // return data?.filter((item) => {
        //     return this.newArray(currentDirectory, item?.path);
        // });
        return data
    }

    getNestedData(item: FileData): void {
        this.setNewPath(item);
        this.getFileData();
    }

    setNewPath(item: FileData): void {
        const path = item.path;
        this.coreService.setCurrentPath(path);
    }

    selectCurrentData(index: number): void {
        this.selectedItemIndex = index;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
