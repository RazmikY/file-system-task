import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreService } from 'src/app/services/core.service';

import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FileListComponent } from '../file-list/file-list.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { CurrentPath, FileData, SortData } from '@shared/models';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NavigationComponent,
        HeaderComponent,
        FileListComponent,
        SearchBarComponent,
        AsyncPipe,
    ],
})
export class MainComponent {
    fileData$: Observable<FileData[]> = this.getFileData();
    copyData: FileData[];
    sortData: SortData;
    filteredData: FileData[];
    indexForSearchedData: number;

    constructor(private coreService: CoreService) {}

    getFileData(): Observable<FileData[]> {
        return this.coreService.getData().pipe(
            map(data => {
                this.copyData = JSON.parse(JSON.stringify(data));
                return data.filter(item => item.path.split('/').length === 1);
            })
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
        const length = ++currentIndex;

        this.fileData$ = of(
            JSON.parse(JSON.stringify(this.copyData))
                .filter((elem: FileData) => {
                    return (
                        elem.path.includes(path) &&
                        elem.path.split('/').length === length
                    );
                })
                .map((elem: FileData) => {
                    let index = currentIndex;
                    elem.path = elem.path.split('/')[--index];
                    return elem;
                })
        );
    }

    setNewPath(path: string): void {
        const fullPath = this.coreService.currentPath$.getValue();
        const newPath =
            fullPath === null || fullPath == '' ? path : fullPath + '/' + path;
        this.coreService.setCurrentPath(newPath);
    }

    sendSortData(data: SortData): void {
        this.sortData = data;
    }

    getCurrentPath({ pathPart, index }: CurrentPath): void {
        const currentIndex = ++index;
        this.coreService.setCurrentIndex(currentIndex);
        this.getNewPathByIndex(index);
        this.transformData(pathPart, currentIndex);
    }

    getNewPathByIndex(index: number): void {
        const path = this.coreService.currentPath$.getValue();
        const newPath = path?.split('/').splice(0, index).join('/');
        this.coreService.setCurrentPath(newPath);
    }

    backToParent(): void {
        let currentIndex = this.coreService.currentIndex$.getValue();
        if (currentIndex == 0) {
            return;
        }
        this.getNewPathByIndex(--currentIndex);
        const path = this.coreService.currentPath$.getValue();
        const splitedPaths = path.split('/');
        const newPath = splitedPaths[splitedPaths.length - 1];

        this.transformData(newPath, currentIndex);
        this.coreService.setCurrentIndex(currentIndex);
    }

    filterData(value: string): void {
        this.filteredData = this.filterByPath(value).map(el =>
            this.splitByName(el, value)
        );
    }
    filterByPath(value: string): FileData[] {
        return JSON.parse(JSON.stringify(this.copyData)).filter(
            (val: FileData) => {
                return val?.path?.includes(value);
            }
        );
    }

    splitByName(el: FileData, value: string): FileData {
        const splitedPath = el.path.split('/');
        let index: number;
        splitedPath.forEach((item: string, i: number) => {
            if (item.includes(value)) {
                index = i;
            }
        });
        el.path = splitedPath[index];
        return el;
    }

    navigateToCurrentItem(pathName: string): void {
        let index: number;
        let newPath: string;
        this.fileData$ = of(
            this.filterByPath(pathName).map(el => {
                const splitedPath = el.path.split('/');
                splitedPath.forEach((item: string, i: number) => {
                    if (item.includes(pathName)) {
                        index = i;
                    }
                });
                el.path = splitedPath[index];
                newPath = splitedPath.splice(0, index).join('/');
                return el;
            })
        );
        this.coreService.setCurrentPath(newPath);
    }
}
