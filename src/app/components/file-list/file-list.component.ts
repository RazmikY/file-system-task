import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

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
    selectedItemIndex = -1;
    constructor(private coreService: CoreService) {}

    ngOnInit(): void {
        this.getFileData();
    }

    getFileData(): void {
        this.fileData$ = this.coreService.getData().pipe(
            tap(console.log),
            map((data): FileData[] => this.getCurrentDirectoryData(data))
        );
    }

    getCurrentDirectoryData(data: FileData[]): FileData[] {
        const currentDirectory = this.coreService.currentDirectory$.getValue();
        return data.filter((item) => this.isEqual(currentDirectory, item.path));
    }

    isEqual(a: string, b: string): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    getNestedData(item: FileData): void {
        const path = item.path;
        const currentPath = path.replaceAll('/', ' > ');
        this.coreService.setCurrentPath(currentPath);
        this.getFileData();
    }

    selectCurrentData(index: number): void {
        this.selectedItemIndex = index;
    }
}
