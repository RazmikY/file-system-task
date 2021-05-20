import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreService } from 'src/app/services/core.service';
import { FileData } from 'src/app/shared/models/filedData';
import { SortData } from 'src/app/shared/models/header.model';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
    fileData: FileData[];
    copyData: FileData[];
    private sub = new Subscription();
    sortData: SortData;

    constructor(
        private coreService: CoreService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.getFileData();
    }

    getFileData(): void {
        this.sub.add(
            this.coreService
                .getData()
                .pipe(
                    tap((data) => {
                        this.fileData = data.filter(
                            (item) => item.path.split('/').length === 1
                        );
                        this.copyData = JSON.parse(JSON.stringify(data));
                        this.cd.detectChanges();
                    })
                )
                .subscribe()
        );
    }

    getNestedData(item: FileData): void {
        if (item.type == 'file') {
            return;
        }
        let currentIndex = this.coreService.currentIndex$.getValue();
        this.setNewPath(item.path);
        this.coreService.setCurrentIndex(++currentIndex);
        this.transformData(item.path, currentIndex);
    }

    transformData(path: string, currentIndex: number): void {
        this.fileData = this.copyData
            .filter((elem) => {
                return (
                    elem.path.includes(path) &&
                    elem.path.split('/').length === currentIndex
                );
            })
            .map((elem) => {
                let index = currentIndex;
                elem.path = elem.path.split('/')[--index];
                return elem;
            });
    }

    setNewPath(path: string): void {
        const fullPath = this.coreService.currentPath$.getValue();
        const newPath = fullPath === null ? path : fullPath + '/' + path;
        this.coreService.setCurrentPath(newPath);
    }

    sendSortData(data: SortData): void {
        // console.log(data);
        this.sortData = data;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
